"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { sendJson } from "@/lib/client-api";
import type { Album } from "@/modules/gallery/gallery.types";
import { Field, Input, Notice, Panel } from "./ui";

export function AlbumCreateForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string[]>>({});

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setFields({});
    setSaving(true);
    const result = await sendJson<{ album: Album }>("/api/gallery", { title });
    setSaving(false);

    if (!result.ok) {
      setFields(result.fields ?? {});
      setError(result.message);
      return;
    }
    router.push(`/admin/gallery/${result.data.album.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={submit} noValidate className="max-w-xl">
      {error && <Notice tone="error">{error}</Notice>}
      <Panel className="space-y-5">
        <Field
          label="Album name"
          htmlFor="title"
          error={fields.title?.[0]}
          hint="For example “Match Day vs Milano” or “Training”. You add the photos next."
        >
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
            required
            autoFocus
          />
        </Field>
        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" variant="dark" disabled={saving}>
            {saving ? "Creating..." : "Create album"}
          </Button>
          <Link href="/admin/gallery" className="text-sm font-semibold text-green-card hover:underline">
            Cancel
          </Link>
        </div>
      </Panel>
    </form>
  );
}
