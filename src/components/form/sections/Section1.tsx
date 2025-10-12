import { useFormContext } from "@/contexts/FormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const contractTypesXY = ["Cash loans", "Revolving loans", "Consumer loans", "XNA"];

const suites = [
  "Unaccompanied",
  "Family",
  "Spouse, partner",
  "Children",
  "Other_A",
  "Other_B",
  "Group of people",
  "NA",
];

export default function Section1() {
  const { formData, updateFormData } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Section 1: Identifiers & Current/Prev App Meta</h2>
        <p className="text-muted-foreground">IDs and core application descriptors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* IDs */}
        <div>
          <Label htmlFor="SK_ID_CURR">Client ID (SK_ID_CURR)</Label>
          <Input
            id="SK_ID_CURR"
            type="number"
            min={1}
            value={formData.SK_ID_CURR ?? ""}
            onChange={(e) => updateFormData({ SK_ID_CURR: Number(e.target.value) || null })}
          />
        </div>

        <div>
          <Label htmlFor="SK_ID_PREV">Previous Application ID (SK_ID_PREV)</Label>
          <Input
            id="SK_ID_PREV"
            type="number"
            min={1}
            value={formData.SK_ID_PREV ?? ""}
            onChange={(e) => updateFormData({ SK_ID_PREV: Number(e.target.value) || null })}
          />
        </div>

        <div>
          <Label htmlFor="community_id">Community ID</Label>
          <Input
            id="community_id"
            type="number"
            min={1}
            value={formData.community_id ?? ""}
            onChange={(e) => updateFormData({ community_id: Number(e.target.value) || null })}
          />
        </div>

        <div>
          <Label htmlFor="TARGET">Target (0/1)</Label>
          <Input
            id="TARGET"
            type="number"
            min={0}
            max={1}
            value={formData.TARGET ?? ""}
            onChange={(e) => updateFormData({ TARGET: Number(e.target.value) || 0 })}
          />
        </div>

        {/* Current application meta (x) */}
        <div>
          <Label htmlFor="NAME_CONTRACT_TYPE_x">Current Contract Type</Label>
          <Select
            value={formData.NAME_CONTRACT_TYPE_x ?? ""}
            onValueChange={(v) => updateFormData({ NAME_CONTRACT_TYPE_x: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              {contractTypesXY.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="NAME_TYPE_SUITE_x">Companion Type (NAME_TYPE_SUITE_x)</Label>
          <Select
            value={formData.NAME_TYPE_SUITE_x ?? ""}
            onValueChange={(v) => updateFormData({ NAME_TYPE_SUITE_x: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select suite" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              {suites.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="WEEKDAY_APPR_PROCESS_START_x">Weekday Approval Start (x)</Label>
          <Select
            value={formData.WEEKDAY_APPR_PROCESS_START_x ?? ""}
            onValueChange={(v) => updateFormData({ WEEKDAY_APPR_PROCESS_START_x: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select weekday" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              {weekdays.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="HOUR_APPR_PROCESS_START_x">Hour Approval Start (0–23) (x)</Label>
          <Input
            id="HOUR_APPR_PROCESS_START_x"
            type="number"
            min={0}
            max={23}
            value={formData.HOUR_APPR_PROCESS_START_x ?? ""}
            onChange={(e) => updateFormData({ HOUR_APPR_PROCESS_START_x: Number(e.target.value) || 0 })}
          />
        </div>

        {/* Previous application meta (y) */}
        <div>
          <Label htmlFor="NAME_CONTRACT_TYPE_y">Previous Contract Type (y)</Label>
          <Select
            value={formData.NAME_CONTRACT_TYPE_y ?? ""}
            onValueChange={(v) => updateFormData({ NAME_CONTRACT_TYPE_y: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              {contractTypesXY.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="WEEKDAY_APPR_PROCESS_START_y">Weekday Approval Start (y)</Label>
          <Select
            value={formData.WEEKDAY_APPR_PROCESS_START_y ?? ""}
            onValueChange={(v) => updateFormData({ WEEKDAY_APPR_PROCESS_START_y: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select weekday" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              {weekdays.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="HOUR_APPR_PROCESS_START_y">Hour Approval Start (0–23) (y)</Label>
          <Input
            id="HOUR_APPR_PROCESS_START_y"
            type="number"
            min={0}
            max={23}
            value={formData.HOUR_APPR_PROCESS_START_y ?? ""}
            onChange={(e) => updateFormData({ HOUR_APPR_PROCESS_START_y: Number(e.target.value) || 0 })}
          />
        </div>
      </div>
    </div>
  );
}
