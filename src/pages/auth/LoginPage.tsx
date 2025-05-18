import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { useAuth } from '@/providers/AuthProvider';
import logo from '@/assets/sharemob.png';

const loginSchema = z.object({
  email: z.string().email('Veuillez saisir une adresse e-mail valide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('Bienvenue !');
      navigate('/');
    } catch (error) {
      toast.error('E-mail ou mot de passe invalide');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Default credentials for demo purposes
  const fillDemoCredentials = () => {
    const demoForm = document.getElementById('login-form') as HTMLFormElement;
    if (demoForm) {
      const emailInput = demoForm.elements.namedItem('email') as HTMLInputElement;
      const passwordInput = demoForm.elements.namedItem('password') as HTMLInputElement;
      
      if (emailInput && passwordInput) {
        emailInput.value = 'admin@coride.com';
        passwordInput.value = 'password123';
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="font-bold text-3xl flex items-center">
       <img 
                src={logo} 
                alt="Logo CoRide" 
                className="h-auto w-8 w-auto object-" 
              />
            </div>
          </div>
          <CardDescription>
            Entrez votre e-mail et mot de passe pour vous connecter
          </CardDescription>
        </CardHeader>
        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                {...register('email')}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <Button variant="link" className="h-auto p-0" asChild>
                  <Link to="/forgot-password">Mot de passe oublié ?</Link>
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full text-sm text-muted-foreground"
              onClick={fillDemoCredentials}
            >
              Utiliser les identifiants de démonstration
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
            <div className="text-center text-sm">
              Vous n'avez pas de compte ?{' '}
              <Link to="/register" className="text-primary hover:underline">
                S'inscrire
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;