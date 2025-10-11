import { useFormContext } from "@/contexts/FormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export const Section4 = () => {
  const { formData, updateFormData } = useFormContext();

  const ageYears = formData.DAYS_BIRTH ? Math.abs(formData.DAYS_BIRTH) / 365.25 : 0;
  const employedYears = formData.DAYS_EMPLOYED ? Math.abs(formData.DAYS_EMPLOYED) / 365.25 : 0;
  const registrationYearsAgo = formData.DAYS_REGISTRATION ? Math.abs(formData.DAYS_REGISTRATION) / 365.25 : 0;
  const idPublishYearsAgo = formData.DAYS_ID_PUBLISH ? Math.abs(formData.DAYS_ID_PUBLISH) / 365.25 : 0;
  const phoneChangeYearsAgo = formData.DAYS_LAST_PHONE_CHANGE ? Math.abs(formData.DAYS_LAST_PHONE_CHANGE) / 365.25 : 0;
  const employmentToAgeRatio = ageYears > 0 ? employedYears / ageYears : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Section 4: Age & Employment History</h2>
        <p className="text-muted-foreground">Age and employment timeline information</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="DAYS_BIRTH">Days since birth (negative value)</Label>
          <Input
            id="DAYS_BIRTH"
            type="number"
            placeholder="-12000"
            value={formData.DAYS_BIRTH || ""}
            onChange={(e) => updateFormData({ DAYS_BIRTH: Number(e.target.value) || null })}
          />
          {ageYears > 0 && (
            <p className="text-sm text-accent mt-1">Age: {ageYears.toFixed(1)} years</p>
          )}
        </div>

        <div>
          <Label htmlFor="DAYS_EMPLOYED">Days of current employment (negative = before application)</Label>
          <Input
            id="DAYS_EMPLOYED"
            type="number"
            placeholder="-2000"
            value={formData.DAYS_EMPLOYED || ""}
            onChange={(e) => updateFormData({ DAYS_EMPLOYED: Number(e.target.value) || null })}
          />
          {employedYears > 0 && (
            <p className="text-sm text-accent mt-1">Employment years: {employedYears.toFixed(1)} years</p>
          )}
        </div>

        <div>
          <Label htmlFor="DAYS_REGISTRATION">Days since registration change</Label>
          <Input
            id="DAYS_REGISTRATION"
            type="number"
            placeholder="-3000"
            value={formData.DAYS_REGISTRATION || ""}
            onChange={(e) => updateFormData({ DAYS_REGISTRATION: Number(e.target.value) || null })}
          />
          {registrationYearsAgo > 0 && (
            <p className="text-sm text-accent mt-1">Registration: {registrationYearsAgo.toFixed(1)} years ago</p>
          )}
        </div>

        <div>
          <Label htmlFor="DAYS_ID_PUBLISH">Days since ID publication</Label>
          <Input
            id="DAYS_ID_PUBLISH"
            type="number"
            placeholder="-2500"
            value={formData.DAYS_ID_PUBLISH || ""}
            onChange={(e) => updateFormData({ DAYS_ID_PUBLISH: Number(e.target.value) || null })}
          />
          {idPublishYearsAgo > 0 && (
            <p className="text-sm text-accent mt-1">ID published: {idPublishYearsAgo.toFixed(1)} years ago</p>
          )}
        </div>

        <div>
          <Label htmlFor="DAYS_LAST_PHONE_CHANGE">Days since last phone change</Label>
          <Input
            id="DAYS_LAST_PHONE_CHANGE"
            type="number"
            placeholder="-500"
            value={formData.DAYS_LAST_PHONE_CHANGE || ""}
            onChange={(e) => updateFormData({ DAYS_LAST_PHONE_CHANGE: Number(e.target.value) || null })}
          />
          {phoneChangeYearsAgo > 0 && (
            <p className="text-sm text-accent mt-1">Phone changed: {phoneChangeYearsAgo.toFixed(1)} years ago</p>
          )}
        </div>

        {employmentToAgeRatio > 0 && (
          <Card className="p-6 bg-card/50 border-accent/20">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Employment to Age Ratio</h4>
            <p className="text-3xl font-bold text-foreground">{(employmentToAgeRatio * 100).toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground mt-1">
              You've been employed for {(employmentToAgeRatio * 100).toFixed(1)}% of your life
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};
