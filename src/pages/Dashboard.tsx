
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ComponentGrid from '@/components/dashboard/ComponentGrid';
import { components } from '@/lib/dummyData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Calendar, Layers, Users } from 'lucide-react';

const Dashboard = () => {
  // Stats would typically come from an API
  const stats = [
    { 
      title: 'Total Components', 
      value: components.length, 
      change: '+12%', 
      icon: Layers,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-100'
    },
    { 
      title: 'Components Created', 
      value: '12', 
      change: '+25%', 
      icon: Calendar,
      iconColor: 'text-green-500',
      iconBg: 'bg-green-100'
    },
    { 
      title: 'Active Users', 
      value: '25', 
      change: '+18%', 
      icon: Users,
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-100'
    },
    { 
      title: 'Usage Analytics', 
      value: '1.5k', 
      change: '+32%', 
      icon: BarChart,
      iconColor: 'text-amber-500',
      iconBg: 'bg-amber-100'
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-full ${stat.iconBg}`}>
                    <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Components</h2>
          <ComponentGrid components={components} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
