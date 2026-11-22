import {
  BadgeCheck,
  FileText,
  Mail,
  Phone,
  Store,
  User,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import CardHeader from "./CardHeader";
import ProfileField from "./ProfileField";
import type { ProfileChangeHandler, ShopProfile } from "./types";

interface ShopIdentityCardProps {
  value: ShopProfile;
  onChange: ProfileChangeHandler;
}

export default function ShopIdentityCard({
  value,
  onChange,
}: ShopIdentityCardProps) {
  return (
    <section className="dashboard-card p-6">
      <CardHeader
        icon={Store}
        title="Shop Identity & Ownership Details"
        subtitle="Verified merchant business credentials, legal owner, and direct contact details"
        action={
          <Badge
            tone="success"
            className="gap-1.5 px-3 py-1 text-[11px] leading-3.5 text-[#00201D]"
          >
            <BadgeCheck size={16} className="text-[#00312C]" />
            Verification pending
          </Badge>
        }
      />

      <div className="mt-4 space-y-4 2xl:mt-6 2xl:space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <ProfileField
            label="Shop Name"
            required
            icon={Store}
            name="shopName"
            value={value.shopName}
            onChange={(event) => onChange("shopName", event.target.value)}
          />
          <ProfileField
            label="Shop Registration / License Code"
            required
            icon={FileText}
            name="registrationCode"
            value={value.registrationCode}
            onChange={(event) =>
              onChange("registrationCode", event.target.value)
            }
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ProfileField
            label="Owner / Proprietor Name"
            required
            icon={User}
            name="ownerName"
            value={value.ownerName}
            onChange={(event) => onChange("ownerName", event.target.value)}
            hint="Authorized Signatory / Proprietor"
          />
          <ProfileField
            label="Owner Email Address"
            required
            icon={Mail}
            name="ownerEmail"
            type="email"
            value={value.ownerEmail}
            onChange={(event) => onChange("ownerEmail", event.target.value)}
            hint="Used for monthly settlement invoices and legal notices"
            className="text-xs"
            trailing={<BadgeCheck size={15} className="text-brand-strong" />}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ProfileField
            label="Primary Contact Phone"
            required
            icon={Phone}
            name="contactPhone"
            value={value.contactPhone}
            onChange={(event) => onChange("contactPhone", event.target.value)}
            hint="Direct dispatch alerts & instant SMS notifications"
          />
          <ProfileField
            label="Shop Landline / Backup Contact"
            icon={Phone}
            name="backupPhone"
            value={value.backupPhone}
            onChange={(event) => onChange("backupPhone", event.target.value)}
            hint="Optional · Customer escalation & store reception desk"
          />
        </div>
      </div>
    </section>
  );
}
