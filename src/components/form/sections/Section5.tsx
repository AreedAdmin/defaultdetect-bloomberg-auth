import { useFormContext } from "@/contexts/FormContext";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

export const Section5 = () => {
  const { formData, updateFormData } = useFormContext();

  const numActiveContacts = [
    formData.FLAG_MOBIL,
    formData.FLAG_EMP_PHONE,
    formData.FLAG_WORK_PHONE,
    formData.FLAG_CONT_MOBILE,
    formData.FLAG_PHONE,
    formData.FLAG_EMAIL,
  ].filter(Boolean).length;

  const hasWorkContact = formData.FLAG_WORK_PHONE || formData.FLAG_EMP_PHONE;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Section 5: Contact Information</h2>
        <p className="text-muted-foreground">Available contact methods</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <Label htmlFor="FLAG_MOBIL" className="cursor-pointer">Has mobile phone</Label>
          <Switch
            id="FLAG_MOBIL"
            checked={formData.FLAG_MOBIL}
            onCheckedChange={(checked) => updateFormData({ FLAG_MOBIL: checked })}
            className="data-[state=checked]:bg-accent"
          />
        </div>

        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <Label htmlFor="FLAG_EMP_PHONE" className="cursor-pointer">Has employer phone</Label>
          <Switch
            id="FLAG_EMP_PHONE"
            checked={formData.FLAG_EMP_PHONE}
            onCheckedChange={(checked) => updateFormData({ FLAG_EMP_PHONE: checked })}
            className="data-[state=checked]:bg-accent"
          />
        </div>

        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <Label htmlFor="FLAG_WORK_PHONE" className="cursor-pointer">Has work phone</Label>
          <Switch
            id="FLAG_WORK_PHONE"
            checked={formData.FLAG_WORK_PHONE}
            onCheckedChange={(checked) => updateFormData({ FLAG_WORK_PHONE: checked })}
            className="data-[state=checked]:bg-accent"
          />
        </div>

        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <Label htmlFor="FLAG_CONT_MOBILE" className="cursor-pointer">Reachable via mobile</Label>
          <Switch
            id="FLAG_CONT_MOBILE"
            checked={formData.FLAG_CONT_MOBILE}
            onCheckedChange={(checked) => updateFormData({ FLAG_CONT_MOBILE: checked })}
            className="data-[state=checked]:bg-accent"
          />
        </div>

        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <Label htmlFor="FLAG_PHONE" className="cursor-pointer">Has home phone</Label>
          <Switch
            id="FLAG_PHONE"
            checked={formData.FLAG_PHONE}
            onCheckedChange={(checked) => updateFormData({ FLAG_PHONE: checked })}
            className="data-[state=checked]:bg-accent"
          />
        </div>

        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <Label htmlFor="FLAG_EMAIL" className="cursor-pointer">Has email address</Label>
          <Switch
            id="FLAG_EMAIL"
            checked={formData.FLAG_EMAIL}
            onCheckedChange={(checked) => updateFormData({ FLAG_EMAIL: checked })}
            className="data-[state=checked]:bg-accent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
        <Card className="p-6 bg-card border-accent/20">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Active Contact Methods</h4>
          <p className="text-4xl font-bold text-foreground">{numActiveContacts}</p>
        </Card>

        <Card className="p-6 bg-card border-accent/20">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Work Contact Available</h4>
          <p className={`text-4xl font-bold ${hasWorkContact ? "text-success" : "text-destructive"}`}>
            {hasWorkContact ? "Yes" : "No"}
          </p>
        </Card>
      </div>
    </div>
  );
};
