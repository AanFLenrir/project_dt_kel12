import type { Metadata } from "next";
import { LoginView } from "@/components/pages/login/login-client";

export const metadata: Metadata = {
  title: "Masuk Portal Demo — WASI ASRI",
  description:
    "Akses masuk demonstrasi Environmental Intelligence Command Center WASI ASRI Kota Surabaya.",
};

export default function LoginPage() {
  return <LoginView />;
}
