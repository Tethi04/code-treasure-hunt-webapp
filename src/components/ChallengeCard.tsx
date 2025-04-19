
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lightbulb, Code, CheckCircle } from 'lucide-react';
import { useTreasureHunt } from '@/hooks/useTreasureHunt';
import { Badge } from '@/components/ui/badge';

const ChallengeCard = () => {
  const { 
    currentChallenge, 
    userAnswer, 
    setUserAnswer, 
    checkAnswer, 
    showHint, 
    revealHint, 
    hideHint,
    hintsUsed,
    completedChallenges
  } = useTreasureHunt();

  if (!currentChallenge) return null;

  const isCompleted = completedChallenges.includes(currentChallenge.id);
  const hasUsedHint = hintsUsed[currentChallenge.id];

  return (
    <Card className="w-full max-w-2xl shadow-lg treasure-map border-amber-300">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-amber-800">
            {currentChallenge.title}
          </CardTitle>
          <Badge 
            variant={
              currentChallenge.difficulty === 'easy' ? 'secondary' : 
              currentChallenge.difficulty === 'medium' ? 'default' : 'destructive'
            }
          >
            {currentChallenge.difficulty}
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground text-base">
          {currentChallenge.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto max-h-60">
            <pre>{currentChallenge.codeSnippet}</pre>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="absolute top-2 right-2 bg-background/80"
            onClick={() => {
              navigator.clipboard.writeText(currentChallenge.codeSnippet);
            }}
          >
            <Code className="h-4 w-4 mr-1" />
            Copy
          </Button>
        </div>
        
        {showHint && (
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-md">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-800">Hint:</p>
                <p className="text-amber-700">{currentChallenge.hint}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="pt-2">
          <p className="text-sm font-medium mb-2">Enter the treasure code:</p>
          <div className="flex gap-2">
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="flex-1"
              disabled={isCompleted}
            />
            <Button onClick={checkAnswer} disabled={isCompleted}>
              {isCompleted ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Solved
                </>
              ) : (
                'Check'
              )}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t pt-4">
        {isCompleted ? (
          <Badge variant="outline" className="ml-auto bg-green-50 text-green-700 border-green-200">
            Challenge Completed
          </Badge>
        ) : hasUsedHint ? (
          showHint ? (
            <Button variant="ghost" onClick={hideHint} size="sm" className="ml-auto">
              Hide Hint
            </Button>
          ) : (
            <Button variant="ghost" onClick={revealHint} size="sm" className="ml-auto">
              Show Hint Again
            </Button>
          )
        ) : (
          <Button variant="outline" onClick={revealHint} size="sm" className="ml-auto">
            <Lightbulb className="h-4 w-4 mr-1" />
            Use Hint
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
