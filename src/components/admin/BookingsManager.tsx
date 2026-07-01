"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useParams } from "next/navigation";

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  event_type: string;
  event_date: string;
  guests: string;
  package_name: string | null;
  city: string | null;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  special_requests: string | null;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending:   "bg-yellow-50 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-50 text-green-800 border-green-200",
  cancelled: "bg-red-50 text-red-800 border-red-200",
  completed: "bg-blue-50 text-blue-800 border-blue-200",
};

export default function AdminBookingsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isTE = locale === "te";

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Booking | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    setBookings(data ?? []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    setSaving(true);
    await supabase.from("bookings").update({ status }).eq("id", id);
    await fetchBookings();
    if (selected?.id === id) setSelected((b) => b ? { ...b, status: status as Booking["status"] } : null);
    setSaving(false);
  };

  const filtered = bookings.filter((b) => {
    const matchFilter = filter === "all" || b.status === filter;
    const matchSearch = !search || [b.name, b.phone, b.email, b.event_type]
      .some((v) => v?.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-serif font-bold text-2xl text-[#6B0F1A]">
            {isTE ? "బుకింగ్‌లు" : "Bookings"}
          </h1>
          <p className="text-gray-500 text-sm">{bookings.length} total bookings</p>
        </div>
        <button onClick={fetchBookings}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}>
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 inline mr-1" stroke="currentColor" strokeWidth="1.7"><path d="M13.5 2.5A7 7 0 112.5 10"/><path d="M2 6.5V10h3.5"/></svg>{isTE ? "రిఫ్రెష్" : "Refresh"}
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {(["all","pending","confirmed","completed","cancelled"] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`p-3 rounded-xl text-left border transition-all ${filter === s ? "ring-2 ring-[#C9A84C]" : ""}`}
            style={{ background: filter === s ? "rgba(201,168,76,0.08)" : "white", border: "1px solid rgba(201,168,76,0.15)" }}>
            <div className="text-xl font-bold text-[#6B0F1A]">{counts[s]}</div>
            <div className="text-xs text-gray-500 capitalize mt-0.5">{s}</div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder={isTE ? "పేరు, ఫోన్, ఇమెయిల్ వెతకండి..." : "Search by name, phone, email..."}
          className="w-full max-w-sm border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
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
            <div className="mb-3 flex justify-center"><svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-gray-300" stroke="currentColor" strokeWidth="1.3"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/></svg></div>
            {isTE ? "బుకింగ్‌లు కనుగొనబడలేదు" : "No bookings found"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "rgba(107,15,26,0.04)" }}>
                  {["Name","Phone","Event","Date","Guests","Package","Status","Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-[#6B0F1A] whitespace-nowrap">{b.name}</td>
                    <td className="px-4 py-3 text-gray-600">{b.phone}</td>
                    <td className="px-4 py-3 capitalize text-gray-700">{b.event_type}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{b.event_date}</td>
                    <td className="px-4 py-3 text-gray-600">{b.guests}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{b.package_name ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border capitalize ${STATUS_COLORS[b.status]}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => setSelected(b)}
                          className="px-2 py-1 rounded text-xs font-semibold text-[#6B0F1A] hover:bg-[#6B0F1A]/10 transition-colors">
                          View
                        </button>
                        {b.status === "pending" && (
                          <button onClick={() => updateStatus(b.id, "confirmed")} disabled={saving}
                            className="px-2 py-1 rounded text-xs font-semibold text-green-700 hover:bg-green-50 transition-colors">
                            Confirm
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif font-bold text-lg text-[#6B0F1A]">Booking Details</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>
            </div>
            <div className="space-y-3 divide-y divide-gray-50">
              {[
                ["Name", selected.name],
                ["Phone", selected.phone],
                ["Email", selected.email ?? "—"],
                ["Event Type", selected.event_type],
                ["Date", selected.event_date],
                ["Guests", selected.guests],
                ["Package", selected.package_name ?? "—"],
                ["City", selected.city ?? "—"],
                ["Special Requests", selected.special_requests ?? "—"],
                ["Booked On", new Date(selected.created_at).toLocaleDateString()],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2 text-sm">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-medium text-[#6B0F1A] text-right max-w-[200px]">{v}</span>
                </div>
              ))}
            </div>
            {/* Status controls */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">Update Status</p>
              <div className="flex gap-2 flex-wrap">
                {(["pending","confirmed","completed","cancelled"] as const).map((s) => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)} disabled={saving || selected.status === s}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border ${selected.status === s ? STATUS_COLORS[s] + " ring-2 ring-offset-1 ring-[#C9A84C]" : "text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
