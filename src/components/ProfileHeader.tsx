
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const ProfileHeader: React.FC = () => {
  return (
    <Card className="bg-card border-none shadow-sm">
      <CardContent className="flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary/10 p-2">
            <span className="text-xl font-semibold text-primary">EP</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Echoes of the Past</h1>
            <p className="text-muted-foreground">Preserving memories through AI conversation</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost">Help</Button>
        </div>
      </CardContent>
    </Card>
  );
};
