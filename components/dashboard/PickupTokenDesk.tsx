"use client";

import { useState } from "react";
import { QrCode, ScanQrCode, Search } from "lucide-react";
import Card from "../ui/Card";

export default function PickupTokenDesk() {
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");

  const verifyPin = () => {
    if (pin.length !== 4) {
      setMessage("Please enter a valid 4-digit PIN.");
      return;
    }

    setMessage("PIN submitted for verification.");
  };

  return (
    <Card className="flex h-full flex-col gap-2 p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-heading text-base font-semibold leading-[22px] text-ink">
          Pickup Token Desk
        </h3>

        <QrCode size={16} className="text-brand-strong" />
      </div>

      <p className="text-xs leading-4 text-muted">
        Enter 4-digit pickup passcode or order serial number:
      </p>

      <div className="mt-1 flex items-center gap-1">
        <div className="relative min-w-0 flex-1">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#757682]"
          />

          <input
            value={pin}
            onChange={(e) => {
              setPin(e.target.value.replace(/\D/g, "").slice(0, 4));
              setMessage("");
            }}
            placeholder="e.g. 2839 or OMX-..."
            className="w-full rounded-lg bg-lilac py-2.5 pl-9 pr-3 text-sm font-semibold text-ink outline-none placeholder:font-semibold placeholder:text-[#9ca3af] focus:ring-1 focus:ring-brand"
          />
        </div>

        <button
          onClick={verifyPin}
          className="shrink-0 rounded-lg bg-navy px-4 py-2 font-heading text-xs font-medium leading-4 text-white transition hover:bg-[#001a52]"
        >
          Verify PIN
        </button>
      </div>

      {message && (
        <p className="text-xs leading-4 text-blue-700">{message}</p>
      )}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
        <span className="text-xs font-semibold leading-[14px] text-muted">
          Pending OTPs: 2 awaiting
        </span>

        <button className="flex items-center gap-1 text-xs font-semibold leading-[14px] text-brand-strong transition hover:text-brand">
          <ScanQrCode size={12} />
          Open Scanner Cam
        </button>
      </div>
    </Card>
  );
}
