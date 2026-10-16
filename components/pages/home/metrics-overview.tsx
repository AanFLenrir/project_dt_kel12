import { LuWind, LuThermometer, LuDroplets, LuClipboardCheck } from "react-icons/lu";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layouts/section";
import { StatCard } from "@/components/ui/stat-card";
import { IspuGaugeMeter, AreaChartCard } from "@/components/ui/chart-components";
import { SURABAYA_HISTORICAL_ISPU } from "@/lib/environmental-data";
import { home } from "@/content/home";

export function HomeMetricsOverview() {
  return (
    <Section className="py-8 bg-panel-secondary/30 border-y border-border/60">
      <Container>
        <div className="mb-6 space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {home.metricsSummary.title}
          </h2>
          <p className="text-xs text-muted-foreground">
            {home.metricsSummary.subtitle}
          </p>
        </div>

        {/* 4 Key Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Indeks Kualitas Udara (ISPU)"
            value="66"
            unit="Skala 1-300"
            description="Kategori Sedang. Aman untuk sebagian besar aktivitas masyarakat."
            icon={<LuWind className="size-5" />}
            trend={{ value: "PM2.5", isPositive: true, label: "Parameter Kritis" }}
            provenance={{
              source: "Open Data Surabaya (DLH)",
              type: "Aktual",
              lastUpdated: "10:00 WIB",
            }}
            highlightColor="emerald"
          />

          <StatCard
            title="Suhu Udara Surabaya"
            value="32"
            unit="°C"
            description="Kondisi Cerah Berawan. Potensi dispersi polusi normal."
            icon={<LuThermometer className="size-5" />}
            trend={{ value: "Pusat & Timur", isPositive: true, label: "31 - 33 °C" }}
            provenance={{
              source: "BMKG Stasiun Perak II",
              type: "Aktual",
              lastUpdated: "12:00 WIB",
            }}
            highlightColor="cyan"
          />

          <StatCard
            title="Kelembapan Relatif"
            value="72"
            unit="%"
            description="Tingkat kelembapan udara tropis lembap pesisir Surabaya."
            icon={<LuDroplets className="size-5" />}
            trend={{ value: "Normal", isPositive: true, label: "Risiko Inversi Rendah" }}
            provenance={{
              source: "BMKG Data Terbuka",
              type: "Aktual",
              lastUpdated: "12:00 WIB",
            }}
            highlightColor="blue"
          />

          <StatCard
            title="Aduan Lingkungan Warga"
            value="4"
            unit="Aduan"
            description="Aduan tumpukan sampah, pembakaran terbuka, dan saluran air."
            icon={<LuClipboardCheck className="size-5" />}
            trend={{ value: "75%", isPositive: true, label: "Tertangani Satgas" }}
            provenance={{
              source: "WASI ASRI Citizen Store",
              type: "Simulasi",
              lastUpdated: "Hari ini",
            }}
            highlightColor="amber"
          />
        </div>

        {/* Visual Charts Comparison: Gauge + 7-Day Area Trend */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <IspuGaugeMeter
              value={66}
              criticalParam="PM2.5"
              stationName="Rata-rata 3 SPKU Surabaya"
              className="h-full"
            />
          </div>

          <div className="lg:col-span-2">
            <AreaChartCard
              title="Tren Kualitas Udara Mingguan Kota Surabaya"
              subtitle="Pergerakan nilai harian ISPU rata-rata stasiun Wonorejo, Kebonsari, dan Tandes."
              unit="ISPU"
              data={SURABAYA_HISTORICAL_ISPU}
              primaryLabel="ISPU Rata-rata"
              secondaryLabel="Batas Sedang (100)"
              source="Open Data Surabaya (Dataset DLH 2023)"
              className="h-full"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
