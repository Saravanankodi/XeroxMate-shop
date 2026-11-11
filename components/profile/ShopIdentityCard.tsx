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

export default function ShopIdentityCard() {
  return (
    <section className="dashboard-card p-6">
      <CardHeader
        icon={Store}
        title="Shop Identity & Ownership Details"
        subtitle="Verified merchant business credentials, legal owner, and direct contact details"
        action={
          <Badge
            tone="success"
            className="gap-1.5 px-3 py-1 text-[11px] leading-[14px] text-[#00201D]"
          >
            <BadgeCheck size={16} className="text-[#00312C]" />
            Verified Partner
          </Badge>
        }
      />

      <div className="mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <ProfileField
            label="Shop Name"
            required
            icon={Store}
            defaultValue="Tamil Printers"
          />
          <ProfileField
            label="Shop Registration / License Code"
            required
            icon={FileText}
            defaultValue="XMX-SHOP-44091"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ProfileField
            label="Owner / Proprietor Name"
            required
            icon={User}
            defaultValue="Saravanan K"
            hint="Authorized Signatory / Proprietor"
          />
          <ProfileField
            label="Owner Email Address"
            required
            icon={Mail}
            defaultValue="saravanan.tamilprinters@gmail.com"
            hint="Used for monthly settlement invoices and legal notices"
            className="text-xs"
            trailing={
              <BadgeCheck
                size={15}
                className="text-brand-strong"
              />
            }
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ProfileField
            label="Primary Contact Phone"
            required
            icon={Phone}
            defaultValue="+91 9092579460"
            hint="Direct dispatch alerts & instant SMS notifications"
          />
          <ProfileField
            label="Shop Landline / Backup Contact"
            icon={Phone}
            defaultValue="0435 242 1108"
            hint="Customer escalation & store reception desk"
          />
        </div>
      </div>
    </section>
  );
}
