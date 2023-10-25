export default {
	icon: "https://ipfsoftwares.com/img/logo-blue.png",
	color: "#2196f3",
	type: "adminPanel",
	name: "Admin Panel",
	settings: {
		mainPage: 1,
		navPlacement: "top",
		fontFamily: "'Open Sans', sans-serif",
	},
	sections: [],
	pages: [
		{
			icon: "dashboard",
			name: "Dashboard",
			type: "custom",
			index: 1,
			settings: {
				layout: "default",
			},
			sections: [],
		},
	],
};
