# CoRide - Enterprise Carpooling Platform

CoRide is a modern carpooling platform designed for enterprises to help their employees share rides, reduce carbon footprint, and build connections within the organization.

## Features

- 🚗 Ride sharing management
- 👥 User authentication and profiles
- 💬 Real-time messaging between riders
- 📊 RSE impact dashboard
- 🌙 Dark mode support
- 📱 Responsive design

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Visual Studio Code](https://code.visualstudio.com/)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd coride-saas-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Demo Credentials

Use these credentials to test the application:

```
Email: admin@coride.com
Password: password123
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Application pages/routes
├── providers/     # Context providers
├── lib/          # Utility functions
├── types/        # TypeScript type definitions
└── data/         # Mock data for development
```

## Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/)
- [Lucide Icons](https://lucide.dev/)

## Development Notes

- The project uses TypeScript for type safety
- Styling is done with Tailwind CSS
- Components are built using shadcn/ui
- Mock data is used for development purposes
- Authentication is simulated using localStorage

## VSCode Extensions

For the best development experience, install these VSCode extensions:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)