import type { Damage, DiagnosisResult, Rule, UserSymptom } from "./types";

export function combinePositive(cf1: number, cf2: number) {
  return cf1 + cf2 * (1 - cf1);
}

export function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

export function diagnoseCF(params: {
  damages: Damage[];
  rules: Rule[];
  inputs: UserSymptom[];
}): DiagnosisResult[] {
  const { damages, rules, inputs } = params;

  const inputMap = new Map(inputs.map((i) => [i.symptomId, clamp01(i.userCF)]));

  return damages.map((d) => {
    const matched = rules
      .filter((r) => r.damageId === d.id && inputMap.has(r.symptomId))
      .map((r) => {
        const userCF = inputMap.get(r.symptomId)!;
        const cfi = clamp01(r.expertCF) * userCF; // CF_i = expert * user
        return { symptomId: r.symptomId, cf: cfi };
      });

    let cf = 0;
    for (const m of matched) cf = combinePositive(cf, m.cf);

    return { damageId: d.id, cf: clamp01(cf), matched };
  });
}
