
import { useState } from 'react';
import { useTreasureHuntContext } from '../utils/treasureHuntContext';
import { toast } from '../components/ui/use-toast';

export const useTreasureHunt = () => {
  const context = useTreasureHuntContext();
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  
  const checkAnswer = () => {
    if (!context.currentChallenge) return;
    
    const isCorrect = userAnswer.trim().toLowerCase() === 
      context.currentChallenge.solution.toLowerCase();
    
    if (isCorrect) {
      toast({
        title: "Correct!",
        description: "You've found the treasure code!",
        variant: "default",
      });
      context.completeChallenge(context.currentChallenge.id);
      setUserAnswer('');
      if (context.currentLevel < context.totalChallenges) {
        setTimeout(() => {
          context.nextChallenge();
        }, 1500);
      }
    } else {
      toast({
        title: "Not quite right",
        description: "Keep searching for the treasure code!",
        variant: "destructive",
      });
    }
  };
  
  const revealHint = () => {
    if (!context.currentChallenge) return;
    
    context.useHint(context.currentChallenge.id);
    setShowHint(true);
    
    toast({
      title: "Hint Revealed",
      description: "The hint might help you find the treasure!",
      variant: "default",
    });
  };
  
  const hideHint = () => {
    setShowHint(false);
  };
  
  return {
    ...context,
    userAnswer,
    setUserAnswer,
    checkAnswer,
    showHint,
    revealHint,
    hideHint
  };
};
