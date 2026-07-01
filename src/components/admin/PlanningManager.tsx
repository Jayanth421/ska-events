"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import ImageUploader from "@/components/admin/ImageUploader";

export interface PlanningPackage {
  id: string;
  key: string;
  title_en: string;
  title_te: string | null;
  description_en: string;
  description_te: string | null;
  price_en: string;
  price_te: string | null;
  badge_en: string | null;
  badge_te: string | null;
  image_url: string | null;
  features_en: string[];
  features_te: string[];
  active: boolean;
  sort_order: number;
  created_at: string;
}

const EMPTY_FORM = {
  key: "",
  title_en: "",
  title_te: "",
  description_en: "",
  description_te: "",
  price_en: "",
  price_te: "",
  badge_en: "",
  badge_te: "",
  image_url: "",
  features_en: "",   // newline-separated in the form
  features_te: "",
  active: true,
  sort_order: 0,
};

function listToLines(arr: string[]) { return arr.join("\n"); }
function linesToList(str: string): string[] {
  return str.split("\n").map((s) => s.trim()).filter(Boolean);
}

export default function PlanningManager() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isTE = locale === "te";

  const [packages, setPackages] = useState<PlanningPackage[]>([]);
  const [loading, setLoading]   = useState(true);
  const [showAdd, setShowAdd]   = useState(false);
  const [editing, setEditing]   = useState<PlanningPackage | null>(null);
  const [form, setForm]         = useState({ ...EMPTY_FORM });
  const [saving, setSaving]     = useState(false);
  const [msg, setMsg]           = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [tab, setTab]           = useState<"en" | "te">("en");

  useEffect(() => { fetchPackages(); }, []);

  const fetchPackages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("planning_packages")
      .select("*")
      .order("sort_order", { ascending: true });
    setPackages(data ?? []);
    setLoading(false);
  };

  const openAdd = () => {
    setForm({ ...EMPTY_FORM });
    setEditing(null);
    setTab("en");
    setShowAdd(true);
  };

  const openEdit = (pkg: PlanningPackage) => {
    setForm({
      key:            pkg.key,
      title_en:       pkg.title_en,
      title_te:       pkg.title_te ?? "",
      description_en: pkg.description_en,
      description_te: pkg.description_te ?? "",
      price_en:       pkg.price_en,
      price_te:       pkg.price_te ?? "",
      badge_en:       pkg.badge_en ?? "",
      badge_te:       pkg.badge_te ?? "",
      image_url:      pkg.image_url ?? "",
      features_en:    listToLines(pkg.features_en ?? []),
      features_te:    listToLines(pkg.features_te ?? []),
      active:         pkg.active,
      sort_order:     pkg.sort_order,
    });
    setEditing(pkg);
    setTab("en");
    setShowAdd(true);
  };

  const savePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      key:            form.key.trim(),
      title_en:       form.title_en.trim(),
      title_te:       form.title_te?.trim() || null,
      description_en: form.description_en.trim(),
      description_te: form.description_te?.trim() || null,
      price_en:       form.price_en.trim(),
      price_te:       form.price_te?.trim() || null,
      badge_en:       form.badge_en?.trim() || null,
      badge_te:       form.badge_te?.trim() || null,
      image_url:      form.image_url?.trim() || null,
      features_en:    linesToList(form.features_en),
      features_te:    linesToList(form.features_te),
      active:         form.active,
      sort_order:     Number(form.sort_order),
    };

    let error;
    if (editing) {
      ({ error } = await supabase.from("planning_packages").update(payload).eq("id", editing.id));
    } else {
      ({ error } = await supabase.from("planning_packages").insert([payload]));
    }

    if (error) {
      setMsg("Error: " + error.message);
    } else {
      setMsg(editing
        ? (isTE ? "అప్‌డేట్ చేయబడింది!" : "Package updated!")
        : (isTE ? "ప్యాకేజీ జోడించబడింది!" : "Package added!"));
      setShowAdd(false);
      fetchPackages();
    }
    setSaving(false);
    setTimeout(() => setMsg(""), 3000);
  };

  const toggleActive = async (pkg: PlanningPackage) => {
    await supabase.from("planning_packages").update({ active: !pkg.active }).eq("id", pkg.id);
    fetchPackages();
  };

  const deletePackage = async (id: string) => {
    if (!confirm(isTE ? "ఈ ప్యాకేజీని తొలగించాలా?" : "Delete this package?")) return;
    setDeleting(id);
    await supabase.from("planning_packages").delete().eq("id", id);
    setDeleting(null);
    fetchPackages();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Live connection banner */}
      <div className="mb-5 flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
        style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.2)" }}>
        <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-blue-600 flex-shrink-0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="16" height="16" rx="2"/><path d="M7 3v16M13 3v16M2 8h16M2 13h16"/>
        </svg>
        <span className="text-blue-700 font-medium">
          {isTE
            ? "ఈ ప్యాకేజీలు వెబ్‌సైట్ ప్యాకేజీల పేజీలో చూపబడతాయి — మార్పులు తక్షణమే లైవ్ అవుతాయి."
            : "Packages managed here appear live on the public"}&nbsp;
          {!isTE && <a href="/en/packages" target="_blank" rel="noreferrer" className="underline underline-offset-2 font-semibold">Packages page</a>}
          {!isTE && " — changes go live instantly."}
        </span>
      </div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-serif font-bold text-2xl text-[#6B0F1A]">
            {isTE ? "ప్లానింగ్ & ప్యాకేజీలు" : "Planning & Packages"}
          </h1>
          <p className="text-gray-500 text-sm">{packages.length} {isTE ? "ప్యాకేజీలు" : "packages"}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchPackages}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-[#6B0F1A] border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-colors">
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 inline mr-1" stroke="currentColor" strokeWidth="1.7"><path d="M13.5 2.5A7 7 0 112.5 10"/><path d="M2 6.5V10h3.5"/></svg>{isTE ? "రిఫ్రెష్" : "Refresh"}
          </button>
          <button onClick={openAdd}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}>
            + {isTE ? "ప్యాకేజీ జోడించండి" : "Add Package"}
          </button>
        </div>
      </div>

      {msg && (
        <div className="mb-4 p-3 rounded-lg text-sm text-green-800 bg-green-50 border border-green-200">{msg}</div>
      )}

      {/* Package Cards */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">
          <div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin mx-auto mb-3" />
          {isTE ? "లోడవుతోంది..." : "Loading..."}
        </div>
      ) : packages.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <div className="mb-3 flex justify-center"><svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-gray-300" stroke="currentColor" strokeWidth="1.3"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg></div>
          <p className="mb-4">{isTE ? "ప్యాకేజీలు కనుగొనబడలేదు" : "No packages found"}</p>
          <button onClick={openAdd}
            className="px-5 py-2.5 rounded-xl font-semibold text-white text-sm"
            style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}>
            + {isTE ? "మొదటి ప్యాకేజీ జోడించండి" : "Add First Package"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {packages.map((pkg) => (
            <div key={pkg.id}
              className="bg-white rounded-2xl overflow-hidden group"
              style={{
                border: "1px solid rgba(201,168,76,0.15)",
                boxShadow: "0 2px 12px rgba(107,15,26,0.05)",
                opacity: pkg.active ? 1 : 0.6,
              }}>
              {/* Image */}
              {pkg.image_url && (
                <div className="relative h-40 overflow-hidden">
                  <img src={pkg.image_url} alt={pkg.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {pkg.badge_en && (
                    <span className="absolute top-2 right-2 text-xs font-bold text-[#3D0812] px-2 py-0.5 rounded-full"
                      style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)" }}>
                      {isTE ? (pkg.badge_te || pkg.badge_en) : pkg.badge_en}
                    </span>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[#E8C97A] font-serif font-bold text-lg">
                      {isTE ? (pkg.price_te || pkg.price_en) : pkg.price_en}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-serif font-bold text-[#6B0F1A] text-sm leading-tight uppercase tracking-wide">
                    {isTE ? (pkg.title_te || pkg.title_en) : pkg.title_en}
                  </h3>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border flex-shrink-0 ${pkg.active ? "bg-green-100 text-green-700 border-green-300" : "bg-gray-100 text-gray-500 border-gray-300"}`}>
                    {pkg.active ? "ON" : "OFF"}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mb-3 line-clamp-2">
                  {isTE ? (pkg.description_te || pkg.description_en) : pkg.description_en}
                </p>
                {/* Features preview */}
                <div className="space-y-0.5 mb-4">
                  {(isTE ? (pkg.features_te?.length ? pkg.features_te : pkg.features_en) : pkg.features_en)
                    .slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                        <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 text-[#6B0F1A] flex-shrink-0" stroke="currentColor" strokeWidth="2"><path d="M2 6l3 3 5-5"/></svg>{f}
                      </div>
                    ))}
                  {(pkg.features_en?.length ?? 0) > 3 && (
                    <p className="text-xs text-gray-400 mt-1">+{pkg.features_en.length - 3} more</p>
                  )}
                </div>
                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-gray-50">
                  <button onClick={() => openEdit(pkg)}
                    className="flex-1 py-2 rounded-lg text-xs font-semibold text-[#6B0F1A] border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-colors">
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 inline mr-1" stroke="currentColor" strokeWidth="1.6"><path d="M11.5 2.5l2 2-9 9H2.5v-2l9-9z"/></svg>{isTE ? "సవరించు" : "Edit"}
                  </button>
                  <button onClick={() => toggleActive(pkg)}
                    className="flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors"
                    style={pkg.active
                      ? { color: "#92400e", borderColor: "rgba(217,119,6,0.3)", background: "rgba(254,243,199,0.5)" }
                      : { color: "#166534", borderColor: "rgba(22,101,52,0.3)", background: "rgba(240,253,244,0.5)" }}>
                    {pkg.active ? (isTE ? "దాచు" : "Hide") : (isTE ? "చూపించు" : "Show")}
                  </button>
                  <button onClick={() => deletePackage(pkg.id)} disabled={deleting === pkg.id}
                    className="py-2 px-3 rounded-lg text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors disabled:opacity-50">
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.6"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-lg text-[#6B0F1A]">
                {editing ? (isTE ? "ప్యాకేజీ సవరించండి" : "Edit Package") : (isTE ? "కొత్త ప్యాకేజీ" : "Add New Package")}
              </h3>
              <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-gray-600"><svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>
            </div>

            {/* Language tabs */}
            <div className="flex gap-1 mb-5 bg-gray-100 rounded-lg p-1">
              {(["en", "te"] as const).map((l) => (
                <button key={l} onClick={() => setTab(l)}
                  className={`flex-1 py-1.5 rounded text-xs font-semibold transition-all ${tab === l ? "bg-white text-[#6B0F1A] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  {l === "en" ? "English" : "Telugu"}
                </button>
              ))}
            </div>

            <form onSubmit={savePackage} className="space-y-4">
              {/* Shared fields */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Package Key (unique) <span className="text-red-400">*</span>
                </label>
                <input type="text" required value={form.key} onChange={(e) => setForm((f) => ({ ...f, key: e.target.value }))}
                  placeholder="e.g. premiumWedding"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Package Image</label>
                <ImageUploader
                  value={form.image_url}
                  folder="packages"
                  onUploaded={(url) => setForm((f) => ({ ...f, image_url: url }))}
                />
              </div>

              {/* Language-specific fields */}
              {tab === "en" ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Title (EN) <span className="text-red-400">*</span>
                    </label>
                    <input type="text" required value={form.title_en} onChange={(e) => setForm((f) => ({ ...f, title_en: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Description (EN) <span className="text-red-400">*</span>
                    </label>
                    <textarea rows={2} required value={form.description_en}
                      onChange={(e) => setForm((f) => ({ ...f, description_en: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] resize-none" />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Price (EN) <span className="text-red-400">*</span>
                      </label>
                      <input type="text" required value={form.price_en} onChange={(e) => setForm((f) => ({ ...f, price_en: e.target.value }))}
                        placeholder="₹2,50,000"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Badge (EN)</label>
                      <input type="text" value={form.badge_en} onChange={(e) => setForm((f) => ({ ...f, badge_en: e.target.value }))}
                        placeholder="Most Popular"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Features (EN) — one per line <span className="text-red-400">*</span>
                    </label>
                    <textarea rows={5} required value={form.features_en}
                      onChange={(e) => setForm((f) => ({ ...f, features_en: e.target.value }))}
                      placeholder="Full venue decoration&#10;Professional photography&#10;..."
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] resize-none font-mono" />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Title (TE)</label>
                    <input type="text" value={form.title_te} onChange={(e) => setForm((f) => ({ ...f, title_te: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Description (TE)</label>
                    <textarea rows={2} value={form.description_te}
                      onChange={(e) => setForm((f) => ({ ...f, description_te: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] resize-none" />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Price (TE)</label>
                      <input type="text" value={form.price_te} onChange={(e) => setForm((f) => ({ ...f, price_te: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Badge (TE)</label>
                      <input type="text" value={form.badge_te} onChange={(e) => setForm((f) => ({ ...f, badge_te: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Features (TE) — one per line</label>
                    <textarea rows={5} value={form.features_te}
                      onChange={(e) => setForm((f) => ({ ...f, features_te: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] resize-none font-mono" />
                  </div>
                </>
              )}

              {/* Sort + Active */}
              <div className="flex items-end gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Sort Order</label>
                  <input type="number" min={0} value={form.sort_order}
                    onChange={(e) => setForm((f) => ({ ...f, sort_order: +e.target.value }))}
                    className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
                </div>
                <label className="flex items-center gap-2 cursor-pointer select-none pb-2">
                  <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
                    className="w-4 h-4 accent-[#6B0F1A]" />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>

              <button type="submit" disabled={saving}
                className="w-full py-3 rounded-xl font-bold text-white text-sm disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}>
                {saving ? "Saving..." : (editing ? (isTE ? "అప్‌డేట్ చేయండి" : "Update Package") : (isTE ? "ప్యాకేజీ జోడించండి" : "Save Package"))}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
