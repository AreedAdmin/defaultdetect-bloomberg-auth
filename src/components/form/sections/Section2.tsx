import { useFormContext } from "@/contexts/FormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const occupations = [
  "Laborers", "Core staff", "Managers", "Drivers", "Sales staff", "Cooking staff",
  "Security staff", "Cleaning staff", "Private service staff", "Medicine staff",
  "Secretaries", "Waiters/barmen", "Low-skill Laborers", "Realty agents",
  "High skill tech staff", "IT staff", "HR staff", "Accountants", "N/A"
];

const organizations = [
  "Business Entity Type 1", "Business Entity Type 2", "Business Entity Type 3",
  "XNA", "Self-employed", "Other", "Medicine", "School", "Government", "Religion",
  "Trade: type 1", "Trade: type 2", "Trade: type 3", "Trade: type 4", "Trade: type 5",
  "Trade: type 6", "Trade: type 7", "Industry: type 1", "Industry: type 2",
  "Industry: type 3", "Industry: type 4", "Industry: type 5", "Industry: type 6",
  "Industry: type 7", "Industry: type 8", "Industry: type 9", "Industry: type 10",
  "Industry: type 11", "Industry: type 12", "Industry: type 13", "Transport: type 1",
  "Transport: type 2", "Transport: type 3", "Transport: type 4", "Construction",
  "Housing", "Kindergarten", "University", "Services", "Security Ministries",
  "Police", "Postal", "Emergency", "Security", "Army", "Bank", "Insurance",
  "Mobile", "Electricity", "Telecom", "Realtor", "Culture", "Hotel", "Restaurant",
  "Agriculture", "Cleaning", "Legal Services", "Advertising"
];

export const Section2 = () => {
  const { formData, updateFormData } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Section 2: Personal Information</h2>
        <p className="text-muted-foreground">Provide your personal details</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="CODE_GENDER">Gender</Label>
          <Select value={formData.CODE_GENDER} onValueChange={(value) => updateFormData({ CODE_GENDER: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <Label htmlFor="FLAG_OWN_CAR" className="cursor-pointer">Do you own a car?</Label>
          <Switch
            id="FLAG_OWN_CAR"
            checked={formData.FLAG_OWN_CAR}
            onCheckedChange={(checked) => updateFormData({ FLAG_OWN_CAR: checked })}
            className="data-[state=checked]:bg-accent"
          />
        </div>

        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <Label htmlFor="FLAG_OWN_REALTY" className="cursor-pointer">Do you own real estate?</Label>
          <Switch
            id="FLAG_OWN_REALTY"
            checked={formData.FLAG_OWN_REALTY}
            onCheckedChange={(checked) => updateFormData({ FLAG_OWN_REALTY: checked })}
            className="data-[state=checked]:bg-accent"
          />
        </div>

        <div>
          <Label htmlFor="CNT_CHILDREN">Number of children</Label>
          <Input
            id="CNT_CHILDREN"
            type="number"
            min={0}
            max={15}
            value={formData.CNT_CHILDREN}
            onChange={(e) => updateFormData({ CNT_CHILDREN: Number(e.target.value) })}
          />
        </div>

        <div>
          <Label htmlFor="CNT_FAM_MEMBERS">Number of family members</Label>
          <Input
            id="CNT_FAM_MEMBERS"
            type="number"
            min={1}
            value={formData.CNT_FAM_MEMBERS}
            onChange={(e) => updateFormData({ CNT_FAM_MEMBERS: Math.max(1, Number(e.target.value)) })}
          />
        </div>

        <div>
          <Label htmlFor="NAME_EDUCATION_TYPE">Education Level</Label>
          <Select value={formData.NAME_EDUCATION_TYPE} onValueChange={(value) => updateFormData({ NAME_EDUCATION_TYPE: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="Higher education">Higher education</SelectItem>
              <SelectItem value="Secondary">Secondary</SelectItem>
              <SelectItem value="Incomplete higher">Incomplete higher</SelectItem>
              <SelectItem value="Lower secondary">Lower secondary</SelectItem>
              <SelectItem value="Academic degree">Academic degree</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="NAME_FAMILY_STATUS">Family Status</Label>
          <Select value={formData.NAME_FAMILY_STATUS} onValueChange={(value) => updateFormData({ NAME_FAMILY_STATUS: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select family status" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="Married">Married</SelectItem>
              <SelectItem value="Single">Single</SelectItem>
              <SelectItem value="Civil marriage">Civil marriage</SelectItem>
              <SelectItem value="Separated">Separated</SelectItem>
              <SelectItem value="Widow">Widow</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="NAME_HOUSING_TYPE">Housing Type</Label>
          <Select value={formData.NAME_HOUSING_TYPE} onValueChange={(value) => updateFormData({ NAME_HOUSING_TYPE: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select housing type" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="House/apartment">House/apartment</SelectItem>
              <SelectItem value="With parents">With parents</SelectItem>
              <SelectItem value="Municipal apartment">Municipal apartment</SelectItem>
              <SelectItem value="Rented apartment">Rented apartment</SelectItem>
              <SelectItem value="Office apartment">Office apartment</SelectItem>
              <SelectItem value="Co-op apartment">Co-op apartment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="OCCUPATION_TYPE">Occupation</Label>
          <Select value={formData.OCCUPATION_TYPE} onValueChange={(value) => updateFormData({ OCCUPATION_TYPE: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select occupation" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50 max-h-[300px]">
              {occupations.map((occ) => (
                <SelectItem key={occ} value={occ}>{occ}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="ORGANIZATION_TYPE">Organization Type</Label>
          <Select value={formData.ORGANIZATION_TYPE} onValueChange={(value) => updateFormData({ ORGANIZATION_TYPE: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select organization type" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50 max-h-[300px]">
              {organizations.map((org) => (
                <SelectItem key={org} value={org}>{org}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
