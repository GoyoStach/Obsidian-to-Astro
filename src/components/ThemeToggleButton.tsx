import { IoMoon, IoSunny } from 'react-icons/io5/index.js'
import React, { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const THEMES: readonly Theme[] = ['light', 'dark'] as const

/**
 * Get the current theme preference
 * Matches the priority logic from BaseHead.astro
 */
const getThemePreference = (): Theme => {
  // Priority 1: User's saved preference
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
  }

  // Priority 2: System preference
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }

  // Priority 3: Default to light
  return 'light'
}

/**
 * Apply theme to the document
 * Matches the implementation from BaseHead.astro
 */
const applyTheme = (theme: Theme): void => {
  const root = document.documentElement
  const isDark = theme === 'dark'

  // Use toggle with boolean for better performance
  root.classList.toggle('dark', isDark)

  // Store the preference
  try {
    localStorage.setItem('theme', theme)
  } catch (e) {
    console.warn('Unable to save theme preference:', e)
  }
}

export default function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false)
  const [theme, setTheme] = useState<Theme>(() => {
    // During SSR, return a default to prevent hydration mismatch
    if (import.meta.env.SSR) {
      return 'light'
    }
    return getThemePreference()
  })

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
    applyTheme(newTheme)
    setTheme(newTheme)
  }

  // Sync with system theme changes and page navigations
  useEffect(() => {
    // Initial theme sync on mount
    const currentTheme = getThemePreference()
    if (currentTheme !== theme) {
      setTheme(currentTheme)
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (
      e: MediaQueryListEvent | MediaQueryList
    ) => {
      // Only auto-switch if user hasn't set a manual preference
      if (!localStorage.getItem('theme')) {
        const systemTheme: Theme = e.matches ? 'dark' : 'light'
        applyTheme(systemTheme)
        setTheme(systemTheme)
      }
    }

    // Use modern addEventListener if available, fallback to deprecated addListener
    try {
      mediaQuery.addEventListener('change', handleSystemThemeChange)
    } catch {
      // Fallback for older browsers that don't support addEventListener
      mediaQuery.addListener(handleSystemThemeChange)
    }

    // Listen for theme changes after page transitions
    const handleAfterSwap = () => {
      const currentTheme = getThemePreference()
      setTheme(currentTheme)
    }
    document.addEventListener('astro:after-swap', handleAfterSwap)

    // Cleanup
    return () => {
      try {
        mediaQuery.removeEventListener('change', handleSystemThemeChange)
      } catch {
        mediaQuery.removeListener(handleSystemThemeChange)
      }
      document.removeEventListener('astro:after-swap', handleAfterSwap)
    }
  }, [theme])

  // Apply theme on mount and when it changes
  useEffect(() => {
    if (theme) {
      applyTheme(theme)
    }
  }, [theme])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted ? (
    <div className="inline-flex items-center p-[1px] rounded-3xl bg-expresso-200 dark:bg-expresso-400">
      {THEMES.map(t => {
        const checked = t === theme
        return (
          <button
            key={t}
            className={`${
              checked
                ? 'bg-expresso-100 dark:text-expresso-400 text-expresso-200'
                : 'text-expresso-400 dark:text-expresso-100'
            } cursor-pointer rounded-3xl p-2 transition-colors duration-200`}
            onClick={toggleTheme}
            aria-label={`Switch to ${t === 'light' ? 'dark' : 'light'} mode`}
            aria-pressed={checked}
          >
            {t === 'light' ? <IoSunny /> : <IoMoon />}
          </button>
        )
      })}
    </div>
  ) : (
    <div className="inline-flex items-center p-[1px] rounded-3xl h-10 w-20" />
  )
}
