import {
  Activity, BarChart3, CheckCircle2, Zap, Database, Server,
  Shield, Users, AlertCircle, Network, Upload, CreditCard,
  Settings, Brain, GraduationCap, Library, ShoppingBag,
  CalendarClock, Wallet, CalendarCheck
} from 'lucide-react';

export const API_BASE_URL = 'https://api.rightsteps.app/v1';

export const healthEndpoints = [
  {
    name: 'Main Health',
    path: '/health',
    module: 'core',
    description: 'Basic health check',
    icon: Activity
  },
  {
    name: 'Detailed Health',
    path: '/health/detailed',
    module: 'core',
    description: 'Detailed system health',
    icon: BarChart3
  },
  {
    name: 'Ready Check',
    path: '/health/ready',
    module: 'core',
    description: 'Kubernetes readiness',
    icon: CheckCircle2
  },
  {
    name: 'Live Check',
    path: '/health/live',
    module: 'core',
    description: 'Kubernetes liveness',
    icon: Zap
  },
  {
    name: 'Database Health',
    path: '/health/database',
    module: 'core',
    description: 'Database connections',
    icon: Database
  },
  {
    name: 'System Status',
    path: '/health/system',
    module: 'core',
    description: 'Full system status',
    icon: Server
  },
  {
    name: 'Auth Module',
    path: '/auth/health',
    module: 'auth',
    description: 'Authentication module',
    icon: Shield
  },
  {
    name: 'Profile Module',
    path: '/profile/health',
    module: 'profile',
    description: 'User profiles',
    icon: Users
  },
  {
    name: 'Notification Module',
    path: '/notifications/health',
    module: 'notification',
    description: 'Notifications',
    icon: AlertCircle
  },
  {
    name: 'Community Module',
    path: '/community/health',
    module: 'community',
    description: 'Community features',
    icon: Network
  },
  {
    name: 'Upload Module',
    path: '/upload/health',
    module: 'upload',
    description: 'File uploads',
    icon: Upload
  },
  {
    name: 'Subscription Module',
    path: '/subscription/health',
    module: 'subscription',
    description: 'Subscriptions',
    icon: CreditCard
  },
  {
    name: 'Admin Module',
    path: '/admin/health',
    module: 'admin',
    description: 'Admin panel',
    icon: Settings
  },
  {
    name: 'AI-Tutor Module',
    path: '/ai-tutor/health',
    module: 'ai-tutor',
    description: 'AI tutor features',
    icon: Brain
  },
  {
    name: 'Curriculum Module',
    path: '/curriculum/health',
    module: 'curriculum',
    description: 'Curriculum management',
    icon: GraduationCap
  },
  {
    name: 'Content Module',
    path: '/content/health',
    module: 'content',
    description: 'Content management',
    icon: Library
  },
  {
    name: 'Marketplace Module',
    path: '/marketplace/health',
    module: 'marketplace',
    description: 'Marketplace features',
    icon: ShoppingBag
  },
  {
    name: 'Availability Module',
    path: '/availability/health',
    module: 'availability',
    description: 'Tutor availability',
    icon: CalendarClock
  },
  {
    name: 'Wallet Module',
    path: '/wallet/health',
    module: 'wallet',
    description: 'Creator wallet',
    icon: Wallet
  },
  {
    name: 'Booking Module',
    path: '/bookings/health',
    module: 'bookings',
    description: 'Booking system',
    icon: CalendarCheck
  }
];

export const chartConfig = {
  memory: {
    label: "Memory Usage",
    color: "hsl(var(--chart-1))",
  },
  cpu: {
    label: "CPU Usage",
    color: "hsl(var(--chart-2))",
  },
  uptime: {
    label: "Uptime",
    color: "hsl(var(--chart-3))",
  },
};
