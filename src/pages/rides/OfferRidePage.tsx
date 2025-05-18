import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Car,
  MapPin,
  Clock,
  Users,
  MessageSquare,
  RefreshCw,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
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
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/providers/AuthProvider';
import { WeekDay } from '@/types';

const weekDays: { label: string; value: WeekDay }[] = [
  { label: 'Lundi', value: 'monday' },
  { label: 'Mardi', value: 'tuesday' },
  { label: 'Mercredi', value: 'wednesday' },
  { label: 'Jeudi', value: 'thursday' },
  { label: 'Vendredi', value: 'friday' },
];

const formSchema = z.object({
  startLocation: z.string().min(2, 'Le lieu de départ est requis'),
  endLocation: z.string().min(2, 'La destination est requise'),
  departureTime: z.string().min(5, 'L\'heure de départ est requise'),
  availableSeats: z.coerce.number().int().min(1).max(8),
  recurrence: z.enum(['oneTime', 'recurring']),
  recurringDays: z.array(z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday']))
    .optional()
    .refine(value => 
      value === undefined || value.length > 0, 
      { message: 'Sélectionnez au moins un jour pour les trajets récurrents' }
    ),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const OfferRidePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startLocation: user?.location || '',
      endLocation: '',
      departureTime: '',
      availableSeats: 1,
      recurrence: 'recurring',
      recurringDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      notes: '',
    },
  });

  const recurrenceType = form.watch('recurrence');

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send this data to your backend
      console.log('Submitted ride offer:', data);
      
      toast.success('Trajet proposé avec succès', {
        description: 'Votre trajet a été publié.',
      });
      
      navigate('/rides');
    } catch (error) {
      console.error(error);
      toast.error('Échec de la proposition de trajet', {
        description: 'Veuillez réessayer plus tard.',
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <h1 className="text-3xl font-bold tracking-tight">Proposer un trajet</h1>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            Nouveau trajet
          </CardTitle>
          <CardDescription>
            Remplissez les détails ci-dessous pour proposer un trajet à vos collègues
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
                      <FormLabel>Lieu de départ</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Entrez le point de départ" 
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
                            placeholder="Entrez la destination" 
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

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="departureTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Heure de départ</FormLabel>
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

                <FormField
                  control={form.control}
                  name="availableSeats"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Places disponibles</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Users className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Select
                            onValueChange={(value) => field.onChange(parseInt(value))}
                            defaultValue={field.value.toString()}
                          >
                            <SelectTrigger className="pl-9">
                              <SelectValue placeholder="Sélectionnez le nombre de places" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                                <SelectItem key={number} value={number.toString()}>
                                  {number} {number === 1 ? 'place' : 'places'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="recurrence"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Récurrence</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="oneTime" id="r1" />
                          <Label htmlFor="r1">Trajet unique</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="recurring" id="r2" />
                          <Label htmlFor="r2">Trajet récurrent</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {recurrenceType === 'recurring' && (
                <FormField
                  control={form.control}
                  name="recurringDays"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Jours récurrents</FormLabel>
                        <FormDescription>
                          Sélectionnez les jours où ce trajet sera disponible
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {weekDays.map((day) => (
                          <FormField
                            key={day.value}
                            control={form.control}
                            name="recurringDays"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={day.value}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(day.value)}
                                      onCheckedChange={(checked) => {
                                        const currentValue = field.value || [];
                                        return checked
                                          ? field.onChange([...currentValue, day.value])
                                          : field.onChange(
                                              currentValue.filter(
                                                (value) => value !== day.value
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {day.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes additionnelles (Optionnel)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MessageSquare className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Textarea
                          placeholder="Ajoutez des détails qui pourraient être utiles pour les passagers"
                          className="resize-none pl-9 pt-2"
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
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Publication du trajet...
                  </>
                ) : (
                  'Proposer le trajet'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OfferRidePage;