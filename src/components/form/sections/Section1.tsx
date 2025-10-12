import { useFormContext } from "@/contexts/FormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Section1 = () => {
  const { formData, updateFormData } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="SK_ID_CURR" className="required">
          Client ID
        </Label>
        <Input
          id="SK_ID_CURR"
          type="number"
          placeholder="Enter client ID"
          value={formData.SK_ID_CURR || ""}
          onChange={(e) => updateFormData({ SK_ID_CURR: Number(e.target.value) || null })}
          min={1}
          required
        />
      </div>

      <div>
        <Label htmlFor="SK_ID_PREV">Previous Application ID</Label>
        <Input
          id="SK_ID_PREV"
          type="number"
          placeholder="Enter previous application ID (optional)"
          value={formData.SK_ID_PREV || ""}
          onChange={(e) => updateFormData({ SK_ID_PREV: Number(e.target.value) || null })}
          min={1}
        />
      </div>

      <div>
        <Label htmlFor="community_id" className="required">
          Community ID
        </Label>
        <Input
          id="community_id"
          type="number"
          placeholder="Enter community ID"
          value={formData.community_id || ""}
          onChange={(e) => updateFormData({ community_id: Number(e.target.value) || null })}
          min={1}
          required
        />
      </div>
    </div>
  );
};
