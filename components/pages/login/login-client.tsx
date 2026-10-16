"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LuShieldCheck,
  LuUser,
  LuKeyRound,
  LuSparkles,
  LuArrowRight,
  LuLeaf,
} from "react-icons/lu";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layouts/section";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginView() {
  const router = useRouter();
  const [email, setEmail] = useState("admin.dlh@wasiasri.sby.id");
  const [password, setPassword] = useState("••••••••");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  function handleLogin(roleTarget: string, path: string) {
    setIsLoading(true);
    setFeedback(`Memproses masuk sebagai ${roleTarget}...`);
    setTimeout(() => {
      router.push(path);
    }, 700);
  }

  return (
    <Section className="py-14 sm:py-20 flex flex-col items-center justify-center min-h-[calc(100vh-14rem)]">
      <Container className="max-w-md">
        <Card className="border-border/80 bg-panel/95 p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-md">
          {/* Logo & Title */}
          <div className="text-center space-y-2">
            <div className="flex size-12 mx-auto items-center justify-center rounded-2xl bg-emerald text-background font-black shadow-md shadow-emerald/20">
              <LuLeaf className="size-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Portal Masuk WASI ASRI
            </h1>
            <p className="text-xs text-muted-foreground">
              Environmental Intelligence Command Center
            </p>
          </div>

          {/* Academic Demo Disclaimer Banner */}
          <div className="rounded-xl border border-cyan/30 bg-cyan/5 p-3.5 text-xs text-muted-foreground space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-foreground">
              <LuShieldCheck className="size-3.5 text-cyan" />
              <span>Simulasi Autentikasi Pengujian</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Login ini disiapkan untuk kemudahan evaluasi penguji/dosen. Anda dapat menggunakan tombol <strong>Masuk Demo Sekali Klik</strong> di bawah untuk langsung mengakses Command Center tanpa perlu registrasi manual.
            </p>
          </div>

          {feedback ? (
            <div className="flex items-center gap-2 rounded-lg bg-emerald/15 p-3 text-xs text-emerald border border-emerald/30 font-medium">
              <LuSparkles className="size-4 shrink-0" />
              <span>{feedback}</span>
            </div>
          ) : null}

          {/* Manual Form (for realism) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin("Administrator DLH", "/admin");
            }}
            className="space-y-4 text-left"
          >
            <Field id="login-email" label="Alamat Email / NIK">
              <div className="relative">
                <LuUser className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <Input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 text-xs"
                  placeholder="admin.dlh@wasiasri.sby.id"
                />
              </div>
            </Field>

            <Field id="login-password" label="Kata Sandi">
              <div className="relative">
                <LuKeyRound className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <Input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 text-xs"
                />
              </div>
            </Field>

            <Button
              type="submit"
              variant="emerald"
              size="md"
              disabled={isLoading}
              className="w-full text-xs font-bold"
            >
              {isLoading ? "Mengalihkan..." : "Masuk ke Dashboard"}
            </Button>
          </form>

          {/* 1-Click Role Switchers */}
          <div className="border-t border-border/60 pt-4 space-y-2">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-center">
              Pilihan Akun Uji Coba Demo:
            </p>

            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => handleLogin("Administrator DLH Surabaya", "/admin")}
                className="w-full flex items-center justify-between rounded-lg border border-emerald/40 bg-emerald/5 p-2.5 text-xs text-left hover:bg-emerald/10 transition-colors cursor-pointer"
              >
                <div>
                  <p className="font-bold text-foreground">1. Admin Komando DLH Surabaya</p>
                  <p className="text-[10px] text-muted-foreground">Akses penuh ke seluruh 10 modul dashboard</p>
                </div>
                <LuArrowRight className="size-4 text-emerald" />
              </button>

              <button
                type="button"
                onClick={() => handleLogin("Satgas Lapangan", "/admin/laporan")}
                className="w-full flex items-center justify-between rounded-lg border border-border bg-panel-secondary/50 p-2.5 text-xs text-left hover:bg-panel-secondary transition-colors cursor-pointer"
              >
                <div>
                  <p className="font-bold text-foreground">2. Petugas Satgas Lapangan</p>
                  <p className="text-[10px] text-muted-foreground">Fokus verifikasi tiket aduan warga & bukti penanganan</p>
                </div>
                <LuArrowRight className="size-4 text-cyan" />
              </button>
            </div>
          </div>

          <div className="text-center pt-1">
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-emerald transition-colors"
            >
              ← Kembali ke Beranda Utama
            </Link>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
