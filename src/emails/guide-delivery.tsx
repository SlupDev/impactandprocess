import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

export interface GuideDeliveryEmailProps {
  firstName: string | null
  guideTitle: string
  variantLabel: string | null
  downloadUrl: string
  unsubscribeUrl: string
}

const NUIT = '#1D3250'
const JAUNE = '#FFDE59'
const ARDOISE = '#69727D'

/** Version texte, envoyée en parallèle du HTML : certains clients ne rendent que celle-ci. */
export function guideDeliveryText({
  firstName,
  guideTitle,
  variantLabel,
  downloadUrl,
  unsubscribeUrl,
}: GuideDeliveryEmailProps): string {
  return [
    firstName ? `Salut ${firstName},` : 'Salut,',
    '',
    `Voici « ${guideTitle} »${variantLabel ? ` — version ${variantLabel}` : ''}.`,
    '',
    downloadUrl,
    '',
    'Le lien reste valable sept jours. Passé ce délai, redemande le guide depuis le site,',
    'c’est immédiat.',
    '',
    'Conseils d’hygiène de vie. Ils ne remplacent pas un avis médical ou diététique.',
    '',
    '—',
    'Impact & Process',
    `Se désinscrire : ${unsubscribeUrl}`,
  ].join('\n')
}

export function GuideDeliveryEmail({
  firstName,
  guideTitle,
  variantLabel,
  downloadUrl,
  unsubscribeUrl,
}: GuideDeliveryEmailProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>{`Ton guide « ${guideTitle} » est prêt à télécharger.`}</Preview>
      <Body style={{ backgroundColor: '#FBFBFB', margin: 0, padding: '24px 0', fontFamily: 'Helvetica, Arial, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '0 auto', backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '32px' }}>
          <Text style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: ARDOISE, margin: '0 0 12px' }}>
            Impact &amp; Process
          </Text>

          <Heading as="h1" style={{ fontSize: '26px', lineHeight: 1.2, color: NUIT, margin: '0 0 16px' }}>
            {firstName ? `Salut ${firstName}, voici ton guide.` : 'Voici ton guide.'}
          </Heading>

          <Text style={{ fontSize: '17px', lineHeight: 1.6, color: NUIT, margin: '0 0 24px' }}>
            {`« ${guideTitle} »`}
            {variantLabel ? `, version ${variantLabel}.` : '.'}
          </Text>

          <Section style={{ margin: '0 0 24px' }}>
            <Link
              href={downloadUrl}
              style={{
                display: 'inline-block',
                backgroundColor: JAUNE,
                color: '#000000',
                border: '2px solid #000000',
                borderRadius: '999px',
                padding: '16px 28px',
                fontSize: '16px',
                fontWeight: 800,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
              }}
            >
              Télécharger le guide
            </Link>
          </Section>

          <Text style={{ fontSize: '15px', lineHeight: 1.5, color: ARDOISE, margin: '0 0 8px' }}>
            Le lien reste valable sept jours. Passé ce délai, redemande le guide depuis le site :
            c’est immédiat.
          </Text>

          <Text style={{ fontSize: '15px', lineHeight: 1.5, color: ARDOISE, margin: '0 0 24px', wordBreak: 'break-all' }}>
            Si le bouton ne fonctionne pas : {downloadUrl}
          </Text>

          <Hr style={{ borderColor: '#E9E9E9', margin: '0 0 16px' }} />

          <Text style={{ fontSize: '13px', lineHeight: 1.5, color: ARDOISE, margin: '0 0 8px' }}>
            Conseils d’hygiène de vie. Ils ne remplacent pas un avis médical ou diététique.
          </Text>

          <Text style={{ fontSize: '13px', lineHeight: 1.5, color: ARDOISE, margin: 0 }}>
            <Link href={unsubscribeUrl} style={{ color: NUIT }}>
              Se désinscrire
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
