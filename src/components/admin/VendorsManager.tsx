"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useParams } from "next/navigation";

interface Vendor {
  id: string;
  name: string;
  category: string;
  phone: string | null;
  email: string | null;
  city: string | null;
  rating: number | null;
  status: "active" | "inactive";
  notes: string | null;
  created_at: string;
}

const CATEGORIES = ["photographer","videographer","catering","decoration","music","venue","transport","makeup","other"];

export default function AdminVendorsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isTE = locale === "te";

  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", category: "photographer", phone: "", email: "", city: "", rating: "", notes: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => { fetchVendors(); }, []);

  const fetchVendors = async () => {
    setLoading(true);
    const { data } = await supabase.from("vendors").select("*").order("name");
    setVendors(data ?? []);
    setLoading(false);
  };

  const addVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("vendors").insert([{
      ...form,
      rating: form.rating ? Number(form.rating) : null,
      status: "active",
    }]);
    if (error) { setMsg("Error: " + error.message); }
    else { setMsg("Vendor added!"); setShowAdd(false); setForm({ name: "", category: "photographer", phone: "", email: "", city: "", rating: "", notes: "" }); fetchVendors(); }
    setSaving(false);
    setTimeout(() => setMsg(""), 3000);
  };

  const toggleStatus = async (id: string, current: string) => {
    await supabase.from("vendors").update({ status: current === "active" ? "inactive" : "active" }).eq("id", id);
    fetchVendors();
  };

  const filtered = vendors.filter((v) => {
    const matchCat = catFilter === "all" || v.category === catFilter;
    const matchSearch = !search || [v.name, v.phone, v.email, v.city]
      .some((x) => x?.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-serif font-bold text-2xl text-[#6B0F1A]">{isTE ? "విక్రేతలు" : "Vendors"}</h1>
          <p className="text-gray-500 text-sm">{vendors.length} total vendors · {vendors.filter((v) => v.status === "active").length} active</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchVendors} className="px-4 py-2 rounded-lg text-sm font-semibold text-[#6B0F1A] border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-colors">
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 inline mr-1" stroke="currentColor" strokeWidth="1.7"><path d="M13.5 2.5A7 7 0 112.5 10"/><path d="M2 6.5V10h3.5"/></svg>{isTE ? "రిఫ్రెష్" : "Refresh"}
          </button>
          <button onClick={() => setShowAdd(true)} className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}>
            + {isTE ? "విక్రేత జోడించండి" : "Add Vendor"}
          </button>
        </div>
      </div>

      {msg && <div className="mb-4 p-3 rounded-lg text-sm text-green-800 bg-green-50 border border-green-200">{msg}</div>}

      <div className="flex gap-2 mb-5 flex-wrap">
        <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder={isTE ? "విక్రేత వెతకండి..." : "Search vendors..."}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] w-52" />
        <div className="flex gap-1 flex-wrap">
          {["all", ...CATEGORIES].map((c) => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${catFilter === c ? "text-white" : "text-gray-600 bg-white border border-gray-200 hover:bg-gray-50"}`}
              style={catFilter === c ? { background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" } : {}}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-3 py-20 text-center text-gray-400">
            <div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin mx-auto mb-3" />
            {isTE ? "లోడవుతోంది..." : "Loading..."}
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-3 py-20 text-center text-gray-400">
            <div className="mb-3 flex justify-center"><svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-gray-300" stroke="currentColor" strokeWidth="1.3"><path d="M3 11l2-7h14l2 7"/><rect x="2" y="11" width="20" height="10" rx="1"/><path d="M9 21v-5h6v5"/></svg></div>
            {isTE ? "విక్రేతలు కనుగొనబడలేదు" : "No vendors found"}
          </div>
        ) : filtered.map((v) => (
          <div key={v.id} className="bg-white rounded-xl p-5 transition-all hover:-translate-y-0.5"
            style={{ border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 2px 10px rgba(107,15,26,0.04)" }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-[#6B0F1A]">{v.name}</h3>
                <span className="text-xs text-gray-500 capitalize">{v.category}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${v.status === "active" ? "bg-green-50 text-green-800 border-green-200" : "bg-gray-50 text-gray-500 border-gray-200"}`}>
                {v.status}
              </span>
            </div>
            {v.rating && (
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < (v.rating ?? 0) ? "text-[#C9A84C]" : "text-gray-200"}>★</span>
                ))}
              </div>
            )}
            <div className="space-y-1 text-xs text-gray-600 mb-4">
              {v.phone && <div className="flex items-center gap-1.5"><svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 flex-shrink-0" stroke="currentColor" strokeWidth="1.5"><path d="M2 2.5A1.5 1.5 0 013.5 1h1.066a1 1 0 01.97.757l.516 2.063a1 1 0 01-.29.989L4.5 6a9.06 9.06 0 004.5 4.5l1.19-1.262a1 1 0 01.989-.29l2.063.516A1 1 0 0114 10.434V11.5A1.5 1.5 0 0112.5 13C6.701 13 2 8.299 2 2.5z"/></svg>{v.phone}</div>}
              {v.email && <div className="flex items-center gap-1.5"><svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 flex-shrink-0" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M1 5l7 4 7-4"/></svg>{v.email}</div>}
              {v.city  && <div className="flex items-center gap-1.5"><svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 flex-shrink-0" stroke="currentColor" strokeWidth="1.5"><path d="M8 1a4 4 0 00-4 4c0 3.5 4 8.5 4 8.5S12 8.5 12 5a4 4 0 00-4-4z"/><circle cx="8" cy="5" r="1.5"/></svg>{v.city}</div>}
            </div>
            <button onClick={() => toggleStatus(v.id, v.status)}
              className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-colors ${v.status === "active" ? "text-red-600 bg-red-50 hover:bg-red-100" : "text-green-700 bg-green-50 hover:bg-green-100"}`}>
              {v.status === "active" ? "Deactivate" : "Activate"}
            </button>
          </div>
        ))}
      </div>

      {/* Add Vendor Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif font-bold text-lg text-[#6B0F1A]">{isTE ? "విక్రేత జోడించండి" : "Add Vendor"}</h3>
              <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-gray-600"><svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>
            </div>
            <form onSubmit={addVendor} className="space-y-4">
              {[
                { k: "name", label: "Vendor Name", type: "text", required: true },
                { k: "phone", label: "Phone", type: "tel" },
                { k: "email", label: "Email", type: "email" },
                { k: "city", label: "City", type: "text" },
                { k: "rating", label: "Rating (1-5)", type: "number" },
              ].map(({ k, label, type, required }) => (
                <div key={k}>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</label>
                  <input type={type} required={required} min={type === "number" ? 1 : undefined} max={type === "number" ? 5 : undefined}
                    value={(form as Record<string, string>)[k]}
                    onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] bg-white capitalize">
                  {CATEGORIES.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
                </select>
              </div>
              <button type="submit" disabled={saving} className="w-full py-3 rounded-xl font-bold text-white text-sm disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}>
                {saving ? "Saving..." : (isTE ? "సేవ్ చేయండి" : "Save Vendor")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
