
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">Echoes</span>
            <span className="text-lg">of the Past</span>
          </div>
          <Button asChild>
            <Link to="/dashboard">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Preserve Meaningful Connections</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Echoes of the Past helps you create AI-driven simulations of loved ones based on their digital legacy, allowing for ongoing dialogue and reflection.
              </p>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link to="/dashboard">Create Your First Echo</Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-primary">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Collect Digital Legacy</h3>
                  <p className="text-muted-foreground">
                    Input emails, social media posts, and other digital content to create a comprehensive profile.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-primary">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Generate AI Persona</h3>
                  <p className="text-muted-foreground">
                    Our AI analyzes the content to create a digital persona that reflects your loved one's tone and style.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-primary">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Engage in Meaningful Dialogue</h3>
                  <p className="text-muted-foreground">
                    Interact with the AI persona through text conversations that evolve based on your feedback.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-muted py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">How Echoes of the Past Helps</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our platform provides a compassionate space for processing grief through ongoing connection and reflection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-3">Dynamic Remembrance</h3>
                <p className="text-muted-foreground">
                  Move beyond static memories with AI-driven interactions that allow for evolving conversations and new perspectives.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Privacy-Focused</h3>
                <p className="text-muted-foreground">
                  Your personal data and memories are treated with the utmost respect and protection, ensuring a secure experience.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Personalized Experience</h3>
                <p className="text-muted-foreground">
                  Each AI persona is uniquely generated based on the specific digital legacy and personal memories you provide.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Continuous Improvement</h3>
                <p className="text-muted-foreground">
                  Your feedback helps refine and enhance the AI's ability to reflect your loved one's personality and mannerisms.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Echoes of the Past — A compassionate approach to digital remembrance
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © 2025 Echoes of the Past. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
