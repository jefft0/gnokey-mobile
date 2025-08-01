import React from 'react'
import { DefaultTheme, ThemeProvider as RNThemeProvider } from 'styled-components'

type Props = {
  children?: React.ReactNode
}

const ThemeProvider = ({ children }: Props) => {
  const theme: DefaultTheme = {
    borderRadius: 8,

    error: { background: '#FFE5E6', text: '#FA262A' },
    success: { background: '#E5F9E5', text: '#00A86B' },

    colors: {
      primary: '#007AFF',
      black: '#000000',
      white: '#ffffff',
      gray: '#A1A1A1',
      background: '#FDFDFD',
      backgroundSecondary: '#EBEBEB',
      border: '#A1A1A1' // Border, Ruller, Divider
    },

    text: {
      textMuted: '#A1A1A1'
    },

    textinputs: {
      primary: {
        placeholder: {
          color: '#8D8D8D'
        }
      },
      secondary: {
        background: '#ffffff'
      },
      border: '#94A0AB',
      label: '#000000',
      background: '#EBEBEB'
    },

    buttons: {
      primary: '#007AFF',
      secondary: '#E5E5E5',
      tertirary: '#4c8ae7',
      danger: '#FF4647',

      label: {
        primary: '#FFFFFF',
        secondary: '#007AFF',
        tertirary: '#000000',
        danger: '#ffffff'
      }
    }
  }

  return <RNThemeProvider theme={theme}>{children}</RNThemeProvider>
}

export { DefaultTheme, ThemeProvider }
