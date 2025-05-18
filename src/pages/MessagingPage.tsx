import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Send, UserCircle } from 'lucide-react';

export default function MessagingPage() {
  return (
    <div className="container mx-auto h-[calc(100vh-4rem)]">
      <div className="grid h-full grid-cols-12 gap-4">
        {/* Contacts List */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-4">
                {[1, 2, 3].map((contact) => (
                  <div
                    key={contact}
                    className="flex items-center space-x-4 rounded-lg p-3 transition-colors hover:bg-accent cursor-pointer"
                  >
                    <Avatar>
                      <UserCircle className="h-10 w-10" />
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">Contact {contact}</p>
                      <p className="text-sm text-muted-foreground">Dernier message...</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="col-span-8">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <UserCircle className="h-10 w-10" />
              </Avatar>
              <CardTitle>Nom du contact</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-16rem)] mb-4">
              <div className="space-y-4">
                {[1, 2, 3].map((message) => (
                  <div
                    key={message}
                    className={`flex ${
                      message % 2 === 0 ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`rounded-lg p-3 max-w-[70%] ${
                        message % 2 === 0
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p>Ceci est un exemple de message.</p>
                      <p className="text-xs mt-1 opacity-70">12:34</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Tapez votre message..."
                className="flex-1"
              />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}