import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Cpu, 
  Zap, 
  Database, 
  Network, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const TechnicalInfoPanel: React.FC = () => {
  // Neural network information
  const neuralNetInfo = {
    modelType: 'MobileNetV4 CNN',
    architecture: 'Convolutional Neural Network',
    trainedOn: 'ImageNet-1K dataset',
    accuracy: 85.2,
    parameters: '14.7M',
    inputSize: '224x224',
    preprocessing: 'Normalization & Augmentation'
  };

  // API token status
  const tokenStatus = [
    { id: 'token_1', status: 'active', usage: 75, limit: 1000 },
    { id: 'token_2', status: 'active', usage: 432, limit: 1000 },
    { id: 'token_3', status: 'active', usage: 89, limit: 1000 },
    { id: 'token_4', status: 'standby', usage: 12, limit: 1000 },
    { id: 'token_5', status: 'standby', usage: 0, limit: 1000 }
  ];

  const totalUsage = tokenStatus.reduce((sum, token) => sum + token.usage, 0);
  const totalLimit = tokenStatus.length * 1000;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Neural Network Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-nature" />
            Neural Network Details
          </CardTitle>
          <CardDescription>
            Advanced AI model specifications for wildlife classification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Model Type</p>
              <Badge variant="outline" className="mt-1">
                {neuralNetInfo.modelType}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium">Architecture</p>
              <p className="text-sm text-muted-foreground">{neuralNetInfo.architecture}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Training Dataset</p>
              <p className="text-sm text-muted-foreground">{neuralNetInfo.trainedOn}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Parameters</p>
              <p className="text-sm text-muted-foreground">{neuralNetInfo.parameters}</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium">Model Accuracy</p>
              <span className="text-sm font-semibold text-nature">{neuralNetInfo.accuracy}%</span>
            </div>
            <Progress value={neuralNetInfo.accuracy} className="w-full" />
          </div>

          <div className="flex items-center gap-2 p-3 bg-nature/10 rounded-lg">
            <Cpu className="w-4 h-4 text-nature" />
            <div>
              <p className="text-sm font-medium">Processing</p>
              <p className="text-xs text-muted-foreground">
                WebGPU acceleration enabled • {neuralNetInfo.inputSize} input resolution
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Token Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="w-5 h-5 text-accent" />
            API Token Round-Robin System
          </CardTitle>
          <CardDescription>
            Distributed token management for unlimited requests
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gradient-card rounded-lg">
            <div>
              <p className="text-sm font-medium">Total API Usage</p>
              <p className="text-xs text-muted-foreground">
                {totalUsage.toLocaleString()} / {totalLimit.toLocaleString()} requests
              </p>
            </div>
            <Badge variant={totalUsage < totalLimit * 0.8 ? 'default' : 'destructive'}>
              {((totalUsage / totalLimit) * 100).toFixed(1)}%
            </Badge>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Active Tokens</p>
            {tokenStatus.slice(0, 3).map((token, index) => (
              <div key={token.id} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-2">
                  {token.status === 'active' ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-yellow-500" />
                  )}
                  <span className="text-xs font-mono">{token.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16">
                    <Progress value={(token.usage / token.limit) * 100} className="h-2" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {token.usage}/{token.limit}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg">
            <Zap className="w-4 h-4 text-accent" />
            <div>
              <p className="text-sm font-medium">Smart Load Balancing</p>
              <p className="text-xs text-muted-foreground">
                Automatic failover • {tokenStatus.filter(t => t.status === 'active').length} active tokens
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Active ({tokenStatus.filter(t => t.status === 'active').length})</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Standby ({tokenStatus.filter(t => t.status === 'standby').length})</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};