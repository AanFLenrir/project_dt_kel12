"use client";

import { useState, useMemo } from "react";
import {
  LuSearch,
  LuPlus,
  LuMapPin,
  LuBuilding2,
  LuX,
} from "react-icons/lu";
import { AdminShell } from "@/components/layouts/admin-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  SURABAYA_WASTE_FACILITIES,
  type WasteFacility,
} from "@/lib/environmental-data";

export function AdminFacilitiesView() {
  const [facilities, setFacilities] = useState<WasteFacility[]>(() => [
    ...SURABAYA_WASTE_FACILITIES,
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("Semua");

  // Add facility modal state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<WasteFacility["type"]>("TPS-3R");
  const [newDistrict, setNewDistrict] = useState("Rungkut");
  const [newAddress, setNewAddress] = useState("");
  const [newCapacity, setNewCapacity] = useState("20");

  const typeOptions = ["Semua", "TPS", "TPS-3R", "Bank Sampah Induk", "Rumah Kompos", "TPA Benowo"];

  const filteredFacilities = useMemo(() => {
    return facilities.filter((f) => {
      const matchType = typeFilter === "Semua" || f.type === typeFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.district.toLowerCase().includes(q) ||
        f.address.toLowerCase().includes(q);
      return matchType && matchSearch;
    });
  }, [facilities, typeFilter, searchQuery]);

  function handleAddFacility() {
    if (!newName.trim() || !newAddress.trim()) {
      alert("Harap lengkapi nama dan alamat fasilitas.");
      return;
    }

    const newFac: WasteFacility = {
      id: `fac-${Date.now()}`,
      name: newName,
      type: newType,
      district: newDistrict,
      address: newAddress,
      coordinates: { lat: -7.3000, lng: 112.7500 },
      capacityTonPerDay: parseFloat(newCapacity) || 15,
      currentLoadPercentage: 45,
      status: "Normal",
      services: ["Pencacahan Sampah", "Komposting Mandiri"],
    };

    setFacilities([newFac, ...facilities]);
    setIsAddOpen(false);
    setNewName("");
    setNewAddress("");
  }

  return (
    <AdminShell
      title="Manajemen Fasilitas Persampahan Surabaya"
      description="Direktori Tempat Penampungan Sementara (TPS), TPS-3R, Bank Sampah Induk, Rumah Kompos, dan PSEL TPA Benowo."
    >
      <div className="space-y-6">
        {/* Top Actions & Filters */}
        <Card className="border-border/80 bg-panel p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative min-w-[240px]">
              <LuSearch className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari fasilitas / alamat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-panel-secondary/50 py-2 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-emerald focus:outline-none"
              />
            </div>

            {/* Filter Type */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">Tipe:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="rounded-lg border border-border bg-panel-secondary/50 py-2 px-2.5 text-xs text-foreground focus:border-emerald focus:outline-none"
              >
                {typeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button
            type="button"
            variant="emerald"
            size="sm"
            onClick={() => setIsAddOpen(true)}
            className="w-full sm:w-auto gap-1.5"
          >
            <LuPlus className="size-4" />
            <span>Tambah Fasilitas (Simulasi)</span>
          </Button>
        </Card>

        {/* Master Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFacilities.map((fac) => (
            <Card
              key={fac.id}
              className="border-border/80 bg-panel p-5 space-y-4 hover:border-emerald/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Badge variant="cyan" className="text-[10px] mb-1.5">{fac.type}</Badge>
                    <h3 className="text-sm font-bold text-foreground">{fac.name}</h3>
                  </div>
                  <Badge
                    variant={
                      fac.status === "Normal"
                        ? "ispu-baik"
                        : fac.status === "Mendekati Kapasitas"
                          ? "ispu-sedang"
                          : "ispu-sangat-tidak-sehat"
                    }
                    className="text-[10px]"
                  >
                    {fac.status}
                  </Badge>
                </div>

                <p className="mt-2 text-xs text-muted-foreground flex items-start gap-1.5">
                  <LuMapPin className="size-3.5 text-emerald shrink-0 mt-0.5" />
                  <span>{fac.address} (Kec. {fac.district})</span>
                </p>

                <div className="mt-4 rounded-xl border border-border/70 bg-panel-secondary/50 p-3 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kapasitas Maksimal:</span>
                    <strong className="text-foreground">{fac.capacityTonPerDay} Ton/Hari</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Beban Saat Ini:</span>
                    <span className="font-semibold text-emerald">{fac.currentLoadPercentage}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-panel overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald"
                      style={{ width: `${fac.currentLoadPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-border/50 pt-3">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                  Layanan & Operasi:
                </span>
                <div className="flex flex-wrap gap-1">
                  {fac.services.map((s, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-panel-secondary px-2 py-0.5 text-[10px] text-foreground/80 border border-border/60"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal Tambah Fasilitas */}
        {isAddOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
            <Card className="w-full max-w-lg border-border/90 bg-panel p-6 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-emerald/15 text-emerald">
                    <LuBuilding2 className="size-4" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">
                    Tambah Data Fasilitas Persampahan (Simulasi)
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddOpen(false)}
                  className="rounded-lg p-1 text-muted-foreground hover:bg-panel-secondary hover:text-foreground"
                >
                  <LuX className="size-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <Field id="fac-name" label="Nama Fasilitas">
                  <Input
                    id="fac-name"
                    placeholder="Contoh: TPS-3R Rungkut Asri Pratama"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field id="fac-type" label="Jenis Fasilitas">
                    <Select
                      id="fac-type"
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as WasteFacility["type"])}
                    >
                      <option value="TPS">TPS</option>
                      <option value="TPS-3R">TPS-3R</option>
                      <option value="Bank Sampah Induk">Bank Sampah Induk</option>
                      <option value="Rumah Kompos">Rumah Kompos</option>
                    </Select>
                  </Field>

                  <Field id="fac-district" label="Kecamatan">
                    <Input
                      id="fac-district"
                      value={newDistrict}
                      onChange={(e) => setNewDistrict(e.target.value)}
                    />
                  </Field>
                </div>

                <Field id="fac-address" label="Alamat Fasilitas">
                  <Input
                    id="fac-address"
                    placeholder="Jl. Raya Rungkut Asri No. 12"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                  />
                </Field>

                <Field id="fac-cap" label="Kapasitas Harian (Ton/Hari)">
                  <Input
                    id="fac-cap"
                    type="number"
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(e.target.value)}
                  />
                </Field>
              </div>

              <div className="flex justify-end gap-2 border-t border-border/50 pt-4">
                <Button variant="outline" size="sm" onClick={() => setIsAddOpen(false)}>
                  Batal
                </Button>
                <Button variant="emerald" size="sm" onClick={handleAddFacility}>
                  Simpan Fasilitas
                </Button>
              </div>
            </Card>
          </div>
        ) : null}
      </div>
    </AdminShell>
  );
}
