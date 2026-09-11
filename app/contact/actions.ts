"use server";

/**
 * Traitement du formulaire de demande de programmation.
 *
 * Le formulaire est une véritable action serveur : il fonctionne sans
 * JavaScript côté client (soumission HTML classique) et n’est qu’amélioré
 * lorsque celui-ci est disponible.
 *
 * ┌───────────────────────────────────────────────────────────────────────────┐
 * │  A_COMPLETER — acheminement des messages                                  │
 * │  Tant qu’aucun canal n’est configuré, l’action ne prétend PAS avoir       │
 * │  envoyé le message : elle répond explicitement que le formulaire n’est    │
 * │  pas encore raccordé. Configurer l’un des deux canaux avant publication : │
 * │                                                                           │
 * │   • CONTACT_WEBHOOK_URL — URL recevant la demande en JSON                 │
 * │     (formulaire hébergé, automatisation, service interne…)                │
 * │   • RESEND_API_KEY + CONTACT_TO_EMAIL + CONTACT_FROM_EMAIL — envoi        │
 * │     direct par courriel via l’API Resend (https://resend.com).            │
 * └───────────────────────────────────────────────────────────────────────────┘
 *
 * Seules des fonctions asynchrones peuvent être exportées d’ici : les
 * constantes et les types sont dans `formulaire.ts`.
 */

import { CHAMPS, valider, type EtatFormulaire } from "./formulaire";

const lire = (donnees: FormData, champ: string) => String(donnees.get(champ) ?? "").trim();

/** Achemine la demande. Renvoie `false` si aucun canal n’est configuré. */
async function acheminer(valeurs: Record<string, string>): Promise<boolean> {
  const webhook = process.env.CONTACT_WEBHOOK_URL?.trim();
  const cleResend = process.env.RESEND_API_KEY?.trim();
  const destinataire = process.env.CONTACT_TO_EMAIL?.trim();
  const expediteur = process.env.CONTACT_FROM_EMAIL?.trim();

  if (webhook) {
    const reponse = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ source: "site mezzo-maestro", ...valeurs }),
    });
    if (!reponse.ok) throw new Error(`Webhook en erreur : ${reponse.status}`);
    return true;
  }

  if (cleResend && destinataire && expediteur) {
    const corps = CHAMPS.filter((champ) => valeurs[champ])
      .map((champ) => `${champ} : ${valeurs[champ]}`)
      .join("\n");

    const reponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${cleResend}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: expediteur,
        to: [destinataire],
        reply_to: valeurs.email,
        subject: `[Site] ${valeurs.typeDemande || "Demande"} — ${valeurs.structure}`,
        text: corps,
      }),
    });
    if (!reponse.ok) throw new Error(`Resend en erreur : ${reponse.status}`);
    return true;
  }

  return false;
}

export async function envoyerDemande(
  _etatPrecedent: EtatFormulaire,
  donnees: FormData,
): Promise<EtatFormulaire> {
  const valeurs = Object.fromEntries(CHAMPS.map((champ) => [champ, lire(donnees, champ)]));

  // Piège à robots : ce champ est masqué, seul un automate le remplit.
  if (lire(donnees, "siteWeb") !== "") {
    return {
      statut: "succes",
      message: "Merci, votre message a bien été transmis.",
      erreurs: {},
      valeurs: {},
    };
  }

  const erreurs = valider(valeurs);
  if (Object.keys(erreurs).length > 0) {
    return {
      statut: "erreur",
      message: "Le formulaire comporte des erreurs. Corrigez les champs signalés puis renvoyez-le.",
      erreurs,
      valeurs,
    };
  }

  try {
    const achemine = await acheminer(valeurs);

    if (!achemine) {
      return {
        statut: "non-configure",
        message:
          "Le formulaire n’est pas encore raccordé à une boîte de réception : votre message n’a pas été envoyé. " +
          "Merci d’utiliser pour l’instant les coordonnées indiquées sur cette page.",
        erreurs: {},
        valeurs,
      };
    }

    return {
      statut: "succes",
      message:
        "Merci, votre demande est bien partie. Une réponse vous parviendra dans les meilleurs délais.",
      erreurs: {},
      valeurs: {},
    };
  } catch {
    return {
      statut: "erreur",
      message:
        "L’envoi a échoué pour une raison technique. Réessayez dans un instant, ou écrivez directement à l’adresse indiquée sur cette page.",
      erreurs: {},
      valeurs,
    };
  }
}
