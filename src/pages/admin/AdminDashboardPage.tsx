import { useState } from 'react';
import { 
  Car, 
  Users, 
  Leaf, 
  ArrowUpRight,
  Download,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import StatCard from '@/components/dashboard/StatCard';
import { mockRideStats, mockDepartmentStats } from '@/data/mockData';

const AdminDashboardPage = () => {
  const [timeRange, setTimeRange] = useState('month');

  const departmentBarData = mockDepartmentStats.map(dept => ({
    name: dept.department,
    rides: dept.ridesCount,
    users: dept.usersCount,
    co2: dept.co2Saved
  }));

  const departmentPieData = mockDepartmentStats.map(dept => ({
    name: dept.department,
    value: dept.co2Saved
  }));

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  // Mock weekly data
  const weeklyData = [
    { name: 'Mon', rides: 12, co2: 35 },
    { name: 'Tue', rides: 19, co2: 42 },
    { name: 'Wed', rides: 15, co2: 38 },
    { name: 'Thu', rides: 21, co2: 52 },
    { name: 'Fri', rides: 18, co2: 45 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">RSE Dashboard</h1>
          <p className="text-muted-foreground">
            Track your organization's sustainability impact through carpooling
          </p>
        </div>
        <div className="flex gap-2">
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select a time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Rides"
          value={mockRideStats.totalRides}
          description={timeRange === 'month' ? 'This month' : 'This period'}
          icon={<Car className="h-4 w-4" />}
          trend={{ value: 15, positive: true }}
        />
        <StatCard
          title="Active Users"
          value={mockRideStats.activeUsers}
          description={`${Math.round(mockRideStats.activeUsers / 120 * 100)}% of organization`}
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Total Distance"
          value={`${mockRideStats.totalKilometers} km`}
          description="Shared rides"
          icon={<ArrowUpRight className="h-4 w-4" />}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="CO₂ Saved"
          value={`${mockRideStats.co2Saved} kg`}
          description="Carbon emissions"
          icon={<Leaf className="h-4 w-4" />}
          trend={{ value: 20, positive: true }}
        />
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">By Department</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Overall Impact
              </CardTitle>
              <CardDescription>
                Summary of sustainability metrics across the organization
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={departmentBarData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      color: 'hsl(var(--foreground))'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="rides" name="Rides" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="users" name="Active Users" fill="hsl(var(--chart-2))" />
                  <Bar dataKey="co2" name="CO₂ Saved (kg)" fill="hsl(var(--chart-3))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="departments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  CO₂ Savings by Department
                </CardTitle>
                <CardDescription>
                  Distribution of carbon savings across departments
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={departmentPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {departmentPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} kg CO₂`, 'Saved']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--border))',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>
                  Detailed breakdown by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead className="text-right">Rides</TableHead>
                      <TableHead className="text-right">Users</TableHead>
                      <TableHead className="text-right">CO₂ Saved</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDepartmentStats.map((dept) => (
                      <TableRow key={dept.department}>
                        <TableCell className="font-medium">{dept.department}</TableCell>
                        <TableCell className="text-right">{dept.ridesCount}</TableCell>
                        <TableCell className="text-right">{dept.usersCount}</TableCell>
                        <TableCell className="text-right">{dept.co2Saved} kg</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Trends</CardTitle>
              <CardDescription>
                Daily tracking of rides and CO₂ savings this week
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      color: 'hsl(var(--foreground))'
                    }} 
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="rides" name="Number of Rides" fill="hsl(var(--chart-1))" />
                  <Bar yAxisId="right" dataKey="co2" name="CO₂ Saved (kg)" fill="hsl(var(--chart-3))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* RSE Report Summary */}
      <Card>
        <CardHeader>
          <CardTitle>RSE Impact Report</CardTitle>
          <CardDescription>
            Summary of your organization's environmental contribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/40 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Environmental Impact</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">CO₂ Emissions Saved:</span>
                    <span className="font-medium">{mockRideStats.co2Saved} kg</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Fuel Saved:</span>
                    <span className="font-medium">{Math.round(mockRideStats.totalKilometers * 0.07)} liters</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Trees Equivalent:</span>
                    <span className="font-medium">{Math.round(mockRideStats.co2Saved / 20)} trees</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-muted/40 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Social Impact</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Active Participants:</span>
                    <span className="font-medium">{mockRideStats.activeUsers} employees</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Participation Rate:</span>
                    <span className="font-medium">{Math.round(mockRideStats.activeUsers / 120 * 100)}%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Connections Made:</span>
                    <span className="font-medium">{Math.round(mockRideStats.totalRides * 1.8)}</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-muted/40 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Economic Impact</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Money Saved:</span>
                    <span className="font-medium">~${Math.round(mockRideStats.totalKilometers * 0.15)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Parking Space Saved:</span>
                    <span className="font-medium">{Math.round(mockRideStats.totalRides * 0.4)} spaces</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Avg. Savings/User:</span>
                    <span className="font-medium">${Math.round((mockRideStats.totalKilometers * 0.15) / mockRideStats.activeUsers)}/month</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download Full Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;