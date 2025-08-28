import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import App from './App'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './shared/styles/accessibility.css'

const theme = createTheme({
  colors: {
    brand: [
      '#e8f5ff',
      '#d0e9ff',
      '#a3d1ff',
      '#74b8ff',
      '#449fff',
      '#1976d2',
      '#1565c0',
      '#0d47a1',
      '#0a3d8f',
      '#08337a'
    ],
    gray: [
      '#fafafa',
      '#f5f5f5',
      '#eeeeee',
      '#e0e0e0',
      '#bdbdbd',
      '#9e9e9e',
      '#757575',
      '#616161',
      '#424242',
      '#212121'
    ],
    success: [
      '#e8f5e8',
      '#d1e7dd',
      '#c1f2c7',
      '#a3e9a4',
      '#86e29b',
      '#2e7d32',
      '#1b5e20',
      '#0d5016',
      '#0a4012',
      '#07300e'
    ],
    warning: [
      '#fff3e0',
      '#ffe0b2',
      '#ffcc02',
      '#ffb300',
      '#ff9f00',
      '#f57c00',
      '#ef6c00',
      '#e65100',
      '#bf360c',
      '#a4260d'
    ],
    error: [
      '#ffebee',
      '#ffcdd2',
      '#ef9a9a',
      '#e57373',
      '#ef5350',
      '#d32f2f',
      '#c62828',
      '#b71c1c',
      '#a31e1e',
      '#8f1b1b'
    ]
  },
  primaryColor: 'brand',
  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  headings: { fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' },
  defaultRadius: 'md',
  focusRing: 'always',
  cursorType: 'pointer',
  respectReducedMotion: true,
  other: {
    // High contrast mode support
    highContrast: {
      background: '#000000',
      text: '#ffffff',
      primary: '#66b3ff',
      success: '#00ff00',
      warning: '#ffff00',
      error: '#ff6666'
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Notifications />
      <App />
    </MantineProvider>
  </React.StrictMode>,
)