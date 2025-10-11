import { useFormContext } from "@/contexts/FormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const RatioCard = ({ label, value, icon: Icon }: { label: string; value: number; icon: any }) => {
  const getRiskLevel = (val: number) => {
    if (val > 4) return "high";
    if (val >= 2) return "medium";
    return "low";
  };

  const risk = getRiskLevel(value);

  return (
    <Card className={cn(
      "p-4 border-2 transition-colors",
      risk === "high" && "border-destructive bg-destructive/5",
      risk === "medium" && "border-yellow-500 bg-yellow-500/5",
      risk === "low" && "border-success bg-success/5"
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-2xl font-bold">{value.toFixed(2)}x</p>
        </div>
        <Icon className={cn(
          "w-8 h-8",
          risk === "high" && "text-destructive",
          risk === "medium" && "text-yellow-500",
          risk === "low" && "text-success"
        )} />
      </div>
    </Card>
  );
};

export const Section3 = () => {
  const { formData, updateFormData } = useFormContext();

  const formatCurrency = (value: number | null) => {
    if (!value) return "";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Auto-calculated ratios
  const creditIncomeRatio = (formData.AMT_CREDIT_x && formData.AMT_INCOME_TOTAL)
    ? formData.AMT_CREDIT_x / formData.AMT_INCOME_TOTAL
    : 0;

  const annuityIncomeRatio = (formData.AMT_ANNUITY_x && formData.AMT_INCOME_TOTAL)
    ? (formData.AMT_ANNUITY_x * 12) / formData.AMT_INCOME_TOTAL
    : 0;

  const creditGoodsRatio = (formData.AMT_CREDIT_x && formData.AMT_GOODS_PRICE_x)
    ? formData.AMT_CREDIT_x / formData.AMT_GOODS_PRICE_x
    : 0;

  const incomePerPerson = formData.AMT_INCOME_TOTAL
    ? formData.AMT_INCOME_TOTAL / formData.CNT_FAM_MEMBERS
    : 0;

  const childrenRatio = formData.CNT_FAM_MEMBERS > 0
    ? formData.CNT_CHILDREN / formData.CNT_FAM_MEMBERS
    : 0;

  const paymentRate = (formData.AMT_ANNUITY_x && formData.AMT_CREDIT_x)
    ? formData.AMT_ANNUITY_x / formData.AMT_CREDIT_x
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Section 3: Income & Financial Capacity</h2>
        <p className="text-muted-foreground">Financial information and calculated ratios</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="AMT_INCOME_TOTAL">Total Annual Income</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="AMT_INCOME_TOTAL"
              type="number"
              className="pl-8"
              placeholder="Enter total annual income"
              value={formData.AMT_INCOME_TOTAL || ""}
              onChange={(e) => updateFormData({ AMT_INCOME_TOTAL: Number(e.target.value) || null })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="NAME_INCOME_TYPE">Income Type</Label>
          <Select value={formData.NAME_INCOME_TYPE} onValueChange={(value) => updateFormData({ NAME_INCOME_TYPE: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select income type" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="Working">Working</SelectItem>
              <SelectItem value="Commercial associate">Commercial associate</SelectItem>
              <SelectItem value="Pensioner">Pensioner</SelectItem>
              <SelectItem value="State servant">State servant</SelectItem>
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="Businessman">Businessman</SelectItem>
              <SelectItem value="Maternity leave">Maternity leave</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="AMT_CREDIT_x">Current Loan Credit Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="AMT_CREDIT_x"
              type="number"
              className="pl-8"
              placeholder="Enter credit amount"
              value={formData.AMT_CREDIT_x || ""}
              onChange={(e) => updateFormData({ AMT_CREDIT_x: Number(e.target.value) || null })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="AMT_ANNUITY_x">Current Loan Annuity (Monthly)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="AMT_ANNUITY_x"
              type="number"
              className="pl-8"
              placeholder="Enter monthly annuity"
              value={formData.AMT_ANNUITY_x || ""}
              onChange={(e) => updateFormData({ AMT_ANNUITY_x: Number(e.target.value) || null })}
            />
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox
              id="AMT_ANNUITY_x_missing"
              checked={formData.AMT_ANNUITY_x_missing}
              onCheckedChange={(checked) => updateFormData({ AMT_ANNUITY_x_missing: checked as boolean })}
            />
            <label htmlFor="AMT_ANNUITY_x_missing" className="text-sm text-muted-foreground cursor-pointer">
              Annuity data unavailable
            </label>
          </div>
        </div>

        <div>
          <Label htmlFor="AMT_GOODS_PRICE_x">Price of Goods for Current Loan</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="AMT_GOODS_PRICE_x"
              type="number"
              className="pl-8"
              placeholder="Enter goods price"
              value={formData.AMT_GOODS_PRICE_x || ""}
              onChange={(e) => updateFormData({ AMT_GOODS_PRICE_x: Number(e.target.value) || null })}
            />
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox
              id="AMT_GOODS_PRICE_x_missing"
              checked={formData.AMT_GOODS_PRICE_x_missing}
              onCheckedChange={(checked) => updateFormData({ AMT_GOODS_PRICE_x_missing: checked as boolean })}
            />
            <label htmlFor="AMT_GOODS_PRICE_x_missing" className="text-sm text-muted-foreground cursor-pointer">
              Goods price unavailable
            </label>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Auto-Calculated Financial Ratios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <RatioCard label="Credit/Income Ratio" value={creditIncomeRatio} icon={TrendingUp} />
          <RatioCard label="Annuity/Income Ratio" value={annuityIncomeRatio} icon={TrendingUp} />
          <RatioCard label="Credit/Goods Ratio" value={creditGoodsRatio} icon={Minus} />
          <Card className="p-4 border-2 border-accent/20">
            <p className="text-sm text-muted-foreground mb-1">Income Per Person</p>
            <p className="text-2xl font-bold">{formatCurrency(incomePerPerson)}</p>
          </Card>
          <Card className="p-4 border-2 border-accent/20">
            <p className="text-sm text-muted-foreground mb-1">Children Ratio</p>
            <p className="text-2xl font-bold">{(childrenRatio * 100).toFixed(1)}%</p>
          </Card>
          <Card className="p-4 border-2 border-accent/20">
            <p className="text-sm text-muted-foreground mb-1">Payment Rate</p>
            <p className="text-2xl font-bold">{(paymentRate * 100).toFixed(2)}%</p>
          </Card>
        </div>
      </div>
    </div>
  );
};
