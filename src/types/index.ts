export type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  organization: string;
  location: string;
  avatar?: string;
  createdAt: string;
};

export type RideRecurrence = 'oneTime' | 'recurring';

export type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

export type Ride = {
  id: string;
  driverId: string;
  driver: User;
  startLocation: string;
  endLocation: string;
  departureTime: string;
  availableSeats: number;
  recurrence: RideRecurrence;
  recurringDays: WeekDay[];
  notes?: string;
  createdAt: string;
  status: 'active' | 'completed' | 'cancelled';
};

export type RideRequest = {
  id: string;
  rideId: string;
  ride: Ride;
  passengerId: string;
  passenger: User;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
};

export type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  rideId?: string;
  content: string;
  createdAt: string;
  read: boolean;
};

export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  link?: string;
  createdAt: string;
};

export type RideStats = {
  totalRides: number;
  activeUsers: number;
  totalKilometers: number;
  co2Saved: number;
};

export type DepartmentStats = {
  department: string;
  ridesCount: number;
  usersCount: number;
  co2Saved: number;
};