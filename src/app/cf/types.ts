export type Symptom = { id: string; code: string; name: string };

export type Damage = { id: string; code: string; name: string; solution: string };

export type Rule = {
    id: string;
    damageId: string;
    symptomId: string;
    expertCF: number; // 0.1 dll
}

export type UserSymptom = { symptomId: string; userCF: number };

export type DiagnosisResult = {
    damageId: string;
    cf: number;
    matched: Array<{ symptomId: string; cf: number }>;
}