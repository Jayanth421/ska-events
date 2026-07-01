"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useParams } from "next/navigation";

interface Event {
  id: string;
  title: string;
  event_type: string;
  event_date: string;
  venue: string | null;
  client_name: string | null;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  budget: string | null;
  notes: string | null;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  upcoming:  "bg-blue-50 text-blue-800 border-blue-200",
  ongoing:   "bg-yellow-50 text-yellow-800 border-yellow-200",
  completed: "bg-green-50 text-green-800 border-green-200",
  cancelled: "bg-red-50 text-red-800 border-red-200",
};

export default function AdminEventsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isTE = locale === "te";

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", event_type: "wedding", event_date: "", venue: "", client_name: "", budget: "", notes: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const { data } = await supabase.from("events").select("*").order("event_date", { ascending: false });
    setEvents(data ?? []);
    setLoading(false);
  };

  const addEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("events").insert([{ ...form, status: "upcoming" }]);
    if (error) { setMsg("Error: " + error.message); }
    else { setMsg("Event added!"); setShowAdd(false); setForm({ title: "", event_type: "wedding", event_date: "", venue: "", client_name: "", budget: "", notes: "" }); fetchEvents(); }
    setSaving(false);
    setTimeout(() => setMsg(""), 3000);
  };

  const filtered = events.filter((ev) => {
    const matchFilter = filter === "all" || ev.status === filter;
    const matchSearch = !search || [ev.title, ev.client_name, ev.venue]
      .some((v) => v?.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-serif font-bold text-2xl text-[#6B0F1A]">{isTE ? "ఈవెంట్లు" : "Events"}</h1>
          <p className="text-gray-500 text-sm">{events.length} total events</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchEvents}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-[#6B0F1A] border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-colors">
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 inline mr-1" stroke="currentColor" strokeWidth="1.7"><path d="M13.5 2.5A7 7 0 112.5 10"/><path d="M2 6.5V10h3.5"/></svg>{isTE ? "రిఫ్రెష్" : "Refresh"}
          </button>
          <button onClick={() => setShowAdd(true)}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}>
            + {isTE ? "ఈవెంట్ జోడించండి" : "Add Event"}
          </button>
        </div>
      </div>

      {msg && <div className="mb-4 p-3 rounded-lg text-sm text-green-800 bg-green-50 border border-green-200">{msg}</div>}

      {/* Filters */}
      <div className="flex gap-2 mb-5 flex-wrap">
        <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder={isTE ? "ఈవెంట్ వెతకండి..." : "Search events..."}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] w-60" />
        {["all","upcoming","ongoing","completed","cancelled"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${filter === s ? "text-white" : "text-gray-600 bg-white border border-gray-200 hover:bg-gray-50"}`}
            style={filter === s ? { background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" } : {}}>
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden"
        style={{ border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 2px 10px rgba(107,15,26,0.04)" }}>
        {loading ? (
          <div className="py-20 text-center text-gray-400">
            <div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin mx-auto mb-3" />
            {isTE ? "లోడవుతోంది..." : "Loading..."}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            <div className="mb-3 flex justify-center"><svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-gray-300" stroke="currentColor" strokeWidth="1.3"><path d="M12 2l3 6.5L22 9.3l-5 4.87 1.18 6.87L12 17.77l-6.18 3.33L7 14.17 2 9.3l7-.8L12 2z"/></svg></div>
            {isTE ? "ఈవెంట్లు కనుగొనబడలేదు" : "No events found"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "rgba(107,15,26,0.04)" }}>
                  {["Event","Type","Date","Venue","Client","Budget","Status"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((ev) => (
                  <tr key={ev.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-[#6B0F1A]">{ev.title}</td>
                    <td className="px-4 py-3 capitalize text-gray-600">{ev.event_type}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{ev.event_date}</td>
                    <td className="px-4 py-3 text-gray-600">{ev.venue ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{ev.client_name ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{ev.budget ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border capitalize ${STATUS_COLORS[ev.status]}`}>
                        {ev.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Event Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif font-bold text-lg text-[#6B0F1A]">{isTE ? "కొత్త ఈవెంట్" : "Add New Event"}</h3>
              <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-gray-600"><svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>
            </div>
            <form onSubmit={addEvent} className="space-y-4">
              {[
                { k: "title", label: "Event Title", type: "text", required: true },
                { k: "event_date", label: "Event Date", type: "date", required: true },
                { k: "venue", label: "Venue", type: "text" },
                { k: "client_name", label: "Client Name", type: "text" },
                { k: "budget", label: "Budget (₹)", type: "text" },
              ].map(({ k, label, type, required }) => (
                <div key={k}>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</label>
                  <input type={type} required={required} value={(form as Record<string, string>)[k]}
                    onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Event Type</label>
                <select value={form.event_type} onChange={(e) => setForm((f) => ({ ...f, event_type: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] bg-white">
                  {["wedding","engagement","birthday","corporate","housewarming","other"].map((t) => (
                    <option key={t} value={t} className="capitalize">{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Notes</label>
                <textarea rows={2} value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] resize-none" />
              </div>
              <button type="submit" disabled={saving}
                className="w-full py-3 rounded-xl font-bold text-white text-sm disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}>
                {saving ? "Saving..." : (isTE ? "సేవ్ చేయండి" : "Save Event")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
