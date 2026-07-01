"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useParams } from "next/navigation";

interface Client {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  preferred_language: string;
  created_at: string;
  total_bookings?: number;
}

export default function AdminClientsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isTE = locale === "te";

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Client | null>(null);

  useEffect(() => { fetchClients(); }, []);

  const fetchClients = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    setClients(data ?? []);
    setLoading(false);
  };

  const filtered = clients.filter((c) =>
    !search || [c.full_name, c.email, c.phone]
      .some((v) => v?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-serif font-bold text-2xl text-[#6B0F1A]">
            {isTE ? "క్లయింట్లు" : "Clients"}
          </h1>
          <p className="text-gray-500 text-sm">{clients.length} registered clients</p>
        </div>
        <button onClick={fetchClients}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}>
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 inline mr-1" stroke="currentColor" strokeWidth="1.7"><path d="M13.5 2.5A7 7 0 112.5 10"/><path d="M2 6.5V10h3.5"/></svg>{isTE ? "రిఫ్రెష్" : "Refresh"}
        </button>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder={isTE ? "పేరు, ఇమెయిల్, ఫోన్ వెతకండి..." : "Search by name, email, phone..."}
          className="w-full max-w-sm border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
      </div>

      <div className="bg-white rounded-xl overflow-hidden"
        style={{ border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 2px 10px rgba(107,15,26,0.04)" }}>
        {loading ? (
          <div className="py-20 text-center text-gray-400">
            <div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin mx-auto mb-3" />
            {isTE ? "లోడవుతోంది..." : "Loading..."}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            <div className="mb-3 flex justify-center"><svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-gray-300" stroke="currentColor" strokeWidth="1.3"><circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.866 3.134-7 7-7s7 3.134 7 7"/><path d="M17 6a3.5 3.5 0 010 7M22 20c0-2.577-1.564-4.773-3.75-5.7"/></svg></div>
            {isTE ? "క్లయింట్లు కనుగొనబడలేదు" : "No clients found"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "rgba(107,15,26,0.04)" }}>
                  {["Client","Email","Phone","Language","Joined","Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#3D0812] flex-shrink-0"
                          style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)" }}>
                          {(c.full_name || "?").charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-[#6B0F1A]">{c.full_name || "—"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{c.email ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{c.phone ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FDF8F0] text-[#6B0F1A] border border-[#C9A84C]/20">
                        {c.preferred_language === "te" ? "తెలుగు" : "English"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{new Date(c.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelected(c)}
                        className="px-2 py-1 rounded text-xs font-semibold text-[#6B0F1A] hover:bg-[#6B0F1A]/10 transition-colors">
                        View
                      </button>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif font-bold text-lg text-[#6B0F1A]">Client Profile</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>
            </div>
            <div className="flex flex-col items-center mb-5">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-[#3D0812] mb-2"
                style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)" }}>
                {(selected.full_name || "?").charAt(0).toUpperCase()}
              </div>
              <div className="font-serif font-bold text-[#6B0F1A] text-lg">{selected.full_name || "—"}</div>
            </div>
            <div className="space-y-3 divide-y divide-gray-50">
              {[["Email", selected.email ?? "—"], ["Phone", selected.phone ?? "—"],
                ["Language", selected.preferred_language === "te" ? "తెలుగు" : "English"],
                ["Member Since", new Date(selected.created_at).toLocaleDateString()]
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2 text-sm">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-medium text-[#6B0F1A]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
