// Color mappings that match Mantine color scheme
export const FUNCTIONAL_COLORS = {
  production: {
    background: '#f0fdf4',
    border: '#22c55e',
    label: 'green'
  },
  control: {
    background: '#eff6ff', 
    border: '#3b82f6',
    label: 'blue'
  },
  monitoring: {
    background: '#ecfeff',
    border: '#06b6d4', 
    label: 'cyan'
  },
  logistics: {
    background: '#fff7ed',
    border: '#f97316',
    label: 'orange'
  },
  maintenance: {
    background: '#fdf4ff',
    border: '#a855f7',
    label: 'purple' 
  },
  quality: {
    background: '#fef2f2',
    border: '#ef4444',
    label: 'red'
  }
} as const

export const OPERATIONAL_COLORS = {
  manufacturing: {
    background: '#eff6ff',
    border: '#3b82f6', 
    label: 'blue'
  },
  support: {
    background: '#fdf4ff',
    border: '#a855f7',
    label: 'purple'
  },
  external: {
    background: '#fef2f2', 
    border: '#ef4444',
    label: 'red'
  },
  network: {
    background: '#fff7ed',
    border: '#f97316', 
    label: 'orange'
  }
} as const

export const DEFAULT_COLORS = {
  background: '#f8f9fa',
  border: '#d1d5db'
}