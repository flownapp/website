/**
 * Kartengeometrie wie in der App (src/map/projection.ts, src/domain/geo.ts im App-Repo):
 * Web Mercator in einen quadratischen Weltraum, Großkreis-Bögen per sphärischer Interpolation.
 * Läuft nur beim Build, im Browser kommt fertiges SVG an.
 */
export const WORLD_SIZE = 1024;
const MAX_LAT = 85.0511;
const EARTH_RADIUS_KM = 6371.0088;

export interface Point {
  x: number;
  y: number;
}

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

export function project(lon: number, lat: number): Point {
  const φ = toRad(Math.max(-MAX_LAT, Math.min(MAX_LAT, lat)));
  const x = ((lon + 180) / 360) * WORLD_SIZE;
  const y = ((1 - Math.log(Math.tan(Math.PI / 4 + φ / 2)) / Math.PI) / 2) * WORLD_SIZE;
  return { x, y };
}

/** Großkreis-Distanz nach Haversine, in Kilometern. */
export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(a)));
}

/** Punkte entlang des Großkreises von A nach B als [lon, lat]; mehr Stützpunkte für längere Strecken. */
export function greatCirclePoints(lat1: number, lon1: number, lat2: number, lon2: number, minSteps = 16): [number, number][] {
  const φ1 = toRad(lat1);
  const λ1 = toRad(lon1);
  const φ2 = toRad(lat2);
  const λ2 = toRad(lon2);
  const a = [Math.cos(φ1) * Math.cos(λ1), Math.cos(φ1) * Math.sin(λ1), Math.sin(φ1)];
  const b = [Math.cos(φ2) * Math.cos(λ2), Math.cos(φ2) * Math.sin(λ2), Math.sin(φ2)];
  const dot = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const ω = Math.acos(dot);
  if (ω < 1e-9) return [[lon1, lat1], [lon2, lat2]];
  const steps = Math.max(minSteps, Math.ceil(toDeg(ω) / 2));
  const sinω = Math.sin(ω);
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const s1 = Math.sin((1 - t) * ω) / sinω;
    const s2 = Math.sin(t * ω) / sinω;
    const x = s1 * a[0] + s2 * b[0];
    const y = s1 * a[1] + s2 * b[1];
    const z = s1 * a[2] + s2 * b[2];
    pts.push([toDeg(Math.atan2(y, x)), toDeg(Math.atan2(z, Math.sqrt(x * x + y * y)))]);
  }
  return pts;
}
