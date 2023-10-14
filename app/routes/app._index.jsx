import StandaloneApp from "~/StandaloneApp";

export const links = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700;900&family=Open+Sans:wght@100;400;500;600;700&display=swap",
	},
];

export default function Index() {
	// <link rel="preconnect" href="https://fonts.googleapis.com" />
	// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	// <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
	return <StandaloneApp />;
}
