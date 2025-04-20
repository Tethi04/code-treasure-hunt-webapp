
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume, VolumeOff } from 'lucide-react';

interface VoiceControlsProps {
  isListening: boolean;
  isSpeaking: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onToggleMute: () => void;
}

export const VoiceControls: React.FC<VoiceControlsProps> = ({
  isListening,
  isSpeaking,
  onStartListening,
  onStopListening,
  onToggleMute,
}) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={isListening ? onStopListening : onStartListening}
        className={isListening ? 'bg-primary text-primary-foreground' : ''}
      >
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onToggleMute}
      >
        {isSpeaking ? <Volume className="h-4 w-4" /> : <VolumeOff className="h-4 w-4" />}
      </Button>
    </div>
  );
};
