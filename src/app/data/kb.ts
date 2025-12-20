//* INI FILE UNTUK BASIS PENGATAHUAN SEMENTARA (hardcode)
import type { Damage, Rule, Symptom } from "../cf/types";

export const symptoms: Symptom[] = [
  { id: "G1", code: "G1", name: "Blue screen sering muncul" },
  { id: "G2", code: "G2", name: "Beep berulang saat boot" },
  { id: "G3", code: "G3", name: "Laptop restart sendiri" },
  { id: "G4", code: "G4", name: "Suhu cepat panas / thermal throttling" },
];

export const damages: Damage[] = [
  { id: "D1", code: "RAM", name: "RAM bermasalah", solution: "Coba ganti RAM, bersihkan pin, tes satu keping, jalankan memtest. Jika perlu, beli RAM baru dan bandingkan dengan RAM yang sebelumnya!." },
  { id: "D2", code: "OVH", name: "Overheating", solution: "Bersihkan fan/heatsink, ganti thermal paste, cek airflow, undervolt (opsional)." },
  { id: "D3", code: "CL", name: "Cooling Pad", solution: "Coba gunakan cooling pad (alas pendingin laptop), kipas, atau AC di ruangan untuk mendinginkan laptop dengan cepat."},
  { id: "D4", code: "DISO", name: "Driver + Software", solution: "Coba cek Driver laptop/pc dan Software yang diinstall. Pastikan Driver yang digunakan sudah versi terbaru!."},
  { id: "D5", code: "INUL", name: "Install Ulang", solution: "Jika semua cara gagal, coba install ulang laptop/pc windows anda. Setelah itu, pastikan update windows dan driver anda ke versi terbaru."},
  { id: "D6", code: "MALWARE", name: "Malware", solution: "Lakukan pemindaian menyeluruh menggunakan antivirus terpercaya seperti Kaspersky, Bitdefender, dsb."},
  { id: "D7", code: "STORAGE", name: "Hardisk/SSD", solution: "Mungkin Hardisk/SSD anda bermasalah. Seperti lecet, rusak, dsb sehingga perlu diganti."},
  { id: "D8", code: "VGA", name: "Kartu Grafis (VGA)", solution: "Periksa kembali VGA anda dan pastikan tidak ada masalah dengan laptop/pc."},
  { id: "D9", code: "PERMUKAAN", name: "Gunakan Laptop/PC di Permukaan Datar", solution: "Hindari penggunaan laptop/pc di kasur atau sofa, letakkan di permukaan keras dan datar agar ventilasi tidak terhalang."},
];

export const rules: Rule[] = [

  //* BLUE SCREEN
  { id: "R1", damageId: "D1", symptomId: "G1", expertCF: 0.6 },
  { id: "R2", damageId: "D4", symptomId: "G1", expertCF: 0.45 },
  { id: "R3", damageId: "D6", symptomId: "G1", expertCF: 0.3 },
  { id: "R4", damageId: "D5", symptomId: "G1", expertCF: 0.1 },

  //* BEEP BERULANG SAAT BOOT
  { id: "R5", damageId: "D1", symptomId: "G2", expertCF: 0.8 },
  { id: "R6", damageId: "D7", symptomId: "G2", expertCF: 0.3 },
  { id: "R7", damageId: "D8", symptomId: "G2", expertCF: 0.65 },

  //* LAPTOP RESTART SENDIRI
  { id: "R8", damageId: "D1", symptomId: "G3", expertCF: 0.5 },
  { id: "R9", damageId: "D2", symptomId: "G3", expertCF: 0.7 },
  { id: "R10", damageId: "D4", symptomId: "G3", expertCF: 0.35 },
  { id: "R11", damageId: "D3", symptomId: "G3", expertCF: 0.25 },
  { id: "R12", damageId: "D5", symptomId: "G3", expertCF: 0.1 },

  //* SUHU CEPAT PANAS / THERMAL THROTTLING
  { id: "R13", damageId: "D2", symptomId: "G4", expertCF: 0.9 },
  { id: "R14", damageId: "D3", symptomId: "G4", expertCF: 0.7 },
  { id: "R15", damageId: "D9", symptomId: "G4", expertCF: 0.55 },
  { id: "R16", damageId: "D5", symptomId: "G4", expertCF: 0.1 },
];