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
      toast.info('New ride match!', {
        description: 'A colleague from your area has just posted a ride.',
        action: {
          label: 'View',
          onClick: () => {},
        },
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}! Here's what's happening with your rides.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Your Active Rides"
          value={userRides.length}
          description="As driver"
          icon={<Car className="h-4 w-4" />}
        />
        <StatCard
          title="Ride Requests"
          value={userRequests.length}
          description="Pending actions"
          icon={<Bell className="h-4 w-4" />}
        />
        <StatCard
          title="CO₂ Saved"
          value="35 kg"
          description="This month"
          icon={<Leaf className="h-4 w-4" />}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Total Participants"
          value="43"
          description="In your organization"
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Rides</TabsTrigger>
          <TabsTrigger value="requests">Ride Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {userRides.length > 0 ? (
              userRides.map((ride) => (
                <Card key={ride.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {ride.startLocation} to {ride.endLocation}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        Departure at {ride.departureTime}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {ride.recurrence === 'recurring'
                          ? `Recurring: ${ride.recurringDays.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ')}`
                          : 'One-time ride'}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        {ride.availableSeats} seats available
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
                    You don't have any upcoming rides.
                  </p>
                  <Button asChild>
                    <Link to="/rides/offer">Offer a Ride</Link>
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
                        ? `Your request to ${request.ride.driver.name}`
                        : `Request from ${request.passenger.name}`}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {request.ride.startLocation} to {request.ride.endLocation}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        Departure at {request.ride.departureTime}
                      </div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          request.status === 'accepted'
                            ? 'bg-success/20 text-success'
                            : request.status === 'rejected'
                            ? 'bg-destructive/20 text-destructive'
                            : 'bg-warning/20 text-warning'
                        }`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </div>
                      {request.status === 'pending' && request.ride.driverId === user?.id && (
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="default" className="h-8">
                            Accept
                          </Button>
                          <Button size="sm" variant="outline" className="h-8">
                            Decline
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
                    You don't have any ride requests.
                  </p>
                  <Button asChild>
                    <Link to="/rides/find">Find a Ride</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Company Impact</h2>
          {user?.role === 'admin' && (
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin">
                <BarChart3 className="mr-2 h-4 w-4" />
                Full RSE Dashboard
              </Link>
            </Button>
          )}
        </div>
        <Separator className="my-4" />
        <div className="rounded-lg bg-card p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-primary">128</span>
              <span className="text-sm text-muted-foreground">Shared rides this month</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-primary">2,567 km</span>
              <span className="text-sm text-muted-foreground">Distance shared</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-primary">385 kg</span>
              <span className="text-sm text-muted-foreground">CO₂ emissions saved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;