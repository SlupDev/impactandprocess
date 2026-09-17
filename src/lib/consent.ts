/**
 * Règle 6 : on enregistre le libellé exact affiché au moment du clic, pas un booléen.
 * Toute modification de ces chaînes doit rester traçable — ne pas les éditer en place
 * sans se demander ce que valent les consentements déjà enregistrés.
 */

export const NEWSLETTER_CONSENT_LABEL =
  'Recevoir aussi la lettre du lundi. Une fois par semaine, désinscription en un clic.'

export const DELIVERY_NOTICE = 'Ton prénom et ton email servent à t’envoyer ce guide.'

export const PRIVACY_LINK_LABEL = 'Politique de confidentialité'

export const CONSENT_VERSION = '2026-08-10'

interface ConsentContext {
  guideTitle: string
  newsletterOptIn: boolean
}

export function buildConsentText({ guideTitle, newsletterOptIn }: ConsentContext): string {
  return [
    `v${CONSENT_VERSION}`,
    `Formulaire « ${guideTitle} »`,
    DELIVERY_NOTICE,
    `${PRIVACY_LINK_LABEL} : lien affiché au point de collecte.`,
    `Case newsletter (décochée par défaut) « ${NEWSLETTER_CONSENT_LABEL} » : ${
      newsletterOptIn ? 'cochée' : 'laissée décochée'
    }.`,
  ].join(' | ')
}
