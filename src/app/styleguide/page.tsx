import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { LinkButton } from '@/components/ui/link-button'

export function generateMetadata(): Metadata {
  return {
    title: 'Styleguide',
    description: 'Tokens et composants du design system. Route temporaire, supprimée avant la mise en ligne.',
    robots: { index: false, follow: false },
  }
}

const PALETTE = [
  { nom: 'nuit', hex: '#1D3250', classe: 'bg-nuit', role: 'Encre, surfaces sombres, anneau de focus' },
  { nom: 'jaune', hex: '#FFDE59', classe: 'bg-jaune', role: 'Accent : fonds de CTA, puces, libellés sur nuit' },
  { nom: 'noir', hex: '#000000', classe: 'bg-noir', role: 'Texte sur jaune, bordure du bouton primaire' },
  { nom: 'blanc', hex: '#FFFFFF', classe: 'bg-blanc ring-1 ring-trait', role: 'Fond de page, surfaces' },
  { nom: 'gris', hex: '#F3F3F3', classe: 'bg-gris', role: 'Fond de section alterné, état désactivé' },
  { nom: 'ardoise', hex: '#69727D', classe: 'bg-ardoise', role: 'Texte secondaire, mentions légales, bordures' },
  { nom: 'creme', hex: '#FFF8E4', classe: 'bg-creme ring-1 ring-trait', role: 'Fond des blocs d’ouverture' },
]

const ECHELLE = [
  { classe: 'text-display font-black italic', tag: 'display · clamp(32 → 56 px) · 900 italique', exemple: 'Choisis le bon guide.' },
  { classe: 'text-h2 font-black italic', tag: 'h2 · clamp(24 → 36 px) · 900 italique', exemple: 'Ce que tu y trouves' },
  { classe: 'text-h3 font-black', tag: 'h3 · clamp(20 → 24 px) · 900', exemple: 'Semaine SOS Express' },
  { classe: 'text-lede', tag: 'lede · clamp(17 → 20 px) · 400', exemple: 'Pour les hommes de 35 à 55 ans qui ont un travail, des enfants, et vingt minutes.' },
  { classe: 'text-body', tag: 'body · clamp(17 → 18 px) · 400', exemple: 'Pas besoin de télécharger six PDF au hasard pour ne jamais les ouvrir.' },
  { classe: 'text-small text-ardoise', tag: 'small · 15 px — plancher du site', exemple: 'Offert. Reçu par email. Sans spam.' },
  { classe: 'text-chip font-bold uppercase', tag: 'chip · 13 px · 700 · +0,08em', exemple: 'Semaines SOS' },
]

function Bloc({ titre, sous, children }: { titre: string; sous?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-5 border-t border-trait py-section">
      <div className="flex flex-col gap-2">
        <h2 className="text-h2 font-black italic">{titre}</h2>
        {sous ? <p className="text-small max-w-prose text-ardoise">{sous}</p> : null}
      </div>
      {children}
    </section>
  )
}

export default function StyleguidePage() {
  return (
    <main id="contenu" className="site-container py-section">
      <header className="flex flex-col gap-4 pb-section">
        <span className="text-chip w-fit rounded-pill bg-jaune px-3.5 py-1.5 font-bold uppercase text-noir">
          Route temporaire
        </span>
        <h1 className="text-display font-black italic">Styleguide</h1>
        <p className="text-lede max-w-prose">
          Tokens et composants du design system. Palette et typographie reprises du site existant.
          Cette route est supprimée avant la mise en ligne.
        </p>
      </header>

      <Bloc
        titre="Palette"
        sous="Le jaune ne passe jamais en texte sur fond clair : 1,3:1. Il est fond, ou il n’est pas."
      >
        <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {PALETTE.map((c) => (
            <li key={c.nom} className="flex flex-col gap-3 rounded-card border border-trait p-4 shadow-card">
              <span className={`h-16 w-full rounded-field ${c.classe}`} />
              <span className="flex flex-col gap-1">
                <span className="text-h3 font-black">{c.nom}</span>
                <span className="text-small font-bold tabular-nums">{c.hex}</span>
                <span className="text-small text-ardoise">{c.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </Bloc>

      <Bloc titre="Typographie" sous="DM Sans auto-hébergée, deux fichiers variables, trois graisses : 400, 700, 900.">
        <div className="flex flex-col gap-6 rounded-card border border-trait p-5 shadow-card sm:p-6">
          {ECHELLE.map((t) => (
            <div key={t.tag} className="flex flex-col gap-1">
              <span className="text-chip font-bold uppercase text-ardoise">{t.tag}</span>
              <span className={t.classe}>{t.exemple}</span>
            </div>
          ))}
        </div>
      </Bloc>

      <Bloc titre="Boutons" sous="Cible tactile de 56 px. Trois variantes, plus l’état désactivé et le focus clavier.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <span className="text-chip font-bold uppercase text-ardoise">primary</span>
            <Button variant="primary">Recevoir mon guide</Button>
          </div>
          <div className="flex flex-col gap-2 rounded-card bg-nuit p-4">
            <span className="text-chip font-bold uppercase text-jaune">secondary · sur nuit</span>
            <Button variant="secondary">Recevoir SOS Express</Button>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-chip font-bold uppercase text-ardoise">outline</span>
            <Button variant="outline">Voir les six guides</Button>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-chip font-bold uppercase text-ardoise">désactivé</span>
            <Button variant="primary" disabled>
              Recevoir mon guide
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-chip font-bold uppercase text-ardoise">
            lien stylé en bouton — tabule jusqu’ici pour voir l’anneau de focus
          </span>
          <LinkButton href="/styleguide" variant="primary" fullWidth={false} className="w-fit">
            Trouver mon guide gratuit
          </LinkButton>
        </div>
      </Bloc>

      <Bloc
        titre="Champs"
        sous="L’erreur se signale par un trait noir, un libellé en gras et un texte qui dit quoi faire. Aucune couleur d’alerte : rien ici n’est un échec."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Field id="sg-prenom" label="Prénom" hint="Il sert uniquement à personnaliser l’email.">
            {(a) => <Input type="text" autoComplete="given-name" placeholder="Julien" {...a} />}
          </Field>

          <Field
            id="sg-email"
            label="Email"
            error="Il manque la fin de l’adresse. Ajoute ce qui vient après le @, par exemple gmail.com."
          >
            {(a) => <Input type="email" autoComplete="email" defaultValue="julien@exemple" {...a} />}
          </Field>

          <Field id="sg-tel" label="Téléphone" optional>
            {(a) => <Input type="tel" autoComplete="tel" placeholder="06 12 34 56 78" {...a} />}
          </Field>

          <Field id="sg-off" label="Champ désactivé">
            {(a) => <Input type="text" defaultValue="Non modifiable" disabled {...a} />}
          </Field>
        </div>

        <div className="flex flex-col gap-4 rounded-card border border-trait p-5 shadow-card">
          <Checkbox id="sg-news">
            Recevoir aussi la lettre du lundi. Une fois par semaine, désinscription en un clic.
          </Checkbox>
          <Checkbox id="sg-news-on" defaultChecked>
            État coché.
          </Checkbox>
          <Checkbox id="sg-news-off" disabled>
            État désactivé.
          </Checkbox>
        </div>
      </Bloc>

      <Bloc titre="Assemblage" sous="Le formulaire de capture, tel qu’il sera posé en page guide.">
        <form className="flex max-w-prose flex-col gap-5 rounded-card border-2 border-nuit p-5 sm:p-6">
          <h3 className="text-h2 font-black italic">Reçois-le maintenant</h3>

          <Field id="sg-f-prenom" label="Prénom" required>
            {(a) => <Input type="text" autoComplete="given-name" {...a} />}
          </Field>

          <Field id="sg-f-email" label="Email" required>
            {(a) => <Input type="email" autoComplete="email" {...a} />}
          </Field>

          <Checkbox id="sg-f-news" name="newsletter">
            Recevoir aussi la lettre du lundi. Une fois par semaine, désinscription en un clic.
          </Checkbox>

          <p className="text-small text-ardoise">
            Ton prénom et ton email servent à t’envoyer ce guide.{' '}
            <a className="font-bold text-nuit underline underline-offset-4" href="/politique-de-confidentialite">
              Politique de confidentialité
            </a>
          </p>

          <Button type="submit" variant="primary">
            Recevoir SOS Express
          </Button>
        </form>
      </Bloc>
    </main>
  )
}
