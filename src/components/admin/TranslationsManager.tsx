"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

interface Translation {
  id: string;
  language_code: string;
  translation_key: string;
  translated_value: string;
  module: string;
  updated_at: string;
}

interface Language {
  id: string;
  code: string;
  name: string;
  native_name: string;
  active: boolean;
}

export default function TranslationsManager() {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLang, setSelectedLang] = useState("en");
  const [selectedModule, setSelectedModule] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    fetchLanguages();
    fetchTranslations();
  }, [selectedLang, selectedModule]);

  const fetchLanguages = async () => {
    const { data } = await supabase.from("languages").select("*").order("name");
    if (data) setLanguages(data);
  };

  const fetchTranslations = async () => {
    let query = supabase
      .from("translations")
      .select("*")
      .eq("language_code", selectedLang)
      .order("module")
      .order("translation_key");

    if (selectedModule !== "all") {
      query = query.eq("module", selectedModule);
    }

    const { data } = await query;
    if (data) setTranslations(data);
  };

  const saveEdit = async (id: string) => {
    setSaving(true);
    const { error } = await supabase
      .from("translations")
      .update({ translated_value: editValue, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      showNotification("error", "Failed to save. Please try again.");
    } else {
      showNotification("success", "Translation saved successfully!");
      fetchTranslations();
    }
    setEditingId(null);
    setSaving(false);
  };

  const exportJSON = () => {
    const data: Record<string, string> = {};
    translations.forEach((t) => {
      data[t.translation_key] = t.translated_value;
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `translations-${selectedLang}-${selectedModule}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      const rows = Object.entries(data).map(([key, value]) => ({
        language_code: selectedLang,
        translation_key: key,
        translated_value: value as string,
        module: key.split(".")[0] || "general",
      }));

      const { error } = await supabase.from("translations").upsert(rows, {
        onConflict: "language_code,translation_key",
      });

      if (error) {
        showNotification("error", "Import failed: " + error.message);
      } else {
        showNotification("success", `Imported ${rows.length} translations successfully!`);
        fetchTranslations();
      }
    } catch {
      showNotification("error", "Invalid JSON file.");
    }
    setImporting(false);
  };

  const showNotification = (type: "success" | "error", msg: string) => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 4000);
  };

  const filtered = translations.filter(
    (t) =>
      t.translation_key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.translated_value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const modules = ["all", ...Array.from(new Set(translations.map((t) => t.module)))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className="px-6 py-4"
        style={{ background: "linear-gradient(135deg, #3D0812, #6B0F1A)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-[#C9A84C] font-serif text-xl font-bold">
              SKA Events — Admin Translation Manager
            </h1>
            <p className="text-white/50 text-xs mt-0.5">
              Manage multilingual translations for all modules
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {/* Import */}
            <label
              className="cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#C9A84C] border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-colors"
            >
              {importing ? "Importing..." : "⬆️ Import JSON"}
              <input type="file" accept=".json" className="hidden" onChange={importJSON} />
            </label>
            {/* Export */}
            <button
              onClick={exportJSON}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#3D0812] transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A)" }}
            >
              ⬇️ Export JSON
            </button>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`px-6 py-3 text-sm font-medium text-center ${
            notification.type === "success"
              ? "bg-green-50 text-green-800 border-b border-green-200"
              : "bg-red-50 text-red-800 border-b border-red-200"
          }`}
        >
          {notification.type === "success"
            ? <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 inline mr-1" stroke="currentColor" strokeWidth="2"><path d="M2.5 8l4 4 7-8"/></svg>
            : <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 inline mr-1" stroke="currentColor" strokeWidth="2"><path d="M4 4l8 8M12 4l-8 8"/></svg>
          } {notification.msg}
        </div>
      )}

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Language selector */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">
              Language
            </label>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]"
            >
              <option value="en">English</option>
              <option value="te">Telugu</option>
              {languages
                .filter((l) => !["en", "te"].includes(l.code))
                .map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.native_name} ({l.code})
                  </option>
                ))}
            </select>
          </div>

          {/* Module selector */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">
              Module
            </label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] capitalize"
            >
              {modules.map((m) => (
                <option key={m} value={m} className="capitalize">
                  {m === "all" ? "All Modules" : m}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xs">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search key or value..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]"
            />
          </div>

          <div className="text-xs text-gray-400 ml-auto">
            {filtered.length} translations
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div
          className="bg-white rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 2px 10px rgba(107,15,26,0.05)" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(107,15,26,0.05)" }}>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider w-48">
                  Module
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">
                  Translation Key
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">
                  Value
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider w-24">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-gray-400">
                    No translations found.{" "}
                    {translations.length === 0 &&
                      "Import a JSON file to seed translations."}
                  </td>
                </tr>
              ) : (
                filtered.map((tr) => (
                  <tr key={tr.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <span
                        className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide"
                        style={{
                          background: "rgba(107,15,26,0.08)",
                          color: "#6B0F1A",
                        }}
                      >
                        {tr.module}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">
                      {tr.translation_key}
                    </td>
                    <td className="px-4 py-3">
                      {editingId === tr.id ? (
                        <textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-full border border-[#C9A84C]/40 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-[#C9A84C] resize-none"
                          rows={2}
                          autoFocus
                        />
                      ) : (
                        <span className="text-gray-800">{tr.translated_value}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingId === tr.id ? (
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => saveEdit(tr.id)}
                            disabled={saving}
                            className="px-2.5 py-1 rounded text-xs font-semibold text-white"
                            style={{ background: "#6B0F1A" }}
                          >
                            {saving ? "…" : "Save"}
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-2.5 py-1 rounded text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingId(tr.id);
                            setEditValue(tr.translated_value);
                          }}
                          className="px-2.5 py-1 rounded text-xs font-semibold text-[#C9A84C] border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-colors"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
