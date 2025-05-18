import { User, Ride, RideRequest, Message, Notification, RideStats, DepartmentStats } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'admin@coride.com',
    name: 'Admin User',
    role: 'admin',
    organization: 'Demo Company',
    location: 'Sidi Maarouf',
    createdAt: '2023-01-15T08:00:00.000Z',
  },
  {
    id: 'user-2',
    email: 'sara@coride.com',
    name: 'Sara El Amrani',
    role: 'user',
    organization: 'Demo Company',
    location: 'Sidi Maarouf',
    createdAt: '2023-01-20T10:30:00.000Z',
  },
  {
    id: 'user-3',
    email: 'karim@coride.com',
    name: 'Karim Benali',
    role: 'user',
    organization: 'Demo Company',
    location: 'Derb Ghallef',
    createdAt: '2023-02-05T14:15:00.000Z',
  },
  {
    id: 'user-4',
    email: 'leila@coride.com',
    name: 'Leila Tazi',
    role: 'user',
    organization: 'Demo Company',
    location: 'Maarif',
    createdAt: '2023-02-10T09:45:00.000Z',
  },
];

// Mock Rides
export const mockRides: Ride[] = [
  {
    id: 'ride-1',
    driverId: 'user-2',
    driver: mockUsers[1],
    startLocation: 'Sidi Maarouf',
    endLocation: 'Derb Ghallef',
    departureTime: '17:00',
    availableSeats: 3,
    recurrence: 'recurring',
    recurringDays: ['monday', 'tuesday', 'wednesday', 'thursday'],
    notes: 'I leave from the main entrance of the business center',
    createdAt: '2023-03-01T11:30:00.000Z',
    status: 'active',
  },
  {
    id: 'ride-2',
    driverId: 'user-3',
    driver: mockUsers[2],
    startLocation: 'Derb Ghallef',
    endLocation: 'Sidi Maarouf',
    departureTime: '08:30',
    availableSeats: 2,
    recurrence: 'recurring',
    recurringDays: ['monday', 'wednesday', 'friday'],
    createdAt: '2023-03-02T10:15:00.000Z',
    status: 'active',
  },
  {
    id: 'ride-3',
    driverId: 'user-4',
    driver: mockUsers[3],
    startLocation: 'Maarif',
    endLocation: 'Sidi Maarouf',
    departureTime: '08:45',
    availableSeats: 4,
    recurrence: 'oneTime',
    recurringDays: [],
    notes: 'One-time ride this Friday',
    createdAt: '2023-03-05T16:45:00.000Z',
    status: 'active',
  },
];

// Mock Ride Requests
export const mockRideRequests: RideRequest[] = [
  {
    id: 'request-1',
    rideId: 'ride-1',
    ride: mockRides[0],
    passengerId: 'user-3',
    passenger: mockUsers[2],
    status: 'accepted',
    createdAt: '2023-03-02T14:30:00.000Z',
  },
  {
    id: 'request-2',
    rideId: 'ride-1',
    ride: mockRides[0],
    passengerId: 'user-4',
    passenger: mockUsers[3],
    status: 'pending',
    createdAt: '2023-03-02T15:45:00.000Z',
  },
  {
    id: 'request-3',
    rideId: 'ride-2',
    ride: mockRides[1],
    passengerId: 'user-2',
    passenger: mockUsers[1],
    status: 'rejected',
    createdAt: '2023-03-03T09:15:00.000Z',
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'message-1',
    senderId: 'user-2',
    receiverId: 'user-3',
    rideId: 'ride-1',
    content: 'Hi! I\'ve accepted your ride request. We\'ll meet at the main entrance.',
    createdAt: '2023-03-02T14:45:00.000Z',
    read: true,
  },
  {
    id: 'message-2',
    senderId: 'user-3',
    receiverId: 'user-2',
    rideId: 'ride-1',
    content: 'Great, thanks! What color is your car?',
    createdAt: '2023-03-02T14:50:00.000Z',
    read: true,
  },
  {
    id: 'message-3',
    senderId: 'user-2',
    receiverId: 'user-3',
    rideId: 'ride-1',
    content: 'It\'s a blue Toyota. I\'ll be there at 16:55.',
    createdAt: '2023-03-02T14:55:00.000Z',
    read: false,
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notification-1',
    userId: 'user-2',
    title: 'Ride Request',
    message: 'Karim Benali has requested to join your ride to Derb Ghallef',
    type: 'info',
    read: true,
    link: '/rides',
    createdAt: '2023-03-02T14:30:00.000Z',
  },
  {
    id: 'notification-2',
    userId: 'user-2',
    title: 'Ride Request',
    message: 'Leila Tazi has requested to join your ride to Derb Ghallef',
    type: 'info',
    read: false,
    link: '/rides',
    createdAt: '2023-03-02T15:45:00.000Z',
  },
  {
    id: 'notification-3',
    userId: 'user-3',
    title: 'Request Accepted',
    message: 'Sara El Amrani has accepted your ride request',
    type: 'success',
    read: true,
    link: '/rides',
    createdAt: '2023-03-02T14:45:00.000Z',
  },
  {
    id: 'notification-4',
    userId: 'user-3',
    title: 'New Message',
    message: 'You have received a new message from Sara El Amrani',
    type: 'info',
    read: false,
    link: '/messages',
    createdAt: '2023-03-02T14:55:00.000Z',
  },
];

// Mock Ride Stats
export const mockRideStats: RideStats = {
  totalRides: 128,
  activeUsers: 43,
  totalKilometers: 2567,
  co2Saved: 385,
};

// Mock Department Stats
export const mockDepartmentStats: DepartmentStats[] = [
  {
    department: 'HR',
    ridesCount: 45,
    usersCount: 12,
    co2Saved: 120,
  },
  {
    department: 'IT',
    ridesCount: 38,
    usersCount: 15,
    co2Saved: 102,
  },
  {
    department: 'Finance',
    ridesCount: 25,
    usersCount: 8,
    co2Saved: 78,
  },
  {
    department: 'Marketing',
    ridesCount: 20,
    usersCount: 8,
    co2Saved: 85,
  },
];