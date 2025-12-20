"use client";

import { useMemo, useState } from "react";
import { damages, symptoms } from "../data/kb";

type UserInput = { symptomId: string; userCF: number };

export default function DiagnosePage() {
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [payload, setPayload] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const inputs: UserInput[] = useMemo(
    () => Object.entries(selected).map(([symptomId, userCF]) => ({ symptomId, userCF })),
    [selected]
  );

  async function submit() {
    setLoading(true);
    setPayload(null);

    const res = await fetch("/api/diagnosa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputs }),
    });

    const text = await res.text();
    setLoading(false);

    if (!res.ok) {
      console.error("Status:", res.status, "Body:", text);
      alert(`API error ${res.status}. Cek console/terminal.`);
      return;
    }

    setPayload(JSON.parse(text));
  }

  function reset() {
    setSelected({});
    setPayload(null);
  }

  const selectedCount = Object.keys(selected).length;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-4xl px-4 py-10">
        {/* Header */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Diagnosa Kerusakan Laptop/PC
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Pilih gejala yang kamu alami, lalu atur tingkat keyakinan (0.0-1.0).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                Dipilih: {selectedCount}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={submit}
              disabled={loading || selectedCount === 0}
              className={[
                "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium",
                "bg-slate-900 text-white shadow-sm transition",
                "hover:bg-slate-800",
                "disabled:cursor-not-allowed disabled:opacity-50",
              ].join(" ")}
            >
              {loading ? "Memproses..." : "Proses Diagnosa"}
            </button>

            <button
              onClick={reset}
              disabled={loading && selectedCount === 0}
              className={[
                "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium",
                "border border-slate-200 bg-white text-slate-800 transition",
                "hover:bg-slate-50",
              ].join(" ")}
            >
              Reset
            </button>

            <div className="sm:ml-auto">
              <a
                href="/api/diagnosa"
                target="_blank"
                className="text-sm text-slate-600 underline-offset-4 hover:underline"
                rel="noreferrer"
              >
                Cek endpoint /api/diagnosa
              </a>
            </div>
          </div>
        </div>

        {/* Symptoms */}
        <section className="mt-6">
          <h2 className="mb-3 text-base font-semibold text-slate-800">Daftar Gejala</h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {symptoms.map((s) => {
              const checked = s.id in selected;

              return (
                <div
                  key={s.id}
                  className={[
                    "rounded-2xl border bg-white p-4 shadow-sm transition",
                    checked ? "border-slate-900" : "border-slate-200",
                  ].join(" ")}
                >
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      className="mt-1 h-4 w-4 accent-slate-900"
                      onChange={(e) => {
                        if (e.target.checked) setSelected((p) => ({ ...p, [s.id]: 1 }));
                        else
                          setSelected((p) => {
                            const copy = { ...p };
                            delete copy[s.id];
                            return copy;
                          });
                      }}
                    />

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-900">{s.name}</span>
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                          {s.code}
                        </span>
                      </div>

                      {checked && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-slate-600">Tingkat keyakinan</p>
                            <p className="text-xs font-medium text-slate-900">
                              {selected[s.id].toFixed(1)}
                            </p>
                          </div>

                          <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.1}
                            value={selected[s.id]}
                            onChange={(e) =>
                              setSelected((p) => ({ ...p, [s.id]: Number(e.target.value) }))
                            }
                            className="mt-2 w-full"
                          />

                          <div className="mt-2 flex flex-wrap gap-2">
                            {[0.2, 0.4, 0.6, 0.8, 1.0].map((v) => (
                              <button
                                key={v}
                                type="button"
                                onClick={() => setSelected((p) => ({ ...p, [s.id]: v }))}
                                className={[
                                  "rounded-lg border px-2.5 py-1 text-xs transition",
                                  selected[s.id] === v
                                    ? "border-slate-900 bg-slate-900 text-white"
                                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                                ].join(" ")}
                              >
                                {v.toFixed(1)}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>

          {selectedCount === 0 && (
            <p className="mt-4 text-sm text-slate-600">
              Pilih minimal 1 gejala untuk menjalankan diagnosa.
            </p>
          )}
        </section>

        {/* Results */}
        {/* HASIL DIAGNOSA */}
        {payload?.results && (
          <section className="mt-8">
            <h2 className="mb-3 text-base font-semibold text-slate-800">Hasil Diagnosa</h2>

            <div className="flex rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              {payload.results.length === 0 ? (
                <p className="text-sm text-slate-600">
                  Tidak ada hasil. Pastikan kamu memilih gejala yang sesuai.
                </p>
              ) : (
                <ul className="space-y-3">
                  {payload.results.map((r: any, idx: number) => {
                    const d = damages.find((x) => x.id === r.damageId);
                    const percent = Math.round(r.cf * 10000) / 100;
                    return (
                      <li
                        key={r.damageId}
                        className={[
                          "rounded-xl border p-4",
                          idx === 0 ? "border-slate-900 bg-slate-50" : "border-slate-200",
                        ].join(" ")}
                      >
                        <div className="flex gap-1 items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {d?.name ?? r.damageId}
                            </p>
                            <p className="mt-1 text-sm text-slate-700">
                              Solusi: <span className="text-slate-700">{d?.solution}</span>
                            </p>
                          </div>

                          <div className="">
                            <span className="inline-flex gap-1 items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                              <span>CF:</span>
                              <span>{percent}%</span>
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}