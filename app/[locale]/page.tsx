
export default function LocalizedHome({ params }: { params: { locale: string } }) {
	// Temporary placeholder; can route/translate properly later.
	return <div className="p-8 text-center">Locale: {params.locale}</div>;
}
