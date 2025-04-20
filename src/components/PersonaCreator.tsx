
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Persona = {
  id: string;
  name: string;
  relationship: string;
  avatar?: string;
  createdAt: Date;
};

const personaSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  relationship: z.string().min(2, { message: "Relationship must be at least 2 characters" }),
  description: z.string().min(50, { message: "Please provide at least 50 characters about this person" }),
});

type PersonaFormValues = z.infer<typeof personaSchema>;

interface PersonaCreatorProps {
  onCreatePersona: (persona: Omit<Persona, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export const PersonaCreator: React.FC<PersonaCreatorProps> = ({ onCreatePersona, onCancel }) => {
  const form = useForm<PersonaFormValues>({
    resolver: zodResolver(personaSchema),
    defaultValues: {
      name: '',
      relationship: '',
      description: '',
    },
  });

  const onSubmit = (data: PersonaFormValues) => {
    onCreatePersona({
      name: data.name,
      relationship: data.relationship,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create a New Echo</CardTitle>
        <CardDescription>
          Provide information about your loved one to create a digital persona
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The full name of your loved one
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="relationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relationship</FormLabel>
                  <FormControl>
                    <Input placeholder="Parent, Grandparent, Friend, etc." {...field} />
                  </FormControl>
                  <FormDescription>
                    Your relationship to this person
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share memories, personality traits, favorite sayings, and other details that made this person unique..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The more details you provide, the more authentic the AI-generated responses will be
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                Create Echo
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
