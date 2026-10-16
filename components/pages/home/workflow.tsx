import Link from "next/link";
import { LuCamera, LuBrainCircuit, LuTruck, LuCircleCheck, LuArrowRight } from "react-icons/lu";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layouts/section";
import { Card } from "@/components/ui/card";
import { home } from "@/content/home";

const icons = [LuCamera, LuBrainCircuit, LuTruck, LuCircleCheck];

export function HomeWorkflow() {
  return (
    <Section className="py-14 bg-panel-secondary/30 border-t border-border/60">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {home.workflow.title}
          </h2>
          <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
            {home.workflow.subtitle}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {home.workflow.steps.map((step, idx) => {
            const Icon = icons[idx];
            return (
              <Card
                key={step.number}
                className="relative flex flex-col justify-between border-border/80 bg-panel/80 p-6 transition-all hover:border-emerald/40 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-emerald/40">
                      {step.number}
                    </span>
                    <div className="flex size-10 items-center justify-center rounded-xl bg-panel-secondary text-emerald border border-border/70">
                      <Icon className="size-5" />
                    </div>
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/40 text-[10px] text-emerald font-semibold uppercase tracking-wider">
                  Tahap {step.number}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-emerald/30 bg-emerald/5 p-5">
          <div>
            <h4 className="text-sm font-bold text-foreground">
              Menemukan Permasalahan Lingkungan di Sekitar Anda?
            </h4>
            <p className="text-xs text-muted-foreground">
              Laporkan tumpukan sampah liar, pembakaran terbuka, atau pencemaran saluran air sekarang juga.
            </p>
          </div>
          <Link
            href="/lapor"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-emerald px-4 py-2 text-xs font-semibold text-background shadow-xs hover:bg-emerald/90 transition-all"
          >
            <span>Buka Formulir Lapor</span>
            <LuArrowRight className="size-3.5" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
