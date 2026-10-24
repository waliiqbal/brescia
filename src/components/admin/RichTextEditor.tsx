"use client";

import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import { useRef, useState } from "react";
import { ACCEPTED_TYPES, uploadImageFile } from "@/lib/image-client";
import { cn } from "@/lib/utils";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

function ToolButton({
  label,
  title,
  active,
  disabled,
  onClick,
}: {
  label: string;
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      // Keep the text selection while a toolbar button is pressed.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        "min-w-9 rounded-md px-2.5 py-1.5 text-xs font-bold transition-colors disabled:opacity-40",
        active
          ? "bg-green-dark text-cream"
          : "text-ink/75 hover:bg-green-dark/10",
      )}
    >
      {label}
    </button>
  );
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write the story here...",
}: RichTextEditorProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [imageBusy, setImageBusy] = useState(false);
  const [error, setError] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true },
      }),
      Image,
    ],
    content: value,
    // Needed so the editor does not render on the server.
    immediatelyRender: false,
    editorProps: {
      attributes: {
        "aria-label": "Story text",
        "data-placeholder": placeholder,
      },
    },
    onUpdate: ({ editor: e }) => onChange(e.isEmpty ? "" : e.getHTML()),
  });

  if (!editor) {
    return <div className="min-h-[22rem] rounded-lg border border-green-dark/25 bg-white" />;
  }

  function applyLink(ed: Editor) {
    const url = linkUrl.trim();
    if (!url) {
      ed.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      const href = /^(https?:\/\/|mailto:|\/)/i.test(url) ? url : `https://${url}`;
      ed.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }
    setLinkOpen(false);
  }

  async function addImage(file: File | undefined, ed: Editor) {
    if (!file) return;
    setError("");
    setImageBusy(true);
    const result = await uploadImageFile(file, "news");
    setImageBusy(false);
    if (fileRef.current) fileRef.current.value = "";

    if (!result.ok) {
      setError(result.message);
      return;
    }
    ed.chain().focus().setImage({ src: result.image.url, alt: "" }).run();
  }

  return (
    <div className="rich-editor overflow-hidden rounded-lg border border-green-dark/25 bg-white focus-within:border-green-card focus-within:outline-2 focus-within:outline-green-card/30">
      <div
        role="toolbar"
        aria-label="Text formatting"
        className="flex flex-wrap items-center gap-1 border-b border-green-dark/15 bg-paper px-2 py-1.5"
      >
        <ToolButton label="B" title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} />
        <ToolButton label="I" title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} />
        <ToolButton label="U" title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} />
        <span aria-hidden="true" className="mx-1 h-5 w-px bg-green-dark/20" />
        <ToolButton label="H2" title="Big heading" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
        <ToolButton label="H3" title="Small heading" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} />
        <span aria-hidden="true" className="mx-1 h-5 w-px bg-green-dark/20" />
        <ToolButton label="• List" title="Bulleted list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} />
        <ToolButton label="1. List" title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
        <ToolButton label="“ ”" title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
        <span aria-hidden="true" className="mx-1 h-5 w-px bg-green-dark/20" />
        <ToolButton
          label="Link"
          title="Add or edit a link"
          active={editor.isActive("link")}
          onClick={() => {
            setLinkUrl(editor.getAttributes("link").href ?? "");
            setLinkOpen((open) => !open);
          }}
        />
        <ToolButton label={imageBusy ? "Uploading..." : "Image"} title="Insert an image" disabled={imageBusy} onClick={() => fileRef.current?.click()} />
        <span aria-hidden="true" className="mx-1 h-5 w-px bg-green-dark/20" />
        <ToolButton label="Undo" title="Undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()} />
        <ToolButton label="Redo" title="Redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()} />
        <input
          ref={fileRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => addImage(e.target.files?.[0], editor)}
        />
      </div>

      {linkOpen && (
        <div className="flex flex-wrap items-center gap-2 border-b border-green-dark/15 bg-white px-3 py-2">
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                applyLink(editor);
              }
            }}
            placeholder="https://example.com (empty removes the link)"
            aria-label="Link address"
            className="min-w-0 flex-1 rounded-md border border-green-dark/25 px-3 py-1.5 text-sm"
            autoFocus
          />
          <button
            type="button"
            onClick={() => applyLink(editor)}
            className="rounded-md bg-green-dark px-3 py-1.5 text-xs font-bold uppercase text-cream"
          >
            Apply
          </button>
        </div>
      )}

      {error && (
        <p role="alert" className="border-b border-green-dark/15 px-3 py-2 text-sm text-flag-red">
          {error}
        </p>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}
