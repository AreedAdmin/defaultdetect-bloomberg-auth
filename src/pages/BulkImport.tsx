import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, CheckCircle, AlertCircle } from 'lucide-react';

const BulkImport = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleImport = async () => {
    setLoading(true);
    setProgress(0);
    setResult(null);

    try {
      toast({
        title: "Starting import",
        description: "This may take several minutes for large files...",
      });

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('bulk-load-csv', {
        body: {
          filePath: 'merged_df_clean.csv',
          batchSize: 500
        }
      });

      if (error) throw error;

      setResult(data);
      setProgress(100);

      toast({
        title: "Import successful!",
        description: `Processed ${data.stats?.successfulRows || 0} rows`,
      });

    } catch (error: any) {
      console.error('Import error:', error);
      toast({
        title: "Import failed",
        description: error.message || "An error occurred during import",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Phase 2: Bulk CSV Import</CardTitle>
          <CardDescription>
            Import merged_df_clean.csv from storage into loan_applications table
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">CSV File</h3>
                <p className="text-sm text-muted-foreground">merged_df_clean.csv (1.18 GB)</p>
              </div>
              <Button 
                onClick={handleImport} 
                disabled={loading}
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Start Import
                  </>
                )}
              </Button>
            </div>

            {loading && (
              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-center text-muted-foreground">
                  Importing data... This may take 10-30 minutes for large files
                </p>
              </div>
            )}

            {result && (
              <Card className={result.success ? "border-green-500" : "border-red-500"}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    {result.success ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold">
                        {result.success ? 'Import Complete!' : 'Import Failed'}
                      </h3>
                      {result.stats && (
                        <div className="text-sm space-y-1">
                          <p>Total Rows: {result.stats.totalRows?.toLocaleString()}</p>
                          <p>Successful: {result.stats.successfulRows?.toLocaleString()}</p>
                          <p>Errors: {result.stats.errorCount?.toLocaleString()}</p>
                          {result.stats.transformResult && (
                            <p className="mt-2 p-2 bg-muted rounded">
                              Transform Result: {JSON.stringify(result.stats.transformResult)}
                            </p>
                          )}
                        </div>
                      )}
                      {result.error && (
                        <p className="text-sm text-red-500">{result.error}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <h4 className="font-semibold text-foreground">Process Steps:</h4>
            <ol className="list-decimal list-inside space-y-1">
              <li>Download CSV from storage bucket</li>
              <li>Parse CSV data (1.4M rows)</li>
              <li>Clear staging table</li>
              <li>Batch insert into loan_staging (500 rows/batch)</li>
              <li>Transform and upsert into loan_applications</li>
            </ol>
            <p className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
              <strong>Note:</strong> For faster imports, you can use direct psql COPY command. 
              See CSV_IMPORT_INSTRUCTIONS.md for details.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkImport;
