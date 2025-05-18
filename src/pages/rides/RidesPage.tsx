import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockRides } from '@/data/mockData';
import { Car } from 'lucide-react';

export default function RidesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Available Rides</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRides.map((ride) => (
          <Card key={ride.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">
                {ride.startLocation} → {ride.endLocation}
              </CardTitle>
              <Car className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Driver: {ride.driver.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Departure: {ride.departureTime}
                </p>
                <p className="text-sm text-muted-foreground">
                  Available Seats: {ride.availableSeats}
                </p>
                {ride.notes && (
                  <p className="text-sm text-muted-foreground">
                    Notes: {ride.notes}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  {ride.recurrence === 'recurring' && ride.recurringDays.map((day) => (
                    <span
                      key={day}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs capitalize"
                    >
                      {day}
                    </span>
                  ))}
                  {ride.recurrence === 'oneTime' && (
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                      One-time ride
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}