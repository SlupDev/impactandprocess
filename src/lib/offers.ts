/**
 * Les trois portes d’entrée du site, dans l’ordre où elles sont présentées
 * partout : programme en autonomie, accompagnement premium, guides gratuits.
 * Une seule source, sinon les prix finissent par diverger d’une page à l’autre.
 */
export interface Offer {
  id: string
  emoji: string
  titre: string
  texte: string
  prix: string
  href: string
  best: boolean
  details: string[]
}

export const OFFERS: readonly Offer[] = [
  {
    id: 'hybrid-fat-burner',
    emoji: '🔥',
    titre: 'Programmes Hybrid Fat Burner',
    texte:
      'Programmes d’entraînement automatiques sur 90 jours. Choisis ton niveau, ton environnement (maison ou salle), puis suis un plan clair en autonomie.',
    prix: 'À partir de 49 €',
    href: '/services#hybrid-fat-burner',
    best: false,
    details: [
      'Un plan de 90 jours découpé en blocs progressifs',
      'Deux environnements au choix : maison ou salle',
      'Trois niveaux, du retour au sport au pratiquant régulier',
      'Repères nutritionnels simples, sans pesée obligatoire',
    ],
  },
  {
    id: 'protocole-virage',
    emoji: '🎯',
    titre: 'Protocole Virage',
    texte:
      'Accompagnement premium sur 90 jours avec entraînement et nutrition sur-mesure, suivi WhatsApp 7 j/7, bilans réguliers, et ajustements personnalisés selon ton quotidien.',
    prix: '990 € / 90 jours',
    href: '/services#protocole-virage',
    best: true,
    details: [
      'Bilan complet : sport, nutrition, sommeil, contraintes professionnelles',
      'Programmation sur-mesure, ajustée en continu',
      'Contact WhatsApp direct 7 j/7',
      'Bilan visio régulier de suivi et de recadrage',
    ],
  },
  {
    id: 'guides-gratuits',
    emoji: '📖',
    titre: 'Guides gratuits',
    texte:
      'Guides gratuits pour t’aider à reprendre un cadre : Semaines SOS, perte de masse grasse, 4 piliers, fêtes, et nutrition pratique.',
    prix: 'Gratuit',
    href: '/guides',
    best: false,
    details: [
      'Six PDF courts, applicables dès le soir même',
      'Reçus par email en moins d’une minute',
      'Sans carte bancaire, désinscription en un clic',
    ],
  },
]
