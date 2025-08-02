import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Globe,
  Camera,
  Users,
  Clock
} from 'lucide-react';

interface MonitoringData {
  totalSightings: number;
  uniqueSpecies: number;
  conservationAlerts: number;
  activeMonitors: number;
  recentActivity: Array<{
    id: string;
    species: string;
    location: string;
    timestamp: Date;
    status: 'normal' | 'alert' | 'critical';
    confidence: number;
  }>;
  speciesTrends: Array<{
    species: string;
    sightings: number;
    trend: 'up' | 'down' | 'stable';
    change: number;
  }>;
  conservationStatus: Array<{
    status: string;
    count: number;
    color: string;
  }>;
}

export const WildlifeMonitoringDashboard: React.FC = () => {
  const [monitoringData, setMonitoringData] = useState<MonitoringData>({
    totalSightings: 15847,
    uniqueSpecies: 2341,
    conservationAlerts: 23,
    activeMonitors: 156,
    recentActivity: [
      {
        id: '1',
        species: 'Panthera tigris',
        location: 'Sundarbans Reserve',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        status: 'normal',
        confidence: 0.94
      },
      {
        id: '2',
        species: 'Loxodonta africana',
        location: 'Kruger National Park',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        status: 'alert',
        confidence: 0.87
      },
      {
        id: '3',
        species: 'Ursus maritimus',
        location: 'Arctic Research Station',
        timestamp: new Date(Date.now() - 1000 * 60 * 120),
        status: 'critical',
        confidence: 0.96
      }
    ],
    speciesTrends: [
      { species: 'Bengal Tiger', sightings: 234, trend: 'up', change: 12.5 },
      { species: 'African Elephant', sightings: 189, trend: 'down', change: -8.3 },
      { species: 'Snow Leopard', sightings: 67, trend: 'stable', change: 2.1 },
      { species: 'Giant Panda', sightings: 143, trend: 'up', change: 18.7 },
      { species: 'Mountain Gorilla', sightings: 89, trend: 'up', change: 6.4 }
    ],
    conservationStatus: [
      { status: 'Least Concern', count: 1456, color: 'bg-green-500' },
      { status: 'Near Threatened', count: 342, color: 'bg-yellow-500' },
      { status: 'Vulnerable', count: 287, color: 'bg-orange-500' },
      { status: 'Endangered', count: 184, color: 'bg-red-500' },
      { status: 'Critically Endangered', count: 72, color: 'bg-red-700' }
    ]
  });

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        // Simulate real-time updates
        setMonitoringData(prev => ({
          ...prev,
          totalSightings: prev.totalSightings + Math.floor(Math.random() * 3),
          activeMonitors: prev.activeMonitors + Math.floor(Math.random() * 2) - 1
        }));
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [isLive]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal':
        return <Badge className="bg-green-500">Normal</Badge>;
      case 'alert':
        return <Badge className="bg-yellow-500">Alert</Badge>;
      case 'critical':
        return <Badge className="bg-red-500">Critical</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Wildlife Monitoring Dashboard</h2>
          <p className="text-muted-foreground">Real-time global wildlife tracking and conservation monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-sm text-muted-foreground">
            {isLive ? 'Live' : 'Offline'}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLive(!isLive)}
          >
            {isLive ? 'Pause' : 'Resume'} Monitoring
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Sightings</p>
                <p className="text-2xl font-bold">{monitoringData.totalSightings.toLocaleString()}</p>
              </div>
              <Camera className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unique Species</p>
                <p className="text-2xl font-bold">{monitoringData.uniqueSpecies.toLocaleString()}</p>
              </div>
              <Globe className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conservation Alerts</p>
                <p className="text-2xl font-bold text-red-500">{monitoringData.conservationAlerts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Monitors</p>
                <p className="text-2xl font-bold">{monitoringData.activeMonitors}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Wildlife Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monitoringData.recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">{activity.species}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Globe className="h-3 w-3" />
                      {activity.location}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {activity.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    {getStatusBadge(activity.status)}
                    <div className="text-xs text-muted-foreground">
                      {(activity.confidence * 100).toFixed(0)}% confidence
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Species Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Species Population Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monitoringData.speciesTrends.map(trend => (
                <div key={trend.species} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{trend.species}</div>
                    <div className="text-sm text-muted-foreground">
                      {trend.sightings} sightings this month
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(trend.trend)}
                    <span className={`text-sm font-medium ${
                      trend.trend === 'up' ? 'text-green-500' :
                      trend.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {trend.change > 0 ? '+' : ''}{trend.change.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conservation Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Conservation Status Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monitoringData.conservationStatus.map(status => (
              <div key={status.status} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded ${status.color}`} />
                  <span className="font-medium">{status.status}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">{status.count} species</span>
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${status.color}`}
                      style={{ 
                        width: `${(status.count / monitoringData.uniqueSpecies) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};