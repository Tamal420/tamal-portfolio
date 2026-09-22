export type ThemePreference = 'system' | 'dark' | 'light'
export type AccentPreference =
  | 'green'
  | 'blue'
  | 'purple'
  | 'orange'
  | 'red'
  | 'cyan'

export const THEME_STORAGE_KEY = 'portfolio-theme'
export const ACCENT_STORAGE_KEY = 'portfolio-accent'

export const DEFAULT_THEME: ThemePreference = 'system'
export const DEFAULT_ACCENT: AccentPreference = 'green'

export const THEME_OPTIONS: { id: ThemePreference; label: string }[] = [
  { id: 'system', label: 'System' },
  { id: 'dark', label: 'Dark' },
  { id: 'light', label: 'Light' },
]

export const ACCENT_OPTIONS: {
  id: AccentPreference
  label: string
  swatch: string
}[] = [
  { id: 'green', label: 'Green', swatch: '#00C278' },
  { id: 'blue', label: 'Blue', swatch: '#3B82F6' },
  { id: 'purple', label: 'Purple', swatch: '#A78BFA' },
  { id: 'orange', label: 'Orange', swatch: '#F59E0B' },
  { id: 'red', label: 'Red', swatch: '#F87171' },
  { id: 'cyan', label: 'Cyan', swatch: '#22D3EE' },
]

export function isThemePreference(value: string | null): value is ThemePreference {
  return value === 'system' || value === 'dark' || value === 'light'
}

export function isAccentPreference(value: string | null): value is AccentPreference {
  return (
    value === 'green' ||
    value === 'blue' ||
    value === 'purple' ||
    value === 'orange' ||
    value === 'red' ||
    value === 'cyan'
  )
}

export function applyAppearance(theme: ThemePreference, accent: AccentPreference) {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  root.setAttribute('data-accent', accent)
}

export function readStoredTheme(): ThemePreference {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return isThemePreference(value) ? value : DEFAULT_THEME
  } catch {
    return DEFAULT_THEME
  }
}

export function readStoredAccent(): AccentPreference {
  try {
    const value = localStorage.getItem(ACCENT_STORAGE_KEY)
    return isAccentPreference(value) ? value : DEFAULT_ACCENT
  } catch {
    return DEFAULT_ACCENT
  }
}

export function writeStoredTheme(theme: ThemePreference) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Ignore private-mode / storage failures
  }
}

export function writeStoredAccent(accent: AccentPreference) {
  try {
    localStorage.setItem(ACCENT_STORAGE_KEY, accent)
  } catch {
    // Ignore private-mode / storage failures
  }
}

/** Inline script — runs before paint to avoid theme/accent flash. */
export const APPEARANCE_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');var a=localStorage.getItem('${ACCENT_STORAGE_KEY}');var r=document.documentElement;r.setAttribute('data-theme',t==='dark'||t==='light'||t==='system'?t:'${DEFAULT_THEME}');r.setAttribute('data-accent',a==='green'||a==='blue'||a==='purple'||a==='orange'||a==='red'||a==='cyan'?a:'${DEFAULT_ACCENT}');}catch(e){}})();`
