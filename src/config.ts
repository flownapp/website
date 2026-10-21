/**
 * Name, Tagline und Domain der App – nur hier pflegen, alle Seiten beziehen sie von hier.
 */
const name = 'flown';
const domain = 'flown.kippenberger.me';

export const site = {
  name,
  tagline: 'Deine Flüge auf einer Karte',
  description: `${name} hält deine Flugreisen fest: als Liste, als Routen auf der Weltkarte und in Zahlen. Deine Daten bleiben auf deinem Gerät.`,
  domain,
  url: `https://${domain}`,
  lang: 'de',
  locale: 'de_DE',
  /** TODO: öffentliche Support-Adresse eintragen (keine private Adresse). Solange leer, zeigt /support einen Platzhalter. */
  supportEmail: '' as string,
};
