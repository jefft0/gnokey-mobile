import { Stack } from 'expo-router'
import { Guard } from '@/components/auth/guard'
import { IndexerProvider, LinkingProvider, ReduxProvider, DatabaseProvider, GnoNativeProvider } from '@/providers'
import { ThemeProvider } from '@/modules/ui-components'
import { useFonts } from 'expo-font'

// Extend the BigInt interface to include toJSON
declare global {
  interface BigInt {
    toJSON(): string
  }
}

// eslint-disable-next-line no-extend-native
BigInt.prototype.toJSON = function () {
  return this.toString()
}

export default function AppLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SF-Pro.ttf')
  })

  if (!loaded) {
    // Async font loading only occurs in development.
    return null
  }

  return (
    <DatabaseProvider>
      <GnoNativeProvider>
        <IndexerProvider>
          <ReduxProvider>
            <ThemeProvider>
              <LinkingProvider>
                <Guard>
                  <Stack
                    screenOptions={{
                      headerShown: false,
                      headerLargeTitle: true,
                      headerBackVisible: false
                    }}
                  />
                </Guard>
              </LinkingProvider>
            </ThemeProvider>
          </ReduxProvider>
        </IndexerProvider>
      </GnoNativeProvider>
    </DatabaseProvider>
  )
}
