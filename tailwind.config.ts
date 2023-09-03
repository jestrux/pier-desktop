import type { Config } from "tailwindcss";

const darkColors = {
	// canvas: "#181818",
	// card: "#252525",
	canvas: "#000",
	card: "#1A1A1A",
	popup: "#383838",
	divider: "#222", //"#222"
	content: "#fff",
	primary: "#b070f1",
	"primary-light": "#F6AD55",
};

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
		// extend: {
		//     fontFamily: {
		//         sans: ["Nunito", ...defaultTheme.fontFamily.sans],
		//     },
		// },
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
		require("tailwindcss-themer")({
			defaultTheme: {
				extend: {
					colors: darkColors,
				},
			},
			themes: [
				{
					name: "chakra-ui-light",
					extend: {
						colors: {
							canvas: "#E5E5E5",
							card: "#FFF",
							popup: "#FFF",
							divider: "#eaeaea",
							content: "#000",
							primary: "rebeccapurple",
							// primary: "#1F571A",
							"primary-light": "#F6AD55",
						},
					},
				},
				{
					name: "chakra-ui-dark",
					extend: {
						colors: darkColors,
					},
				},
			],
		}),
	],
} satisfies Config;
