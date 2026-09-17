export type GuideCategory = 'semaines-sos' | 'fondamentaux' | 'periodes-a-risque'

export type KcalVariant = '1800' | '2100'

export type OrderStatus = 'pending' | 'paid' | 'refunded' | 'failed'

export type LeadRow = {
  id: string
  email: string
  first_name: string | null
  newsletter_opt_in: boolean
  consent_text: string
  consent_at: string
  unsubscribe_token: string
  unsubscribed_at: string | null
  first_guide_slug: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  fbclid: string | null
  referrer: string | null
  ip_hash: string | null
  user_agent: string | null
  created_at: string
  updated_at: string
}

export type LeadInsert = Omit<
  LeadRow,
  'id' | 'unsubscribe_token' | 'unsubscribed_at' | 'consent_at' | 'created_at' | 'updated_at'
> &
  Partial<Pick<LeadRow, 'id' | 'unsubscribe_token' | 'unsubscribed_at' | 'consent_at'>>

export type LeadDownloadRow = {
  id: string
  lead_id: string
  guide_slug: string
  variant: KcalVariant | null
  token: string
  storage_path: string
  expires_at: string
  downloaded_at: string | null
  download_count: number
  created_at: string
}

export type LeadDownloadInsert = Omit<
  LeadDownloadRow,
  'id' | 'downloaded_at' | 'download_count' | 'created_at' | 'expires_at'
> &
  Partial<Pick<LeadDownloadRow, 'id' | 'expires_at'>>

export type OrderRow = {
  id: string
  lead_id: string | null
  email: string
  product_slug: string
  amount_cents: number
  currency: string
  status: OrderStatus
  stripe_session_id: string
  stripe_payment_intent_id: string | null
  withdrawal_waived: boolean
  withdrawal_waiver_text: string | null
  created_at: string
  updated_at: string
}

export type OrderInsert = Omit<OrderRow, 'id' | 'created_at' | 'updated_at'> &
  Partial<Pick<OrderRow, 'id'>>

export type RateLimitRow = {
  id: number
  bucket: string
  ip_hash: string
  created_at: string
}

export type Database = {
  __InternalSupabase: { PostgrestVersion: '12' }
  public: {
    Tables: {
      rate_limits: {
        Row: RateLimitRow
        Insert: Omit<RateLimitRow, 'id' | 'created_at'> & Partial<Pick<RateLimitRow, 'created_at'>>
        Update: Partial<Omit<RateLimitRow, 'id'>>
        Relationships: []
      }
      leads: {
        Row: LeadRow
        Insert: LeadInsert
        Update: Partial<LeadInsert>
        Relationships: []
      }
      lead_downloads: {
        Row: LeadDownloadRow
        Insert: LeadDownloadInsert
        Update: Partial<Omit<LeadDownloadRow, 'id' | 'created_at'>>
        Relationships: []
      }
      orders: {
        Row: OrderRow
        Insert: OrderInsert
        Update: Partial<OrderInsert>
        Relationships: []
      }
    }
    Views: Record<never, never>
    Functions: {
      consume_rate_limit: {
        Args: {
          p_bucket: string
          p_ip_hash: string
          p_limit: number
          p_window: string
        }
        Returns: number
      }
    }
    Enums: {
      order_status: OrderStatus
    }
    CompositeTypes: Record<never, never>
  }
}
