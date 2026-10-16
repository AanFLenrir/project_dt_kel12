import Link from "next/link";
import { LuShieldAlert, LuWind, LuSparkles } from "react-icons/lu";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layouts/section";
import { Badge } from "@/components/ui/badge";
import { home } from "@/content/home";

export function HomeHero() {
  return (
    <Section className="relative overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-20">
      {/* Background radial ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 flex justify-center overflow-hidden">
        <div className="h-[450px] w-[900px] rounded-full bg-emerald/10 blur-[130px]" />
      </div>

      <Container>
        <div className="mx-auto max-w-3xl text-center space-y-6">
          {/* Eyebrow badge */}
          <div className="flex items-center justify-center gap-2">
            <Badge variant="emerald" className="py-1 px-3 text-xs gap-1.5 shadow-xs">
              <LuSparkles className="size-3 text-emerald" />
              <span>{home.hero.eyebrow}</span>
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl sm:leading-[1.15]">
            {home.hero.title}
          </h1>

          {/* Description */}
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {home.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href={home.hero.primaryAction.href}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald px-6 py-3 text-sm font-semibold text-background shadow-md shadow-emerald/20 transition-all hover:bg-emerald/90 active:scale-98"
            >
              <LuShieldAlert className="size-4" />
              <span>{home.hero.primaryAction.label}</span>
            </Link>

            <Link
              href={home.hero.secondaryAction.href}
              className="inline-flex items-center gap-2 rounded-xl border border-border/90 bg-panel px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-panel-secondary hover:border-emerald/40 active:scale-98"
            >
              <LuWind className="size-4 text-emerald" />
              <span>{home.hero.secondaryAction.label}</span>
            </Link>
          </div>

          {/* Provenance note */}
          <p className="text-[11px] text-muted-foreground/80 pt-1">
            Data Terbuka DLH Kota Surabaya • BMKG Perak & Juanda • Permen LHK No. 14 Tahun 2020
          </p>
        </div>
      </Container>
    </Section>
  );
}
