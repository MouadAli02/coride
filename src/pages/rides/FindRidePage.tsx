import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Search, 
  MapPin, 
  Clock, 
  Calendar,
  Users,
  ChevronLeft,
  RefreshCw,
  UserCircle,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/providers/AuthProvider';
import { mockRides } from '@/data/mockData';
import { Ride, User } from '@/types';

const searchSchema = z.object({
  startLocation: z.string().optional(),
  endLocation: z.string().min(2, 'Destination is required'),
  time: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

const FindRidePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Ride[] | null>(null);

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      startLocation: user?.location || '',
      endLocation: '',
      time: '',
    },
  });

  const onSubmit = async (data: SearchFormValues) => {
    setIsSearching(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Filter rides based on search criteria (simplified for demo)
      const filteredRides = mockRides.filter(ride => {
        // Filter by end location
        const matchesEndLocation = ride.endLocation.toLowerCase().includes(
          data.endLocation.toLowerCase()
        );
        
        // Filter by start location if provided
        const matchesStartLocation = !data.startLocation || 
          ride.startLocation.toLowerCase().includes(data.startLocation.toLowerCase());
        
        // Filter by time if provided
        const matchesTime = !data.time || 
          ride.departureTime === data.time;
        
        return matchesEndLocation && matchesStartLocation && matchesTime;
      });
      
      setSearchResults(filteredRides);
      
      if (filteredRides.length === 0) {
        toast.info('No rides found', {
          description: 'Try adjusting your search criteria.',
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Search failed', {
        description: 'Please try again later.',
      });
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleRequestRide = (ride: Ride) => {
    toast.success('Ride request sent', {
      description: `Your request to join ${ride.driver.name}'s ride has been sent.`,
    });
  };
  
  const handleChatWithDriver = (driver: User) => {
    toast('Chat initiated', {
      description: `You can now message ${driver.name}.`,
    });
    navigate('/messages');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Find a Ride</h1>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Search for Rides
          </CardTitle>
          <CardDescription>
            Enter your destination and preferences to find available rides
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Starting Area (Optional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Your location" 
                            className="pl-9" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Where are you going?" 
                            className="pl-9" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Departure Time (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="time" 
                          className="pl-9" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Searching Rides...
                  </>
                ) : (
                  'Search Rides'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {/* Search Results */}
      {isSearching && (
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-xl font-semibold">Searching for rides...</h2>
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {!isSearching && searchResults && (
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-xl font-semibold">
            {searchResults.length} 
            {searchResults.length === 1 ? ' ride ' : ' rides '} 
            found
          </h2>
          
          {searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((ride) => (
                <Card key={ride.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex flex-col items-center">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={ride.driver.avatar} alt={ride.driver.name} />
                          <AvatarFallback>
                            {ride.driver.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-medium mt-2">{ride.driver.name}</p>
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-6">
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">From</p>
                            <p className="font-medium">{ride.startLocation}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">To</p>
                            <p className="font-medium">{ride.endLocation}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>{ride.departureTime}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>{ride.availableSeats} seats available</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>
                              {ride.recurrence === 'recurring'
                                ? `${ride.recurringDays.map(d => d.charAt(0).toUpperCase() + d.slice(1, 3)).join(', ')}`
                                : 'One-time'}
                            </span>
                          </div>
                        </div>
                        
                        {ride.notes && (
                          <p className="text-sm text-muted-foreground italic">
                            "{ride.notes}"
                          </p>
                        )}
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                          <Button onClick={() => handleRequestRide(ride)}>
                            Request Ride
                          </Button>
                          <Button variant="outline" onClick={() => handleChatWithDriver(ride.driver)}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No rides found matching your criteria.
                </p>
                <Button onClick={() => form.reset()}>
                  Modify Search
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default FindRidePage;