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
    { name: 'Lun', rides: 12, co2: 35 },
    { name: 'Mar', rides: 19, co2: 42 },
    { name: 'Mer', rides: 15, co2: 38 },
    { name: 'Jeu', rides: 21, co2: 52 },
    { name: 'Ven', rides: 18, co2: 45 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau RSE</h1>
          <p className="text-muted-foreground">
            Suivez l'impact environnemental de votre organisation grâce au covoiturage
          </p>
        </div>
        <div className="flex gap-2">
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sélectionnez une période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total des trajets"
          value={mockRideStats.totalRides}
          description={timeRange === 'month' ? 'Ce mois-ci' : 'Cette période'}
          icon={<Car className="h-4 w-4" />}
          trend={{ value: 15, positive: true }}
        />
        <StatCard
          title="Utilisateurs actifs"
          value={mockRideStats.activeUsers}
          description={`${Math.round(mockRideStats.activeUsers / 120 * 100)}% de l'organisation`}
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Distance totale"
          value={`${mockRideStats.totalKilometers} km`}
          description="Trajets partagés"
          icon={<ArrowUpRight className="h-4 w-4" />}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="CO₂ économisé"
          value={`${mockRideStats.co2Saved} kg`}
          description="Émissions carbone"
          icon={<Leaf className="h-4 w-4" />}
          trend={{ value: 20, positive: true }}
        />
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="departments">Par département</TabsTrigger>
          <TabsTrigger value="weekly">Tendances hebdomadaires</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Impact global
              </CardTitle>
              <CardDescription>
                Résumé des indicateurs de durabilité dans l'organisation
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
                  <Bar dataKey="rides" name="Trajets" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="users" name="Utilisateurs actifs" fill="hsl(var(--chart-2))" />
                  <Bar dataKey="co2" name="CO₂ économisé (kg)" fill="hsl(var(--chart-3))" />
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
                  CO₂ économisé par département
                </CardTitle>
                <CardDescription>
                  Répartition des économies de carbone par département
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
                      {departmentPieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} kg CO₂`, 'Économisé']}
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
                <CardTitle>Performance par département</CardTitle>
                <CardDescription>
                  Détail par département
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Département</TableHead>
                      <TableHead className="text-right">Trajets</TableHead>
                      <TableHead className="text-right">Utilisateurs</TableHead>
                      <TableHead className="text-right">CO₂ économisé</TableHead>
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
              <CardTitle>Tendances hebdomadaires</CardTitle>
              <CardDescription>
                Suivi quotidien des trajets et des économies de CO₂ cette semaine
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
                  <Bar yAxisId="left" dataKey="rides" name="Nombre de trajets" fill="hsl(var(--chart-1))" />
                  <Bar yAxisId="right" dataKey="co2" name="CO₂ économisé (kg)" fill="hsl(var(--chart-3))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* RSE Report Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Rapport d'impact RSE</CardTitle>
          <CardDescription>
            Résumé de la contribution environnementale de votre organisation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/40 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Impact environnemental</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">CO₂ économisé :</span>
                    <span className="font-medium">{mockRideStats.co2Saved} kg</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Carburant économisé :</span>
                    <span className="font-medium">{Math.round(mockRideStats.totalKilometers * 0.07)} litres</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Équivalent arbres :</span>
                    <span className="font-medium">{Math.round(mockRideStats.co2Saved / 20)} arbres</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-muted/40 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Impact social</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Participants actifs :</span>
                    <span className="font-medium">{mockRideStats.activeUsers} employés</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Taux de participation :</span>
                    <span className="font-medium">{Math.round(mockRideStats.activeUsers / 120 * 100)}%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Connexions créées :</span>
                    <span className="font-medium">{Math.round(mockRideStats.totalRides * 1.8)}</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-muted/40 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Impact économique</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Économies réalisées :</span>
                    <span className="font-medium">200000Dh</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Places de parking économisées :</span>
                    <span className="font-medium">9 places</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Économie moy./utilisateur :</span>
                    <span className="font-medium">900Dh/mois</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Télécharger le rapport complet
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
