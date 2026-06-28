"use client";

import { useEffect, useState } from "react";
import { CloudinaryUploader } from "./CloudinaryUploader";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  sortOrder: number;
}

interface FormState {
  name: string;
  slug: string;
  description: string;
  image: string;
  sortOrder: number;
}

const defaultForm: FormState = {
  name: "",
  slug: "",
  description: "",
  image: "",
  sortOrder: 0,
};

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function CategoriesManager() {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  async function fetchItems() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  function openCreate() {
    setEditItem(null);
    setForm(defaultForm);
    setShowModal(true);
  }

  function openEdit(item: Category) {
    setEditItem(item);
    setForm({
      name: item.name,
      slug: item.slug,
      description: item.description,
      image: item.image,
      sortOrder: item.sortOrder,
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
    try {
      if (editItem) {
        await fetch(`/api/admin/categories/${editItem._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      closeModal();
      await fetchItems();
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(item: Category) {
    if (!window.confirm(`Delete "${item.name}"? This cannot be undone.`)) return;
    setDeleting(item._id);
    try {
      await fetch(`/api/admin/categories/${item._id}`, { method: "DELETE" });
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
          Categories
        </h1>
        <button
          onClick={openCreate}
          className="bg-[var(--color-charcoal)] text-white px-4 py-2 rounded text-sm hover:bg-black transition-colors"
        >
          Add New Category
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
                  Slug
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--color-warm-gray)] uppercase tracking-wide">
                  Sort Order
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
                    colSpan={4}
                    className="px-4 py-8 text-center text-sm text-[var(--color-warm-gray)]"
                  >
                    No categories found.
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
                    <td className="px-4 py-3 text-sm text-[var(--color-warm-gray)] font-mono">
                      {item.slug}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-warm-gray)]">
                      {item.sortOrder}
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
                {editItem ? "Edit Category" : "Add New Category"}
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
                <label className={labelCls}>Description</label>
                <textarea
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
                <label className={labelCls}>Image</label>
                <CloudinaryUploader
                  currentUrl={form.image || undefined}
                  label={form.image ? "Replace Image" : "Upload Image"}
                  onUpload={({ url }) =>
                    setForm((prev) => ({ ...prev, image: url }))
                  }
                />
              </div>
              <div>
                <label className={labelCls}>Sort Order</label>
                <input
                  type="number"
                  className={inputCls}
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      sortOrder: Number(e.target.value),
                    }))
                  }
                />
              </div>
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
                    : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
