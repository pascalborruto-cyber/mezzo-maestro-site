"use client";

import { useActionState, useId } from "react";

import { envoyerDemande } from "./actions";
import { ETAT_INITIAL, TYPES_DEMANDE } from "./formulaire";

type ChampProps = {
  nom: string;
  label: string;
  type?: "text" | "email" | "tel";
  requis?: boolean;
  aide?: string;
  autoComplete?: string;
  erreur?: string;
  valeurParDefaut?: string;
};

function Champ({
  nom,
  label,
  type = "text",
  requis = false,
  aide,
  autoComplete,
  erreur,
  valeurParDefaut,
}: ChampProps) {
  const idAide = aide ? `${nom}-aide` : undefined;
  const idErreur = erreur ? `${nom}-erreur` : undefined;
  const decrit = [idAide, idErreur].filter(Boolean).join(" ") || undefined;

  return (
    <div className="champ">
      <label htmlFor={nom}>
        {label}
        {requis ? <span aria-hidden="true"> *</span> : null}
        {aide ? (
          <span className="champ__aide" id={idAide}>
            {" "}
            — {aide}
          </span>
        ) : null}
      </label>
      <input
        id={nom}
        name={nom}
        type={type}
        required={requis}
        autoComplete={autoComplete}
        aria-invalid={erreur ? true : undefined}
        aria-describedby={decrit}
        defaultValue={valeurParDefaut}
      />
      {erreur ? (
        <span className="champ__erreur" id={idErreur}>
          {erreur}
        </span>
      ) : null}
    </div>
  );
}

export function FormulaireContact() {
  const [etat, action, enCours] = useActionState(envoyerDemande, ETAT_INITIAL);
  const idStatut = useId();
  const valeurs = etat.valeurs;

  return (
    <form className="formulaire" action={action} noValidate>
      {/* Zone de statut : annoncée aux lecteurs d’écran à chaque réponse. */}
      <div aria-live="polite" role="status" id={idStatut}>
        {etat.statut !== "initial" && etat.message ? (
          <div
            className={`message-etat message-etat--${
              etat.statut === "succes" ? "succes" : etat.statut === "erreur" ? "erreur" : "info"
            }`}
          >
            <p>{etat.message}</p>
          </div>
        ) : null}
      </div>

      <fieldset>
        <legend>Votre structure</legend>
        <Champ
          nom="structure"
          label="Structure"
          requis
          aide="théâtre, mairie, festival, association…"
          autoComplete="organization"
          erreur={etat.erreurs.structure}
          valeurParDefaut={valeurs.structure}
        />
        <div className="champ--paire">
          <Champ
            nom="nom"
            label="Votre nom"
            requis
            autoComplete="name"
            erreur={etat.erreurs.nom}
            valeurParDefaut={valeurs.nom}
          />
          <Champ
            nom="fonction"
            label="Votre fonction"
            autoComplete="organization-title"
            valeurParDefaut={valeurs.fonction}
          />
        </div>
        <div className="champ--paire">
          <Champ
            nom="email"
            label="Adresse électronique"
            type="email"
            requis
            autoComplete="email"
            erreur={etat.erreurs.email}
            valeurParDefaut={valeurs.email}
          />
          <Champ
            nom="telephone"
            label="Téléphone"
            type="tel"
            autoComplete="tel"
            valeurParDefaut={valeurs.telephone}
          />
        </div>
        <Champ
          nom="ville"
          label="Ville ou commune"
          autoComplete="address-level2"
          valeurParDefaut={valeurs.ville}
        />
      </fieldset>

      <fieldset>
        <legend>Votre demande</legend>
        <div className="champ">
          <label htmlFor="typeDemande">Objet</label>
          <select id="typeDemande" name="typeDemande" defaultValue={valeurs.typeDemande ?? ""}>
            <option value="">Choisir…</option>
            {TYPES_DEMANDE.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <Champ
          nom="periode"
          label="Période envisagée"
          aide="saison, mois, ou date précise"
          valeurParDefaut={valeurs.periode}
        />

        <div className="champ">
          <label htmlFor="message">
            Message<span aria-hidden="true"> *</span>
            <span className="champ__aide" id="message-aide">
              {" "}
              — type de séance, jauge envisagée, contraintes de lieu…
            </span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={7}
            aria-invalid={etat.erreurs.message ? true : undefined}
            aria-describedby={
              etat.erreurs.message ? "message-aide message-erreur" : "message-aide"
            }
            defaultValue={valeurs.message}
          />
          {etat.erreurs.message ? (
            <span className="champ__erreur" id="message-erreur">
              {etat.erreurs.message}
            </span>
          ) : null}
        </div>
      </fieldset>

      {/* Piège à robots : hors flux et hors arbre d’accessibilité. */}
      <div className="piege" aria-hidden="true">
        <label htmlFor="siteWeb">Ne pas remplir ce champ</label>
        <input id="siteWeb" name="siteWeb" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="legende">
        Les informations transmises servent uniquement à répondre à votre demande. Elles ne sont ni
        revendues, ni utilisées à des fins publicitaires. Les champs marqués d’une astérisque (*)
        sont obligatoires.
      </p>

      <p>
        <button className="bouton bouton--principal" type="submit" disabled={enCours}>
          {enCours ? "Envoi en cours…" : "Envoyer la demande"}
        </button>
      </p>
    </form>
  );
}
