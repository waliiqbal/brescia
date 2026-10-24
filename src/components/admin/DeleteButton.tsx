"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { sendJson } from "@/lib/client-api";

type DeleteButtonProps = {
  /** API address of the item, e.g. /api/articles/123. */
  endpoint: string;
  itemName: string;
  message?: string;
  label?: string;
  /** Go here after deleting (otherwise the page just refreshes). */
  redirectTo?: string;
  className?: string;
};

export function DeleteButton({
  endpoint,
  itemName,
  message = "This cannot be undone.",
  label = "Delete",
  redirectTo,
  className,
}: DeleteButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function confirm() {
    setLoading(true);
    setError("");
    const result = await sendJson(endpoint, {}, "DELETE");
    setLoading(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }
    setOpen(false);
    if (redirectTo) router.push(redirectTo);
    router.refresh();
  }

  return (
    <>
      <Button
        type="button"
        variant="danger"
        onClick={() => setOpen(true)}
        className={className ?? "px-4 py-2"}
      >
        {label}
      </Button>
      <ConfirmDialog
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={confirm}
        loading={loading}
        title={`Delete ${itemName}?`}
        message={error || message}
        confirmLabel="Delete"
      />
    </>
  );
}
