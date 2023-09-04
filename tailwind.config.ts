import type { Config } from "tailwindcss";

export default {
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"!./app/StandaloneApp/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			spacing: {
				128: "32rem",
				144: "36rem",
			},
			inset: {
				"-0.2": "-0.12rem",
			},
			borderRadius: {
				"4xl": "2rem",
			},
		},
		colors: {
			canvas: "rgb(var(--canvas-color) / <alpha-value>)",
			card: "rgb(var(--card-color) / <alpha-value>)",
			popup: "rgb(var(--popup-color) / <alpha-value>)",
			divider: "rgb(var(--divider-color) / <alpha-value>)",
			content: "rgb(var(--content-color) / <alpha-value>)",
			primary: "rgb(var(--primary-color) / <alpha-value>)",
			"primary-light": "rgb(var(--primary-light-color) / <alpha-value>)",
		},
	},

	plugins: [
		// require("@tailwindcss/forms"),
		require("./tailwind-plugins/table")({
			cellPadding: ".75rem",
			tableBorderColor: "#dee2e6",
			tableStripedBackgroundColor: "rgba(0,0,0,.05)",
			tableHoverBackgroundColor: "rgba(0,0,0,.075)",
			tableBodyBorder: true, // If false, borders for table(not .table-bordered) will be removed.
			verticalAlign: "middle",
		}),
	],
} satisfies Config;
