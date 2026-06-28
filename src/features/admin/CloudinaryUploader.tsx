"use client";

import { useRef, useState } from "react";

export interface UploadResult {
  url: string;
  publicId: string;
}

interface Props {
  onUpload: (result: UploadResult) => void;
  currentUrl?: string;
  label?: string;
}

export function CloudinaryUploader({ onUpload, currentUrl, label = "Upload Image" }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const sigRes = await fetch("/api/admin/upload", { method: "POST" });
      if (!sigRes.ok) throw new Error("Failed to get upload signature");
      const { signature, timestamp, folder, cloudName, apiKey } =
        (await sigRes.json()) as {
          signature: string;
          timestamp: number;
          folder: string;
          cloudName: string;
          apiKey: string;
        };

      const fd = new FormData();
      fd.append("file", file);
      fd.append("api_key", apiKey);
      fd.append("timestamp", String(timestamp));
      fd.append("signature", signature);
      fd.append("folder", folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: fd }
      );
      const data = (await uploadRes.json()) as {
        secure_url?: string;
        public_id?: string;
        error?: { message: string };
      };

      if (data.error) {
        setError(data.error.message);
        return;
      }

      const url = data.secure_url!;
      const publicId = data.public_id!;
      setPreview(url);
      onUpload({ url, publicId });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      {preview && (
        <div className="relative w-32 h-32 rounded overflow-hidden border border-gray-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="preview" className="w-full h-full object-cover" />
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 border border-dashed border-gray-300 rounded px-4 py-2 text-sm text-[var(--color-warm-gray)] hover:border-[var(--color-gold)] hover:text-[var(--color-charcoal)] transition-colors disabled:opacity-50"
      >
        {uploading ? (
          <>
            <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Uploading…
          </>
        ) : (
          <>
            <span className="text-lg leading-none">↑</span>
            {label}
          </>
        )}
      </button>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
