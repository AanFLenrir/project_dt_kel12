import Link from "next/link";
import { LuWind, LuCloudSun, LuTrash2, LuMap, LuArrowRight } from "react-icons/lu";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layouts/section";
import { Card } from "@/components/ui/card";
import { home } from "@/content/home";

const featureIcons = [LuWind, LuCloudSun, LuTrash2, LuMap];

export function HomeFeatures() {
  return (
    <Section className="py-14">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {home.features.title}
          </h2>
          <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
            {home.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {home.features.items.map((item, idx) => {
            const Icon = featureIcons[idx];
            return (
              <Card
                key={item.href}
                className="group flex flex-col justify-between border-border/80 bg-panel p-6 transition-all duration-200 hover:border-emerald/40 hover:shadow-md"
              >
                <div>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-panel-secondary text-emerald border border-border/80 group-hover:scale-105 transition-transform">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-border/40">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald hover:text-emerald/80 transition-colors"
                  >
                    <span>{item.cta}</span>
                    <LuArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
