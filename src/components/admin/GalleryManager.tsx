"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import ImageUploader from "@/components/admin/ImageUploader";

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  title_te: string | null;
  category: "weddings" | "engagements" | "birthdays" | "corporate" | "other";
  sort_order: number;
  active: boolean;
  created_at: string;
}

const CATEGORIES = ["weddings", "engagements", "birthdays", "corporate", "other"] as const;

const CAT_COLORS: Record<string, string> = {
  weddings:    "bg-pink-50 text-pink-800 border-pink-200",
  engagements: "bg-purple-50 text-purple-800 border-purple-200",
  birthdays:   "bg-yellow-50 text-yellow-800 border-yellow-200",
  corporate:   "bg-blue-50 text-blue-800 border-blue-200",
  other:       "bg-gray-50 text-gray-700 border-gray-200",
};

const EMPTY_FORM = {
  src: "",
  title: "",
  title_te: "",
  category: "weddings" as GalleryItem["category"],
  sort_order: 0,
  active: true,
};

export default function GalleryManager() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isTE = locale === "te";

  const [items, setItems]   = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("all");
  const [search, setSearch]   = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm]       = useState({ ...EMPTY_FORM });
  const [saving, setSaving]   = useState(false);
  const [msg, setMsg]         = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("gallery_items")
      .select("*")
      .order("sort_order", { ascending: true });
    setItems(data ?? []);
    setLoading(false);
  };

  const openAdd = () => {
    setForm({ ...EMPTY_FORM });
    setEditing(null);
    setShowAdd(true);
  };

  const openEdit = (item: GalleryItem) => {
    setForm({
      src:        item.src,
      title:      item.title,
      title_te:   item.title_te ?? "",
      category:   item.category,
      sort_order: item.sort_order,
      active:     item.active,
    });
    setEditing(item);
    setShowAdd(true);
  };

  const saveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      src:        form.src.trim(),
      title:      form.title.trim(),
      title_te:   form.title_te?.trim() || null,
      category:   form.category,
      sort_order: Number(form.sort_order),
      active:     form.active,
    };

    let error;
    if (editing) {
      ({ error } = await supabase.from("gallery_items").update(payload).eq("id", editing.id));
    } else {
      ({ error } = await supabase.from("gallery_items").insert([payload]));
    }

    if (error) {
      setMsg("Error: " + error.message);
    } else {
      setMsg(editing
        ? (isTE ? "అప్‌డేట్ చేయబడింది!" : "Image updated!")
        : (isTE ? "చిత్రం జోడించబడింది!" : "Image added!"));
      setShowAdd(false);
      fetchItems();
    }
    setSaving(false);
    setTimeout(() => setMsg(""), 3000);
  };

  const toggleActive = async (item: GalleryItem) => {
    await supabase.from("gallery_items").update({ active: !item.active }).eq("id", item.id);
    fetchItems();
  };

  const deleteItem = async (id: string) => {
    if (!confirm(isTE ? "ఈ చిత్రాన్ని తొలగించాలా?" : "Delete this image?")) return;
    setDeleting(id);
    await supabase.from("gallery_items").delete().eq("id", id);
    setDeleting(null);
    fetchItems();
  };

  const filtered = items.filter((it) => {
    const matchFilter = filter === "all" || it.category === filter;
    const matchSearch = !search || [it.title, it.title_te, it.category]
      .some((v) => v?.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Live connection banner */}
      <div className="mb-5 flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
        style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)" }}>
        <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-green-600 flex-shrink-0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="10" r="8"/><path d="M10 2c-2.5 3-2.5 13 0 16M10 2c2.5 3 2.5 13 0 16M2 10h16"/>
        </svg>
        <span className="text-green-700 font-medium">
          {isTE
            ? "గ్యాలరీ చిత్రాలు నేరుగా వెబ్‌సైట్ గ్యాలరీ పేజీలో చూపబడతాయి — మార్పులు తక్షణమే లైవ్ అవుతాయి."
            : "Images added here appear live on the public"}&nbsp;
          {!isTE && <a href="/en/gallery" target="_blank" rel="noreferrer" className="underline underline-offset-2 font-semibold">Gallery page</a>}
          {!isTE && " — changes go live instantly."}
        </span>
      </div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-serif font-bold text-2xl text-[#6B0F1A]">
            {isTE ? "గ్యాలరీ" : "Gallery"}
          </h1>
          <p className="text-gray-500 text-sm">{items.length} {isTE ? "చిత్రాలు" : "images"}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchItems}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-[#6B0F1A] border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-colors">
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 inline mr-1" stroke="currentColor" strokeWidth="1.7"><path d="M13.5 2.5A7 7 0 112.5 10"/><path d="M2 6.5V10h3.5"/></svg>{isTE ? "రిఫ్రెష్" : "Refresh"}
          </button>
          <button onClick={openAdd}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}>
            + {isTE ? "చిత్రం జోడించండి" : "Add Image"}
          </button>
        </div>
      </div>

      {msg && (
        <div className="mb-4 p-3 rounded-lg text-sm text-green-800 bg-green-50 border border-green-200">{msg}</div>
      )}

      {/* Filters */}
      <div className="flex gap-2 mb-5 flex-wrap">
        <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder={isTE ? "వెతకండి..." : "Search gallery..."}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] w-52" />
        {["all", ...CATEGORIES].map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${filter === cat ? "text-white" : "text-gray-600 bg-white border border-gray-200 hover:bg-gray-50"}`}
            style={filter === cat ? { background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" } : {}}>
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">
          <div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin mx-auto mb-3" />
          {isTE ? "లోడవుతోంది..." : "Loading..."}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <div className="mb-3 flex justify-center"><svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-gray-300" stroke="currentColor" strokeWidth="1.3"><rect x="2" y="5" width="20" height="16" rx="2"/><path d="M2 15l5-5 4 4 4-4 5 5"/><circle cx="16.5" cy="10" r="1.5"/></svg></div>
          {isTE ? "చిత్రాలు కనుగొనబడలేదు" : "No images found"}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((item) => (
            <div key={item.id}
              className="group relative rounded-xl overflow-hidden bg-white"
              style={{ border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 2px 8px rgba(107,15,26,0.04)" }}>
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x300?text=No+Image"; }}
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button onClick={() => openEdit(item)}
                  className="p-2 bg-white rounded-full shadow text-[#6B0F1A] hover:bg-[#C9A84C] hover:text-white transition-colors">
                  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.6"><path d="M11.5 2.5l2 2-9 9H2.5v-2l9-9z"/></svg>
                </button>
                <button onClick={() => deleteItem(item.id)} disabled={deleting === item.id}
                  className="p-2 bg-white rounded-full shadow text-red-600 hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50">
                  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.6"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10"/></svg>
                </button>
              </div>
              {/* Active toggle badge */}
              <button
                onClick={() => toggleActive(item)}
                className={`absolute top-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${item.active ? "bg-green-100 text-green-700 border-green-300" : "bg-gray-100 text-gray-500 border-gray-300"}`}
                title={item.active ? "Active – click to hide" : "Hidden – click to show"}>
                {item.active ? "ON" : "OFF"}
              </button>
              {/* Info */}
              <div className="p-2.5">
                <p className="text-xs font-semibold text-[#6B0F1A] truncate">{item.title}</p>
                <span className={`mt-1 inline-block text-[10px] px-1.5 py-0.5 rounded-full border font-semibold capitalize ${CAT_COLORS[item.category]}`}>
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif font-bold text-lg text-[#6B0F1A]">
                {editing ? (isTE ? "చిత్రం సవరించండి" : "Edit Image") : (isTE ? "కొత్త చిత్రం" : "Add New Image")}
              </h3>
              <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-gray-600"><svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>
            </div>

            <form onSubmit={saveItem} className="space-y-4">
              {/* Drag & Drop Uploader */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Image <span className="text-red-400">*</span>
                </label>
                <ImageUploader
                  value={form.src}
                  folder="gallery"
                  onUploaded={(url) => setForm((f) => ({ ...f, src: url }))}
                />
                {!form.src && saving && (
                  <p className="text-xs text-red-500 mt-1">Please upload an image first.</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Title (English) <span className="text-red-400">*</span>
                </label>
                <input type="text" required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Title (Telugu)
                </label>
                <input type="text" value={form.title_te ?? ""} onChange={(e) => setForm((f) => ({ ...f, title_te: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as GalleryItem["category"] }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] bg-white capitalize">
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="capitalize">{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Sort Order</label>
                  <input type="number" min={0} value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: +e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
                </div>
                <div className="flex items-end gap-2 pb-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
                      className="w-4 h-4 accent-[#6B0F1A]" />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>
              </div>
              <button type="submit" disabled={saving || !form.src}
                className="w-full py-3 rounded-xl font-bold text-white text-sm disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}>
                {saving ? "Saving..." : (editing ? (isTE ? "అప్‌డేట్ చేయండి" : "Update Image") : (isTE ? "చిత్రం జోడించండి" : "Add Image"))}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
