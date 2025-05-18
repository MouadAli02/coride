import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar,
  Car,
  Users,
  Leaf,
  BarChart3,
  Clock,
  MapPin,
  Bell
} from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import StatCard from '@/components/dashboard/StatCard';
import { useAuth } from '@/providers/AuthProvider';
import { mockRides, mockRideRequests } from '@/data/mockData';

const DashboardPage = () => {
  const { user } = useAuth();

  // User's upcoming rides
  const userRides = mockRides.filter(ride => 
    ride.driverId === user?.id && ride.status === 'active'
  );

  // User's ride requests
  const userRequests = mockRideRequests.filter(request => 
    (request.passengerId === user?.id || 
      (request.ride.driverId === user?.id && request.status === 'pending'))
  );

  // Show toast notification on component mount (demo purposes)
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.info('Nouvelle correspondance de trajet !', {
        description: 'Un collègue de votre région vient de publier un trajet.',
        action: {
          label: 'Voir',
          onClick: () => {},
        },
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue, {user?.name} ! Voici ce qui se passe avec vos trajets.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Vos trajets actifs"
          value={userRides.length}
          description="En tant que conducteur"
          icon={<Car className="h-4 w-4" />}
        />
        <StatCard
          title="Demandes de trajet"
          value={userRequests.length}
          description="Actions en attente"
          icon={<Bell className="h-4 w-4" />}
        />
        <StatCard
          title="CO₂ économisé"
          value="35 kg"
          description="Ce mois-ci"
          icon={<Leaf className="h-4 w-4" />}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Participants"
          value="43"
          description="Dans votre organisation"
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Trajets à venir</TabsTrigger>
          <TabsTrigger value="requests">Demandes de trajet</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {userRides.length > 0 ? (
              userRides.map((ride) => (
                <Card key={ride.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {ride.startLocation} vers {ride.endLocation}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        Départ à {ride.departureTime}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {ride.recurrence === 'recurring'
                          ? `Récurrent : ${ride.recurringDays.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ')}`
                          : 'Trajet unique'}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        {ride.availableSeats} places disponibles
                      </div>
                      {ride.notes && (
                        <div className="text-muted-foreground mt-2 text-xs italic">
                          "{ride.notes}"
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="col-span-2">
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground mb-4">
                    Vous n'avez aucun trajet à venir.
                  </p>
                  <Button asChild>
                    <Link to="/rides/offer">Proposer un trajet</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="requests" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {userRequests.length > 0 ? (
              userRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">
                      {request.passengerId === user?.id
                        ? `Votre demande à ${request.ride.driver.name}`
                        : `Demande de ${request.passenger.name}`}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {request.ride.startLocation} vers {request.ride.endLocation}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        Départ à {request.ride.departureTime}
                      </div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          request.status === 'accepted'
                            ? 'bg-success/20 text-success'
                            : request.status === 'rejected'
                            ? 'bg-destructive/20 text-destructive'
                            : 'bg-warning/20 text-warning'
                        }`}>
                          {request.status === 'accepted' ? 'Acceptée'
                            : request.status === 'rejected' ? 'Refusée'
                            : 'En attente'}
                        </span>
                      </div>
                      {request.status === 'pending' && request.ride.driverId === user?.id && (
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="default" className="h-8">
                            Accepter
                          </Button>
                          <Button size="sm" variant="outline" className="h-8">
                            Refuser
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="col-span-2">
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground mb-4">
                    Vous n'avez aucune demande de trajet.
                  </p>
                  <Button asChild>
                    <Link to="/rides/find">Rechercher un trajet</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Impact de l'entreprise</h2>
          {user?.role === 'admin' && (
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin">
                <BarChart3 className="mr-2 h-4 w-4" />
                Tableau RSE complet
              </Link>
            </Button>
          )}
        </div>
        <Separator className="my-4" />
        <div className="rounded-lg bg-card p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-primary">128</span>
              <span className="text-sm text-muted-foreground">Trajets partagés ce mois</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-primary">2,567 km</span>
              <span className="text-sm text-muted-foreground">Distance partagée</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-primary">385 kg</span>
              <span className="text-sm text-muted-foreground">CO₂ économisé</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;