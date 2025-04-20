
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PersonaCreator } from '@/components/PersonaCreator';
import { ConversationInterface } from '@/components/ConversationInterface';
import { PersonaSelector } from '@/components/PersonaSelector';
import { ProfileHeader } from '@/components/ProfileHeader';

type Persona = {
  id: string;
  name: string;
  relationship: string;
  avatar?: string;
  createdAt: Date;
};

const Dashboard = () => {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [isCreatingPersona, setIsCreatingPersona] = useState(false);
  const [personas, setPersonas] = useState<Persona[]>([
    {
      id: '1',
      name: 'James Wilson',
      relationship: 'Father',
      createdAt: new Date('2024-02-15'),
    },
    {
      id: '2',
      name: 'Elizabeth Chen',
      relationship: 'Grandmother',
      createdAt: new Date('2024-03-10'),
    },
  ]);

  const handleCreatePersona = (newPersona: Omit<Persona, 'id' | 'createdAt'>) => {
    const persona: Persona = {
      ...newPersona,
      id: `${personas.length + 1}`,
      createdAt: new Date(),
    };
    
    setPersonas([...personas, persona]);
    setSelectedPersona(persona);
    setIsCreatingPersona(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <ProfileHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Echoes</CardTitle>
              <CardDescription>Select or create a new persona</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <PersonaSelector 
                personas={personas} 
                selectedPersona={selectedPersona} 
                onSelectPersona={setSelectedPersona} 
              />
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => {
                  setIsCreatingPersona(true);
                  setSelectedPersona(null);
                }}
              >
                Create New Echo
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          {isCreatingPersona ? (
            <PersonaCreator onCreatePersona={handleCreatePersona} onCancel={() => setIsCreatingPersona(false)} />
          ) : selectedPersona ? (
            <ConversationInterface persona={selectedPersona} />
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground mb-4">Select an existing Echo or create a new one to begin</p>
                <Button onClick={() => setIsCreatingPersona(true)}>Create Your First Echo</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
