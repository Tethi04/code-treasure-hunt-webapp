
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useTreasureHunt } from '@/hooks/useTreasureHunt';
import { Button } from '@/components/ui/button';
import { RefreshCw, Trophy } from 'lucide-react';

const ProgressTracker = () => {
  const { 
    currentLevel, 
    totalChallenges, 
    progressPercentage,
    completedChallenges,
    resetProgress
  } = useTreasureHunt();

  const allCompleted = completedChallenges.length === totalChallenges;

  return (
    <div className="w-full max-w-2xl">
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium">
          <span className="text-amber-700">Challenge:</span> {currentLevel}/{totalChallenges}
        </div>
        <div className="text-sm text-muted-foreground">
          {completedChallenges.length}/{totalChallenges} completed
        </div>
      </div>
      <div className="relative">
        <Progress 
          value={progressPercentage} 
          className="h-2" 
        />
        {allCompleted && (
          <div className="absolute -right-2 -top-1 treasure-glow">
            <Trophy className="h-5 w-5 text-amber-500" />
          </div>
        )}
      </div>
      
      {completedChallenges.length > 0 && (
        <div className="mt-4 flex justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetProgress}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Reset Progress
          </Button>
        </div>
      )}
      
      {allCompleted && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
          <Trophy className="h-8 w-8 text-amber-500 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-amber-800">Congratulations!</h3>
          <p className="text-amber-700">You've completed all the challenges and found all treasure codes!</p>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
