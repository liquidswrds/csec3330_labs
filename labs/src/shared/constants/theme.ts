export const BRAND_COLORS = {
  primary: '#005f7c',
  secondary: '#a7a9ac'
} as const

export const THEME_STYLES = {
  gradients: {
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    primary: (primary: string) => `linear-gradient(135deg, ${primary} 0%, #003d52 100%)`
  },
  shadows: {
    card: '0 8px 24px rgba(0, 95, 124, 0.12)',
    hover: 'translateY(-2px)'
  }
} as const