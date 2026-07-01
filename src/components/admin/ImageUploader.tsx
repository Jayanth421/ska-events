"use client";

/**
 * ImageUploader
 * ─────────────
 * Drag-and-drop (or click-to-browse) image uploader that:
 *  1. Accepts image files via drag-and-drop or file picker
 *  2. Shows a local preview instantly
 *  3. Uploads to Supabase Storage bucket "gallery"
 *  4. Calls onUploaded(publicUrl) so the parent can store the URL
 *
 * Props:
 *   value       – current image URL (used to show existing image when editing)
 *   onUploaded  – callback with the final public URL after upload
 *   folder      – storage sub-folder, e.g. "gallery" | "packages"  (default: "gallery")
 */

import { useCallback, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface Props {
  value?: string;
  onUploaded: (url: string) => void;
  folder?: string;
}

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_MB   = 5;

export default function ImageUploader({ value, onUploaded, folder = "gallery" }: Props) {
  const inputRef                = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [preview,  setPreview]  = useState<string>(value ?? "");
  const [progress, setProgress] = useState<number | null>(null); // null = idle
  const [error,    setError]    = useState("");

  /* ── helpers ── */
  const resetError = () => setError("");

  const validate = (file: File): string => {
    if (!ACCEPTED.includes(file.type)) return "Only JPG, PNG, WebP, GIF or AVIF images are allowed.";
    if (file.size > MAX_MB * 1024 * 1024) return `File too large. Max size is ${MAX_MB} MB.`;
    return "";
  };

  const uploadFile = useCallback(async (file: File) => {
    const err = validate(file);
    if (err) { setError(err); return; }

    resetError();
    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setProgress(0);

    // Build unique filename: folder/timestamp-randomhex.ext
    const ext      = file.name.split(".").pop() ?? "jpg";
    const filename = `${folder}/${Date.now()}-${Math.random().toString(16).slice(2)}.${ext}`;

    // Simulate progress since supabase-js doesn't expose XHR progress
    const ticker = setInterval(() => {
      setProgress((p) => (p !== null && p < 85 ? p + 15 : p));
    }, 200);

    const { error: upErr } = await supabase.storage
      .from("gallery")           // bucket name — always "gallery"
      .upload(filename, file, { cacheControl: "3600", upsert: false });

    clearInterval(ticker);

    if (upErr) {
      setProgress(null);
      setPreview(value ?? "");
      setError("Upload failed: " + upErr.message);
      return;
    }

    // Get public URL
    const { data } = supabase.storage.from("gallery").getPublicUrl(filename);
    const publicUrl = data.publicUrl;

    setProgress(100);
    setTimeout(() => setProgress(null), 800);

    setPreview(publicUrl);
    onUploaded(publicUrl);
    // Revoke local blob to free memory
    URL.revokeObjectURL(localUrl);
  }, [folder, value, onUploaded]);

  /* ── drag handlers ── */
  const onDragOver  = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const onDrop      = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    // reset input so same file can be re-selected
    e.target.value = "";
  };

  const removeImage = () => {
    setPreview("");
    onUploaded("");
    resetError();
  };

  /* ── render ── */
  return (
    <div className="w-full">
      {/* Drop zone / preview */}
      {preview ? (
        /* ── Existing / uploaded image preview ── */
        <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-video group">
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=Invalid"; }}
          />
          {/* Progress bar overlay */}
          {progress !== null && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
              <div className="w-3/4 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C9A84C] rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-white text-xs font-semibold">
                {progress < 100 ? `Uploading… ${progress}%` : "Done!"}
              </p>
            </div>
          )}
          {/* Replace / remove buttons */}
          {progress === null && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="px-3 py-1.5 bg-white rounded-lg text-xs font-bold text-[#6B0F1A] hover:bg-[#C9A84C] hover:text-white transition-colors shadow"
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 inline mr-1" stroke="currentColor" strokeWidth="1.6"><path d="M13 3l-4 4M3 13l4-4M3 7V3h4M13 9v4H9"/></svg>Replace
              </button>
              <button
                type="button"
                onClick={removeImage}
                className="px-3 py-1.5 bg-white rounded-lg text-xs font-bold text-red-600 hover:bg-red-600 hover:text-white transition-colors shadow"
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 inline mr-1" stroke="currentColor" strokeWidth="1.6"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10"/></svg>Remove
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ── Empty drop zone ── */
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className="relative rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 flex flex-col items-center justify-center py-10 px-4 select-none"
          style={{
            borderColor: dragging ? "#C9A84C" : "#e5e7eb",
            background:  dragging ? "rgba(201,168,76,0.06)" : "#fafafa",
          }}
        >
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-transform duration-200"
            style={{
              background: dragging ? "rgba(201,168,76,0.15)" : "rgba(107,15,26,0.06)",
              transform:  dragging ? "scale(1.1)" : "scale(1)",
            }}
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
              <path
                d="M12 16V8m0 0-3 3m3-3 3 3"
                stroke={dragging ? "#C9A84C" : "#6B0F1A"}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 16.5V18a2 2 0 002 2h14a2 2 0 002-2v-1.5"
                stroke={dragging ? "#C9A84C" : "#6B0F1A"}
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p className="text-sm font-semibold text-[#6B0F1A] text-center">
            {dragging ? "Drop to upload" : "Drag & drop your image here"}
          </p>
          <p className="text-xs text-gray-400 mt-1 text-center">
            or <span className="text-[#C9A84C] font-semibold underline underline-offset-2">click to browse</span>
          </p>
          <p className="text-[10px] text-gray-300 mt-3">
            JPG · PNG · WebP · GIF · AVIF — max {MAX_MB} MB
          </p>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="hidden"
        onChange={onFileChange}
      />

      {/* Error */}
      {error && (
        <p className="mt-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 inline mr-1" stroke="currentColor" strokeWidth="1.6"><path d="M8 3L14 13H2L8 3z"/><path d="M8 7v3M8 11.5v.5"/></svg>{error}
        </p>
      )}
    </div>
  );
}
