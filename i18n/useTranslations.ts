"use client";
import { useAutoI18n } from "@/front/lib/i18n";
import { useSharedLang } from "@/front/lib/useLang";

// Simple helper to get t() without manually wiring lang/text pool everywhere
export function useTranslations(pool: string[]) {
	const [lang] = useSharedLang();
	const t = useAutoI18n(lang, pool);
	return t;
}

