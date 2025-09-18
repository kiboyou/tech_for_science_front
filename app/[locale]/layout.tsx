import React from 'react';

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
	// You can extend here to inject locale-specific providers later.
	return <>{children}</>;
}

// Optionally generate static params if you have a fixed set of locales.
// export function generateStaticParams() { return [{ locale: 'fr' }, { locale: 'en' }]; }
