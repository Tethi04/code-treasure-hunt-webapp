
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ChallengeData, challenges } from './challengeData';

type TreasureHuntContextType = {
  currentLevel: number;
  completedChallenges: number[];
  hintsUsed: Record<number, boolean>;
  currentChallenge: ChallengeData | null;
  totalChallenges: number;
  progressPercentage: number;
  completeChallenge: (id: number) => void;
  useHint: (id: number) => void;
  nextChallenge: () => void;
  resetProgress: () => void;
};

const TreasureHuntContext = createContext<TreasureHuntContextType | undefined>(undefined);

export const TreasureHuntProvider = ({ children }: { children: ReactNode }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [hintsUsed, setHintsUsed] = useState<Record<number, boolean>>({});

  const totalChallenges = challenges.length;
  const currentChallenge = challenges.find(challenge => challenge.id === currentLevel) || null;
  const progressPercentage = (completedChallenges.length / totalChallenges) * 100;

  const completeChallenge = (id: number) => {
    if (!completedChallenges.includes(id)) {
      setCompletedChallenges([...completedChallenges, id]);
    }
  };

  const useHint = (id: number) => {
    setHintsUsed(prev => ({ ...prev, [id]: true }));
  };

  const nextChallenge = () => {
    if (currentLevel < totalChallenges) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const resetProgress = () => {
    setCurrentLevel(1);
    setCompletedChallenges([]);
    setHintsUsed({});
  };

  return (
    <TreasureHuntContext.Provider
      value={{
        currentLevel,
        completedChallenges,
        hintsUsed,
        currentChallenge,
        totalChallenges,
        progressPercentage,
        completeChallenge,
        useHint,
        nextChallenge,
        resetProgress,
      }}
    >
      {children}
    </TreasureHuntContext.Provider>
  );
};

export const useTreasureHuntContext = () => {
  const context = useContext(TreasureHuntContext);
  if (context === undefined) {
    throw new Error('useTreasureHuntContext must be used within a TreasureHuntProvider');
  }
  return context;
};
