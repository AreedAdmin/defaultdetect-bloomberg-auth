import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DefaultedApplication {
  sk_id_curr: number;
  name_contract_type_x: string;
  income_per_person: number;
  def_30_cnt_social_circle: number;
  name_client_type: string;
  phone_change_years_ago: number;
  outstanding_loan_amount: number;
  original_loan_amount: number;
  monthly_payment: number;
  payments_made: number;
  created_at: string;
}

export const DefaultedApplicationsTable = () => {
  const [applications, setApplications] = useState<DefaultedApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 25;

  useEffect(() => {
    fetchDefaultedApplications();
  }, [currentPage]);

  const fetchDefaultedApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const from = currentPage * pageSize;
      const to = from + pageSize - 1;

      // Get total count
      const { count } = await supabase
        .from("defaulted_applications_view")
        .select("*", { count: "exact", head: true });

      setTotalCount(count || 0);

      // Get paginated data
      const { data, error: fetchError } = await supabase
        .from("defaulted_applications_view")
        .select("*")
        .order("outstanding_loan_amount", { ascending: false })
        .range(from, to);

      if (fetchError) throw fetchError;
      
      setApplications(data || []);
    } catch (err) {
      console.error("Error fetching defaulted applications:", err);
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);
  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Defaulted Loan Applications</CardTitle>
            <CardDescription>
              Overview of loan applications that have defaulted, sorted by outstanding amount
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Page {currentPage + 1} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={!canGoPrevious || loading}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!canGoNext || loading}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableCaption>
              {applications.length === 0
                ? "No defaulted applications found"
                : `Showing ${applications.length} defaulted applications`}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Client ID</TableHead>
                <TableHead>Contract Type</TableHead>
                <TableHead>Client Type</TableHead>
                <TableHead className="text-right">Income/Person</TableHead>
                <TableHead className="text-right">Outstanding</TableHead>
                <TableHead className="text-right">Original Amount</TableHead>
                <TableHead className="text-center">Defaults in Circle</TableHead>
                <TableHead className="text-right">Phone Changes</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                applications.map((app) => (
                  <TableRow key={app.sk_id_curr}>
                    <TableCell className="font-medium">{app.sk_id_curr}</TableCell>
                    <TableCell>{app.name_contract_type_x || "N/A"}</TableCell>
                    <TableCell>{app.name_client_type || "N/A"}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(app.income_per_person)}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-destructive">
                      {formatCurrency(app.outstanding_loan_amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(app.original_loan_amount)}
                    </TableCell>
                    <TableCell className="text-center">
                      {app.def_30_cnt_social_circle}
                    </TableCell>
                    <TableCell className="text-right">
                      {app.phone_change_years_ago?.toFixed(1) || "N/A"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(app.created_at)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
