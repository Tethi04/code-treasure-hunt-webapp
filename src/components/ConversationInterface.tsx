import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useVoiceInteraction } from '@/hooks/useVoiceInteraction';
import { VoiceControls } from './VoiceControls';
import { useConversation } from '@11labs/react';

type Persona = {
  id: string;
  name: string;
  relationship: string;
  avatar?: string;
  createdAt: Date;
};

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
};

interface ConversationInterfaceProps {
  persona: Persona;
}

export const ConversationInterface: React.FC<ConversationInterfaceProps> = ({ persona }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello, I'm an AI representation of ${persona.name}. What would you like to talk about?`,
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [feedbackValue, setFeedbackValue] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();

  const conversation = useConversation({
    overrides: {
      tts: {
        voiceId: "EXAVITQu4vr4xnSDxMaL",
      }
    }
  });

  const { isListening, startListening, stopListening, recognition } = useVoiceInteraction();

  useEffect(() => {
    if (recognition) {
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        handleSendMessage(transcript);
      };

      recognition.onend = () => {
        stopListening();
      };
    }
  }, [recognition, stopListening]);

  const handleSendMessage = (content: string = inputValue) => {
    if (content.trim() === '') return;

    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      content: content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');

    setTimeout(() => {
      const response = generateResponse(content, persona);
      const newAiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newAiMessage]);
      setLastMessageId(newAiMessage.id);

      if (!isMuted) {
        if (!conversation.status) {
          conversation.startSession({ 
            agentId: "default",
          }).then(() => {
            conversation.send({ text: response });
          });
        } else {
          conversation.send({ text: response });
        }
      }
    }, 1000);
  };

  const handleSubmitFeedback = () => {
    if (feedbackValue.trim() === '') return;
    
    toast({
      title: "Feedback Received",
      description: "Thank you for helping improve this Echo's responses.",
    });
    
    setFeedbackValue('');
    setShowFeedback(false);
  };

  const generateResponse = (userMessage: string, persona: Persona) => {
    const relationshipBasedResponses = [
      `As your ${persona.relationship}, I want you to know that I'm here to listen. What else is on your mind?`,
      `The bond we share as ${persona.relationship} is special. Tell me more about how you're feeling.`,
      `I've always valued our ${persona.relationship}. Please share what's happening in your life.`,
      `Being your ${persona.relationship} means a lot to me. I'm here to support you.`,
      `Our relationship as ${persona.relationship} is precious. Let's talk more about what's concerning you.`
    ];
    
    return relationshipBasedResponses[Math.floor(Math.random() * relationshipBasedResponses.length)];
  };

  return (
    <Card className="w-full h-[70vh] flex flex-col">
      <CardHeader className="border-b pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Conversation with {persona.name}</span>
          <VoiceControls
            isListening={isListening}
            isSpeaking={conversation.isSpeaking}
            onStartListening={startListening}
            onStopListening={stopListening}
            onToggleMute={() => setIsMuted(!isMuted)}
          />
        </CardTitle>
        <CardDescription>
          This is an AI-generated conversation based on your memories
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow p-0 relative">
        <ScrollArea className="h-full max-h-[calc(70vh-10rem)] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}
                >
                  <p>{message.content}</p>
                  <div className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {!message.isUser && message.id === lastMessageId && (
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="ml-2 p-0 h-auto" 
                        onClick={() => setShowFeedback(true)}
                      >
                        Provide feedback
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {showFeedback && (
          <div className="absolute bottom-0 left-0 right-0 bg-background p-4 border-t">
            <div className="space-y-2">
              <p className="text-sm font-medium">How accurate was this response?</p>
              <Textarea 
                placeholder="Help us improve by sharing how this response could better reflect your loved one's personality..."
                value={feedbackValue}
                onChange={(e) => setFeedbackValue(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowFeedback(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSubmitFeedback}>
                  Submit Feedback
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t p-4">
        <div className="flex w-full gap-2">
          <Input
            placeholder="Type your message or click the microphone to speak..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-grow"
          />
          <Button onClick={() => handleSendMessage()}>Send</Button>
        </div>
      </CardFooter>
    </Card>
  );
};
