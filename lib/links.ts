import { site } from "@/content/site";

export function emergencyCallLink(): string {
  return `tel:${site.contacts.emergencyPhone}`;
}

export function dlhCallLink(): string {
  return `tel:${site.contacts.dlhPhone.replace(/[^0-9]/g, "")}`;
}

export function whatsappReportLink(message: string): string {
  const encoded = encodeURIComponent(
    `[WASI ASRI Surabaya] Halo, saya ingin melaporkan masalah lingkungan: ${message}`,
  );
  return `https://wa.me/6281234567890?text=${encoded}`;
}

export function openDataSurabayaLink(): string {
  return "https://opendata.surabaya.go.id/organisasi/dlh";
}

export function bmkgLink(): string {
  return "https://data.bmkg.go.id/prakiraan-cuaca/";
}

export function dlhSurabayaLink(): string {
  return "https://lh.surabaya.go.id/weblh/index.php?c=main&m=ecocampus";
}
