/**
 * Beispielreisen für die Motive auf der Website (Karte, Bordkarte). Keine echten Nutzerdaten.
 * Koordinaten aus der Flughafen-Datenbank der App.
 */
export interface Airport {
  iata: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
}

export const airports = {
  BER: { iata: 'BER', city: 'Berlin', country: 'DE', lat: 52.3667, lon: 13.5033 },
  FRA: { iata: 'FRA', city: 'Frankfurt', country: 'DE', lat: 50.0264, lon: 8.5431 },
  LIS: { iata: 'LIS', city: 'Lissabon', country: 'PT', lat: 38.7813, lon: -9.1359 },
  ATH: { iata: 'ATH', city: 'Athen', country: 'GR', lat: 37.9364, lon: 23.9445 },
  KEF: { iata: 'KEF', city: 'Reykjavík', country: 'IS', lat: 63.985, lon: -22.6056 },
  JFK: { iata: 'JFK', city: 'New York', country: 'US', lat: 40.6398, lon: -73.7789 },
  DOH: { iata: 'DOH', city: 'Doha', country: 'QA', lat: 25.2606, lon: 51.6138 },
  BKK: { iata: 'BKK', city: 'Bangkok', country: 'TH', lat: 13.6811, lon: 100.747 },
} satisfies Record<string, Airport>;

export type Iata = keyof typeof airports;

/** Die geflogenen Strecken. Die mit `highlight` zeichnet sich beim Laden über die Karte. */
export const flights: { from: Iata; to: Iata; highlight?: boolean }[] = [
  { from: 'BER', to: 'LIS' },
  { from: 'BER', to: 'ATH' },
  { from: 'BER', to: 'KEF' },
  { from: 'FRA', to: 'JFK', highlight: true },
  { from: 'BER', to: 'DOH' },
  { from: 'DOH', to: 'BKK' },
];

