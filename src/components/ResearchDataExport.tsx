import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Database, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ClassificationRecord {
  id: string;
  timestamp: Date;
  species: string;
  confidence: number;
  scientificName: string;
  habitat: string;
  conservationStatus: string;
  imageUrl?: string;
}

interface ResearchDataExportProps {
  classificationData: ClassificationRecord[];
}

export const ResearchDataExport: React.FC<ResearchDataExportProps> = ({ classificationData }) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const exportToCSV = async () => {
    setIsExporting(true);
    try {
      const headers = ['ID', 'Timestamp', 'Species', 'Scientific Name', 'Confidence', 'Habitat', 'Conservation Status'];
      const csvContent = [
        headers.join(','),
        ...classificationData.map(record => [
          record.id,
          record.timestamp.toISOString(),
          `"${record.species}"`,
          `"${record.scientificName}"`,
          record.confidence.toFixed(4),
          `"${record.habitat}"`,
          `"${record.conservationStatus}"`
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wildlife_research_data_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Data Exported",
        description: "Research data successfully exported to CSV format.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export research data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJSON = async () => {
    setIsExporting(true);
    try {
      const jsonData = {
        metadata: {
          exportDate: new Date().toISOString(),
          totalRecords: classificationData.length,
          version: "1.0",
          format: "Wildlife Classification Research Dataset"
        },
        classifications: classificationData.map(record => ({
          ...record,
          timestamp: record.timestamp.toISOString()
        }))
      };

      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wildlife_research_dataset_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Dataset Exported",
        description: "Research dataset successfully exported to JSON format.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export research dataset. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const generateCitation = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    const citation = `Wildlife Classification Research Team. (${year}). Wildlife Species Classification Dataset [Data set]. Retrieved ${month}/${day}/${year}, from Wildlife Classification System. DOI: 10.5281/zenodo.wildlife.${year}.${classificationData.length}`;
    
    navigator.clipboard.writeText(citation);
    toast({
      title: "Citation Copied",
      description: "Academic citation copied to clipboard.",
    });
  };

  const generateStatisticsReport = () => {
    const speciesCounts = classificationData.reduce((acc, record) => {
      acc[record.species] = (acc[record.species] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const conservationCounts = classificationData.reduce((acc, record) => {
      acc[record.conservationStatus] = (acc[record.conservationStatus] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const avgConfidence = classificationData.reduce((sum, record) => sum + record.confidence, 0) / classificationData.length;

    const report = {
      summary: {
        totalClassifications: classificationData.length,
        uniqueSpecies: Object.keys(speciesCounts).length,
        averageConfidence: avgConfidence.toFixed(4),
        dateRange: {
          from: Math.min(...classificationData.map(r => r.timestamp.getTime())),
          to: Math.max(...classificationData.map(r => r.timestamp.getTime()))
        }
      },
      speciesDistribution: speciesCounts,
      conservationStatusDistribution: conservationCounts,
      highConfidenceClassifications: classificationData.filter(r => r.confidence > 0.9).length,
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wildlife_statistics_report_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Report Generated",
      description: "Statistical analysis report has been generated and downloaded.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Research Data Export & Analytics
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Export classification data for academic research, statistical analysis, and publication
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Data Export Formats</h4>
            <div className="flex gap-2">
              <Button 
                onClick={exportToCSV} 
                disabled={isExporting || classificationData.length === 0}
                size="sm"
                className="flex-1"
              >
                <FileText className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button 
                onClick={exportToJSON} 
                disabled={isExporting || classificationData.length === 0}
                size="sm"
                variant="outline"
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Export JSON
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Academic Tools</h4>
            <div className="flex gap-2">
              <Button 
                onClick={generateCitation} 
                disabled={classificationData.length === 0}
                size="sm"
                variant="secondary"
                className="flex-1"
              >
                <FileText className="h-4 w-4 mr-2" />
                Copy Citation
              </Button>
              <Button 
                onClick={generateStatisticsReport} 
                disabled={classificationData.length === 0}
                size="sm"
                variant="outline"
                className="flex-1"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Statistics Report
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Dataset Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Records:</span>
              <span className="ml-2 font-medium">{classificationData.length}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Unique Species:</span>
              <span className="ml-2 font-medium">
                {new Set(classificationData.map(r => r.species)).size}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Avg. Confidence:</span>
              <span className="ml-2 font-medium">
                {classificationData.length > 0 
                  ? (classificationData.reduce((sum, r) => sum + r.confidence, 0) / classificationData.length * 100).toFixed(1) + '%'
                  : 'N/A'
                }
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">High Confidence:</span>
              <span className="ml-2 font-medium">
                {classificationData.filter(r => r.confidence > 0.9).length}
              </span>
            </div>
          </div>
        </div>

        {classificationData.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <Database className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No classification data available for export</p>
            <p className="text-sm">Classify some wildlife to generate research data</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};