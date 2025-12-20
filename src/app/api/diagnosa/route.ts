import { NextResponse } from "next/server";
import { damages, rules } from "../../data/kb";
import { diagnoseCF } from "../../cf/engine";
import type { UserSymptom } from "../../cf/types";

export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/diagnosa" });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { inputs?: UserSymptom[] };
  const inputs = Array.isArray(body.inputs) ? body.inputs : [];

  const results = diagnoseCF({ damages, rules, inputs })
    .sort((a, b) => b.cf - a.cf)
    .filter((r) => r.cf > 0) //* DISARING YANG CFN -> 0 (lebih dari 0 agar lebih enak dilihat)
    // .slice(0, 5); //* hanya menampilkan 5 hasil

  return NextResponse.json({ results });
}