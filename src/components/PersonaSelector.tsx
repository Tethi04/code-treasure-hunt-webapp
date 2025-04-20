
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

type Persona = {
  id: string;
  name: string;
  relationship: string;
  avatar?: string;
  createdAt: Date;
};

interface PersonaSelectorProps {
  personas: Persona[];
  selectedPersona: Persona | null;
  onSelectPersona: (persona: Persona) => void;
}

export const PersonaSelector: React.FC<PersonaSelectorProps> = ({ 
  personas, 
  selectedPersona, 
  onSelectPersona 
}) => {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-2">
        {personas.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No personas created yet</p>
        ) : (
          personas.map((persona) => (
            <Button
              key={persona.id}
              variant={selectedPersona?.id === persona.id ? "default" : "outline"}
              className="w-full justify-start flex flex-col items-start gap-1 h-auto py-3"
              onClick={() => onSelectPersona(persona)}
            >
              <span className="font-medium">{persona.name}</span>
              <span className="text-xs text-muted-foreground flex justify-between w-full">
                <span>{persona.relationship}</span>
                <span>{formatDistanceToNow(persona.createdAt, { addSuffix: true })}</span>
              </span>
            </Button>
          ))
        )}
      </div>
    </ScrollArea>
  );
};
