"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { CloudinaryUploader } from "./CloudinaryUploader";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  category: string | Category;
  description: string;
  status: "active" | "inactive" | "discontinued";
  isFeatured: boolean;
  gallery: GalleryItem[];
}

interface GalleryItem {
  url: string;
  alt: string;
  publicId: string;
}

interface FormState {
  name: string;
  slug: string;
  sku: string;
  category: string;
  description: string;
  status: "active" | "inactive" | "discontinued";
  isFeatured: boolean;
  gallery: GalleryItem[];
}

const defaultForm: FormState = {
  name: "",
  slug: "",
  sku: "",
  category: "",
  description: "",
  status: "active",
  isFeatured: false,
  gallery: [],
};

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function ProductsManager() {
  const [items, setItems] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchItems() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((d) => setCategories(Array.isArray(d) ? d : []));
  }, []);

  function openCreate() {
    setEditItem(null);
    setForm(defaultForm);
    setShowModal(true);
  }

  function openEdit(item: Product) {
    setEditItem(item);
    const catId = typeof item.category === "object" ? item.category._id : item.category;
    setForm({
      name: item.name,
      slug: item.slug,
      sku: item.sku,
      category: catId,
      description: item.description,
      status: item.status,
      isFeatured: item.isFeatured,
      gallery: (item.gallery ?? []) as GalleryItem[],
    });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditItem(null);
    setForm(defaultForm);
  }

  function handleNameChange(name: string) {
    setForm((prev) => ({
      ...prev,
      name,
      slug: editItem ? prev.slug : toSlug(name),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const url = editItem ? `/api/admin/products/${editItem._id}` : "/api/admin/products";
      const res = await fetch(url, {
        method: editItem ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong");
        return;
      }
      closeModal();
      await fetchItems();
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(item: Product) {
    if (!window.confirm(`Delete "${item.name}"? This cannot be undone.`)) return;
    setDeleting(item._id);
    try {
      await fetch(`/api/admin/products/${item._id}`, { method: "DELETE" });
      await fetchItems();
    } finally {
      setDeleting(null);
    }
  }

  const inputCls =
    "w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-gold)]";
  const labelCls = "block text-sm font-medium text-[var(--color-charcoal)] mb-1";

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-2xl font-bold text-[var(--color-charcoal)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Products
        </h1>
        <button
          onClick={openCreate}
          className="bg-[var(--color-charcoal)] text-white px-4 py-2 rounded text-sm hover:bg-black transition-colors"
        >
          Add New Product
        </button>
      </div>

      <div
        className="bg-white rounded-[var(--radius-card)] overflow-hidden"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        {loading ? (
          <div className="p-8 text-center text-[var(--color-warm-gray)] text-sm">
            Loading...
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--color-off-white)] border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--color-warm-gray)] uppercase tracking-wide">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--color-warm-gray)] uppercase tracking-wide">
                  SKU
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--color-warm-gray)] uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--color-warm-gray)] uppercase tracking-wide">
                  Featured
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--color-warm-gray)] uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-sm text-[var(--color-warm-gray)]"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-50 hover:bg-[var(--color-off-white)] transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-[var(--color-charcoal)] font-medium">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-warm-gray)]">
                      {item.sku}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          item.status === "active"
                            ? "bg-green-100 text-green-700"
                            : item.status === "inactive"
                            ? "bg-gray-100 text-gray-600"
                            : "bg-red-100 text-red-600"
                        )}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-warm-gray)]">
                      {item.isFeatured ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="border border-gray-200 px-3 py-1 rounded text-xs text-[var(--color-charcoal)] hover:border-[var(--color-gold)] transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        disabled={deleting === item._id}
                        className="px-3 py-1 rounded text-xs text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                      >
                        {deleting === item._id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white rounded-[var(--radius-card)] w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--color-charcoal)]">
                {editItem ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={closeModal}
                className="text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)] text-xl leading-none"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className={labelCls}>Name *</label>
                <input
                  type="text"
                  required
                  className={inputCls}
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Slug *</label>
                <input
                  type="text"
                  required
                  className={inputCls}
                  value={form.slug}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, slug: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className={labelCls}>SKU *</label>
                <input
                  type="text"
                  required
                  className={inputCls}
                  value={form.sku}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, sku: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className={labelCls}>Category</label>
                <select
                  className={inputCls}
                  value={form.category}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, category: e.target.value }))
                  }
                >
                  <option value="">— Select category —</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
                {categories.length === 0 && (
                  <p className="text-xs text-amber-600 mt-1">No categories yet — create one first.</p>
                )}
              </div>
              <div>
                <label className={labelCls}>Description *</label>
                <textarea
                  required
                  rows={3}
                  className={inputCls}
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className={labelCls}>Status</label>
                <select
                  className={inputCls}
                  value={form.status}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      status: e.target.value as FormState["status"],
                    }))
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="discontinued">Discontinued</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={form.isFeatured}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      isFeatured: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300"
                />
                <label
                  htmlFor="isFeatured"
                  className="text-sm text-[var(--color-charcoal)]"
                >
                  Featured
                </label>
              </div>
              <div>
                <label className={labelCls}>Gallery Images</label>
                <div className="space-y-3">
                  {form.gallery.map((img, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 border border-gray-100 rounded">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt={img.alt} className="w-16 h-16 object-cover rounded flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          placeholder="Alt text"
                          className={inputCls}
                          value={img.alt}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              gallery: prev.gallery.map((g, j) =>
                                j === i ? { ...g, alt: e.target.value } : g
                              ),
                            }))
                          }
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            gallery: prev.gallery.filter((_, j) => j !== i),
                          }))
                        }
                        className="text-red-400 hover:text-red-600 text-xs mt-1 flex-shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <CloudinaryUploader
                    label="Add Image"
                    onUpload={({ url, publicId }) =>
                      setForm((prev) => ({
                        ...prev,
                        gallery: [...prev.gallery, { url, publicId, alt: "" }],
                      }))
                    }
                  />
                </div>
              </div>
              {error && (
                <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">{error}</p>
              )}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="border border-gray-200 px-4 py-2 rounded text-sm text-[var(--color-warm-gray)] hover:border-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[var(--color-charcoal)] text-white px-4 py-2 rounded text-sm hover:bg-black transition-colors disabled:opacity-50"
                >
                  {submitting
                    ? "Saving..."
                    : editItem
                    ? "Save Changes"
                    : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
