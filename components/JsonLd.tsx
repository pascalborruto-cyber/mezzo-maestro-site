/**
 * Injection des données structurées.
 *
 * Le JSON est sérialisé puis échappé : `<` est remplacé par sa séquence
 * Unicode afin qu’aucune valeur ne puisse fermer prématurément la balise.
 */
type JsonLdProps = {
  /** Un ou plusieurs graphes JSON-LD. Les tableaux vides ne produisent rien. */
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  const graphes = Array.isArray(data) ? data : [data];
  if (graphes.length === 0) return null;

  return (
    <>
      {graphes.map((graphe, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(graphe).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
