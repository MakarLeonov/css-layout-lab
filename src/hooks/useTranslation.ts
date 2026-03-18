import { useCallback } from 'react'
import { useUIStore } from '@/store/uiStore'
import en from '@/i18n/en.json'
import ru from '@/i18n/ru.json'

type TranslationKey = keyof typeof en

const dictionaries: Record<string, Record<string, string>> = { en, ru }

export function useTranslation() {
  const { lang, setLang } = useUIStore()

  const t = useCallback(
    (key: string): string => {
      const dict = dictionaries[lang] ?? dictionaries.en
      return dict[key] ?? (dictionaries.en as Record<string, string>)[key] ?? key
    },
    [lang]
  )

  return { t, lang, setLang }
}
