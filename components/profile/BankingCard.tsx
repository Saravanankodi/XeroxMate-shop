"use client";

import { useState } from "react";
import {
  Landmark,
  Loader2,
  Plus,
  ShieldCheck,
  Star,
  Trash2,
  X,
} from "lucide-react";

import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

import CardHeader from "./CardHeader";
import type { WithdrawalAccount } from "./types";

interface BankingCardProps {
  accounts: WithdrawalAccount[];
  onChange: (accounts: WithdrawalAccount[]) => void;
}

interface AccountForm {
  accountHolder: string;
  accountNumber: string;
  ifsc: string;
  bankName: string;
  branch: string;
  isPrimary: boolean;
}

const emptyForm: AccountForm = {
  accountHolder: "",
  accountNumber: "",
  ifsc: "",
  bankName: "",
  branch: "",
  isPrimary: false,
};

function maskAccount(number: string) {
  return number.length > 4 ? `••••••${number.slice(-4)}` : number;
}

export default function BankingCard({
  accounts,
  onChange,
}: BankingCardProps) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<AccountForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof AccountForm, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  async function saveAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const response = await fetch(
        editingId
          ? `/api/shop/withdrawal-accounts/${editingId}`
          : "/api/shop/withdrawal-accounts",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = (await response.json()) as {
        accounts?: WithdrawalAccount[];
        error?: string;
      };

      if (!response.ok || !data.accounts) {
        throw new Error(data.error ?? "Could not save this account.");
      }

      onChange(data.accounts);
      resetForm();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Could not save this account."
      );
    } finally {
      setBusy(false);
    }
  }

  async function removeAccount(id: string) {
    setBusy(true);
    setError("");

    try {
      const response = await fetch(`/api/shop/withdrawal-accounts/${id}`, {
        method: "DELETE",
      });
      const data = (await response.json()) as {
        accounts?: WithdrawalAccount[];
        error?: string;
      };

      if (!response.ok || !data.accounts) {
        throw new Error(data.error ?? "Could not delete this account.");
      }

      onChange(data.accounts);
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Could not delete this account."
      );
    } finally {
      setBusy(false);
    }
  }

  async function makePrimary(id: string) {
    const account = accounts.find((item) => item.id === id);

    if (!account) {
      return;
    }

    setBusy(true);
    setError("");

    try {
      const response = await fetch(`/api/shop/withdrawal-accounts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...account, isPrimary: true }),
      });
      const data = (await response.json()) as {
        accounts?: WithdrawalAccount[];
        error?: string;
      };

      if (!response.ok || !data.accounts) {
        throw new Error(data.error ?? "Could not update this account.");
      }

      onChange(data.accounts);
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Could not update this account."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="dashboard-card p-6">
      <CardHeader
        icon={Landmark}
        title="Withdrawal Accounts"
        subtitle="Add multiple bank accounts for shop payouts"
        action={
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => setShowForm((current) => !current)}
            disabled={busy}
          >
            {showForm ? <X size={14} /> : <Plus size={14} />}
            {showForm ? "Cancel" : "Add Account"}
          </Button>
        }
      />

      <div className="mt-4 space-y-3">
        {accounts.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line bg-lilac/40 p-4 text-xs text-muted">
            No withdrawal account added yet. Add at least one account to
            receive payouts.
          </p>
        ) : null}

        {accounts.map((account) => (
          <div
            key={account.id}
            className={cn(
              "rounded-xl border p-4",
              account.isPrimary
                ? "border-brand/30 bg-brand/5"
                : "border-line bg-lilac/40"
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-heading text-sm font-semibold text-navy">
                    {account.bankName}
                  </p>
                  {account.isPrimary ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-mint px-2 py-0.5 text-[10px] font-bold text-mint-ink">
                      <Star size={10} fill="currentColor" />
                      Primary
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-xs text-muted">
                  {account.accountHolder} · {maskAccount(account.accountNumber)}{" "}
                  · {account.ifsc}
                  {account.branch ? ` · ${account.branch}` : ""}
                </p>
              </div>

              <div className="flex items-center gap-1">
                {!account.isPrimary ? (
                  <button
                    type="button"
                    onClick={() => makePrimary(account.id)}
                    disabled={busy}
                    className="rounded-lg px-2 py-1 text-[11px] font-semibold text-brand-strong hover:bg-lilac disabled:opacity-50"
                  >
                    Set primary
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(account.id);
                    setForm({
                      accountHolder: account.accountHolder,
                      accountNumber: account.accountNumber,
                      ifsc: account.ifsc,
                      bankName: account.bankName,
                      branch: account.branch,
                      isPrimary: account.isPrimary,
                    });
                    setShowForm(true);
                    setError("");
                  }}
                  disabled={busy}
                  className="rounded-lg px-2 py-1 text-[11px] font-semibold text-navy hover:bg-lilac disabled:opacity-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => removeAccount(account.id)}
                  disabled={busy}
                  aria-label={`Delete ${account.bankName} account`}
                  className="rounded-lg p-1.5 text-danger hover:bg-danger-soft disabled:opacity-50"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm ? (
        <form onSubmit={saveAccount} className="mt-4 rounded-xl bg-lilac/60 p-4">
          <p className="font-heading text-sm font-semibold text-navy">
            {editingId ? "Edit withdrawal account" : "New withdrawal account"}
          </p>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <AccountInput
              label="Account holder"
              value={form.accountHolder}
              onChange={(value) => updateField("accountHolder", value)}
              required
            />
            <AccountInput
              label="Bank name"
              value={form.bankName}
              onChange={(value) => updateField("bankName", value)}
              required
            />
            <AccountInput
              label="Account number"
              value={form.accountNumber}
              onChange={(value) =>
                updateField("accountNumber", value.replace(/\D/g, ""))
              }
              inputMode="numeric"
              required
            />
            <AccountInput
              label="IFSC code"
              value={form.ifsc}
              onChange={(value) => updateField("ifsc", value.toUpperCase())}
              placeholder="CIUB0000473"
              required
            />
            <AccountInput
              label="Branch"
              value={form.branch}
              onChange={(value) => updateField("branch", value)}
              required
            />
            <label className="flex items-end gap-2 pb-2 text-xs font-semibold text-muted">
              <input
                type="checkbox"
                checked={form.isPrimary}
                onChange={(event) =>
                  updateField("isPrimary", event.target.checked)
                }
                className="h-4 w-4 accent-brand"
              />
              Use as primary payout account
            </label>
          </div>

          {error ? <p className="mt-3 text-xs text-danger">{error}</p> : null}

          <div className="mt-4 flex gap-2">
            <Button type="submit" size="sm" disabled={busy}>
              {busy ? <Loader2 size={14} className="animate-spin" /> : null}
              {editingId ? "Update account" : "Save account"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={resetForm}
              disabled={busy}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : null}

      {!showForm ? (
        <div className="mt-4 flex items-start gap-2">
          <ShieldCheck size={13} className="mt-0.5 shrink-0 text-brand-strong" />
          <p className="text-[11px] font-semibold leading-3.5 text-muted">
            Account details are stored securely against your shop and used only
            for settlements.
          </p>
        </div>
      ) : null}
    </section>
  );
}

interface AccountInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  inputMode?: "numeric";
}

function AccountInput({
  label,
  value,
  onChange,
  required,
  placeholder,
  inputMode,
}: AccountInputProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-heading text-xs font-semibold text-ink">
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        required={required}
        className="h-10 w-full rounded-lg bg-white px-3 text-sm text-ink shadow-sm outline-none focus:ring-2 focus:ring-brand/20"
      />
    </label>
  );
}
