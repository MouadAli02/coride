import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCircle, Mail, Phone, MapPin, Calendar } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-8">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <UserCircle className="h-24 w-24" />
              </Avatar>
              <div className="text-center">
                <h2 className="text-2xl font-bold">Ali</h2>
                <p className="text-muted-foreground">Membre depuis 2024</p>
              </div>
              <Button>Modifier le profil</Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Informations</TabsTrigger>
            <TabsTrigger value="rides">Historique des trajets</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span>ali@example.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>+212 606060606</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>California, Casablanca</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>Inscription en janvier 2024</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rides">
            <Card>
              <CardHeader>
                <CardTitle>Trajets récents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Aucun trajet à afficher</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Avis des utilisateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Aucun avis pour le moment</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}