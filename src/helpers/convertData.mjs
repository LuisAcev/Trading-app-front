// convertir.mjs  →  ejecútalo desde la raíz del proyecto: node convertir.mjs
import fs from "fs";
import path from "path";

const BASE = "public/assetsData/contracts";

const aTime = (dt) => {
  const [d, t] = dt.split(" ");
  return (
    Date.UTC(
      +d.slice(0, 4), +d.slice(4, 6) - 1, +d.slice(6, 8),
      +t.slice(0, 2), +t.slice(2, 4), +t.slice(4, 6)
    ) / 1000
  );
};

for (const carpeta of fs.readdirSync(BASE)) {
  const dir = path.join(BASE, carpeta);
  if (!fs.statSync(dir).isDirectory()) continue;

  for (const archivo of fs.readdirSync(dir).filter((f) => f.endsWith(".txt"))) {
    const lineas = fs.readFileSync(path.join(dir, archivo), "utf-8").split("\n");
    const porTiempo = new Map(); // evita tiempos duplicados

    for (const linea of lineas) {
      if (!linea.trim()) continue;
      const [dt, o, h, l, c, v] = linea.trim().split(";");
      if (!v) continue;
      const time = aTime(dt);
      porTiempo.set(time, { time, o: +o, h: +h, l: +l, c: +c, v: +v });
    }

    // Lightweight Charts exige tiempos únicos y en orden ascendente
    const filas = [...porTiempo.values()].sort((a, b) => a.time - b.time);

    const candles = filas.map(({ time, o, h, l, c }) => ({
      time, open: o, high: h, low: l, close: c,
    }));
    const volumes = filas.map(({ time, v }) => ({ time, value: v }));

    const salida = path.join(dir, archivo.replace(/\s+/g, "-").replace(".txt", ".json"));
    fs.writeFileSync(salida, JSON.stringify({ candles, volumes }));
    console.log("OK", salida, candles.length, "velas");
  }
}