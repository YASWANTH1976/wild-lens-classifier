import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, PlayCircle, StopCircle, Download, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ClassificationService } from '@/lib/classificationService';

interface BatchProcessingProps {
  onBatchComplete: (results: any[]) => void;
}

interface ProcessingItem {
  id: string;
  file: File;
  status: 'pending' | 'processing' | 'completed' | 'error';
  result?: any;
  error?: string;
}

export const BatchProcessing: React.FC<BatchProcessingProps> = ({ onBatchComplete }) => {
  const [files, setFiles] = useState<ProcessingItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);
  const { toast } = useToast();

  const classificationService = new ClassificationService();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== selectedFiles.length) {
      toast({
        title: "Invalid Files",
        description: "Only image files are supported for batch processing.",
        variant: "destructive",
      });
    }

    const newItems: ProcessingItem[] = imageFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'pending'
    }));

    setFiles(prev => [...prev, ...newItems]);
  }, [toast]);

  const processBatch = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setProgress(0);
    setProcessedCount(0);

    const results: any[] = [];
    let completed = 0;

    for (const item of files) {
      if (item.status !== 'pending') continue;

      try {
        // Update status to processing
        setFiles(prev => prev.map(f => 
          f.id === item.id ? { ...f, status: 'processing' as const } : f
        ));

        const result = await classificationService.classifyAnimal(item.file);
        
        // Update with result
        setFiles(prev => prev.map(f => 
          f.id === item.id ? { ...f, status: 'completed' as const, result } : f
        ));

        results.push({
          filename: item.file.name,
          timestamp: new Date().toISOString(),
          ...result
        });

        completed++;
        setProcessedCount(completed);
        setProgress((completed / files.filter(f => f.status === 'pending' || f.status === 'processing' || f.status === 'completed').length) * 100);

        // Small delay to prevent overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === item.id ? { 
            ...f, 
            status: 'error' as const, 
            error: error instanceof Error ? error.message : 'Classification failed'
          } : f
        ));
      }
    }

    setIsProcessing(false);
    onBatchComplete(results);

    toast({
      title: "Batch Processing Complete",
      description: `Successfully processed ${results.length} images.`,
    });
  };

  const stopProcessing = () => {
    setIsProcessing(false);
    toast({
      title: "Processing Stopped",
      description: "Batch processing has been halted.",
    });
  };

  const clearAll = () => {
    setFiles([]);
    setProgress(0);
    setProcessedCount(0);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const exportResults = () => {
    const completedItems = files.filter(item => item.status === 'completed' && item.result);
    const results = completedItems.map(item => ({
      filename: item.file.name,
      species: item.result.label,
      confidence: item.result.confidence,
      scientificName: item.result.scientificName || 'Unknown',
      timestamp: new Date().toISOString()
    }));

    const csvContent = [
      'Filename,Species,Confidence,Scientific Name,Timestamp',
      ...results.map(r => `"${r.filename}","${r.species}",${r.confidence},"${r.scientificName}","${r.timestamp}"`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch_classification_results_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const pendingFiles = files.filter(f => f.status === 'pending').length;
  const completedFiles = files.filter(f => f.status === 'completed').length;
  const errorFiles = files.filter(f => f.status === 'error').length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Batch Image Processing
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Upload multiple images for automated batch classification and analysis
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={() => document.getElementById('batch-file-input')?.click()}
            disabled={isProcessing}
            className="flex-1"
          >
            <Upload className="h-4 w-4 mr-2" />
            Select Images
          </Button>
          <Button
            onClick={processBatch}
            disabled={pendingFiles === 0 || isProcessing}
            variant="default"
          >
            <PlayCircle className="h-4 w-4 mr-2" />
            Start Processing
          </Button>
          {isProcessing && (
            <Button
              onClick={stopProcessing}
              variant="destructive"
            >
              <StopCircle className="h-4 w-4 mr-2" />
              Stop
            </Button>
          )}
        </div>

        <input
          id="batch-file-input"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {files.length > 0 && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress: {processedCount} / {files.length}</span>
                <span>{progress.toFixed(1)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-600">{pendingFiles}</div>
                <div className="text-muted-foreground">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{files.filter(f => f.status === 'processing').length}</div>
                <div className="text-muted-foreground">Processing</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{completedFiles}</div>
                <div className="text-muted-foreground">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">{errorFiles}</div>
                <div className="text-muted-foreground">Errors</div>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2">
              {files.map(item => (
                <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{item.file.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {(item.file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.status === 'completed' && item.result && (
                      <div className="text-xs text-green-600">
                        {item.result.label} ({(item.result.confidence * 100).toFixed(1)}%)
                      </div>
                    )}
                    {item.status === 'error' && (
                      <div className="flex items-center text-xs text-red-600">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Error
                      </div>
                    )}
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'pending' ? 'bg-yellow-500' :
                      item.status === 'processing' ? 'bg-blue-500 animate-pulse' :
                      item.status === 'completed' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFile(item.id)}
                      disabled={isProcessing && item.status === 'processing'}
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={exportResults}
                disabled={completedFiles === 0}
                variant="outline"
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
              <Button
                onClick={clearAll}
                disabled={isProcessing}
                variant="outline"
              >
                Clear All
              </Button>
            </div>
          </>
        )}

        {files.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <Upload className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No images selected for batch processing</p>
            <p className="text-sm">Select multiple images to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};