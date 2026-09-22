'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  applyAppearance,
  DEFAULT_ACCENT,
  DEFAULT_THEME,
  readStoredAccent,
  readStoredTheme,
  writeStoredAccent,
  writeStoredTheme,
  type AccentPreference,
  type ThemePreference,
} from '@/lib/appearance'

interface AppearanceContextValue {
  theme: ThemePreference
  accent: AccentPreference
  setTheme: (theme: ThemePreference) => void
  setAccent: (accent: AccentPreference) => void
}

const AppearanceContext = createContext<AppearanceContextValue | null>(null)

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>(DEFAULT_THEME)
  const [accent, setAccentState] = useState<AccentPreference>(DEFAULT_ACCENT)

  useEffect(() => {
    const storedTheme = readStoredTheme()
    const storedAccent = readStoredAccent()
    setThemeState(storedTheme)
    setAccentState(storedAccent)
    applyAppearance(storedTheme, storedAccent)
  }, [])

  const setTheme = useCallback(
    (next: ThemePreference) => {
      setThemeState(next)
      writeStoredTheme(next)
      applyAppearance(next, accent)
    },
    [accent]
  )

  const setAccent = useCallback(
    (next: AccentPreference) => {
      setAccentState(next)
      writeStoredAccent(next)
      applyAppearance(theme, next)
    },
    [theme]
  )

  const value = useMemo(
    () => ({ theme, accent, setTheme, setAccent }),
    [theme, accent, setTheme, setAccent]
  )

  return (
    <AppearanceContext.Provider value={value}>
      {children}
    </AppearanceContext.Provider>
  )
}

export function useAppearance() {
  const ctx = useContext(AppearanceContext)
  if (!ctx) {
    throw new Error('useAppearance must be used within AppearanceProvider')
  }
  return ctx
}
