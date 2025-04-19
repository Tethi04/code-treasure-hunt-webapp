
import React from 'react';
import ChallengeCard from '@/components/ChallengeCard';
import ProgressTracker from '@/components/ProgressTracker';
import { TreasureHuntProvider } from '@/utils/treasureHuntContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Code, Compass } from 'lucide-react';

const Index = () => {
  return (
    <TreasureHuntProvider>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8 md:mb-12">
            <div className="mb-4 inline-flex items-center justify-center">
              <div className="relative">
                <Code className="h-12 w-12 text-amber-600" />
                <Compass className="h-6 w-6 text-amber-500 absolute -bottom-1 -right-1" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-2">Code Treasure Hunt</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dive into the world of hidden codes and secret variables. Can you find all the treasure codes?
            </p>
          </header>
          
          <div className="grid md:grid-cols-[2fr_1fr] gap-6 items-start">
            <div className="order-2 md:order-1">
              <ScrollArea className="h-[calc(100vh-240px)]">
                <ChallengeCard />
              </ScrollArea>
            </div>
            
            <div className="md:sticky md:top-8 order-1 md:order-2 bg-card rounded-lg p-4 border treasure-map">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-amber-600" />
                <h2 className="text-xl font-semibold text-amber-800">Your Progress</h2>
              </div>
              <ProgressTracker />
              
              <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
                <h3 className="font-semibold mb-2 text-amber-800">How to Play</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="font-bold text-amber-600">1.</span>
                    <span>Examine the code snippet carefully</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-amber-600">2.</span>
                    <span>Look for hidden variables, patterns, or clues</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-amber-600">3.</span>
                    <span>Enter the correct treasure code to proceed</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-amber-600">4.</span>
                    <span>Use hints if you're stuck (but only if needed!)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TreasureHuntProvider>
  );
};

export default Index;
