export default {
	icon: "https://ipf-website.s3.amazonaws.com/paperless.png",
	color: "#795548",
	type: "mobileApp",
	name: "Coach Me",
	settings: {
		mainPage: 1,
		nav: {
			enabled: true,
			showLabels: true,
			showAppName: false,
		},
		fontFamily: "'Open Sans', sans-serif",
		headingFontFamily: "'Montserrat', sans-serif",
		headingFontSize: "2.85rem",
		headingFontWeight: 800,
		roundedCorners: "regular",
	},
	sections: [],
	pages: [
		{
			icon: "home",
			name: "Home",
			type: "custom",
			index: 1,
			settings: {
				layout: "default",
			},
			sections: [
				{
					name: "Inline List Section",
					type: "inlineListSection",
					index: 1,
					settings: {
						title: "Active coaches",
						subtitle:
							"Coaches who are currently online taking calls",
						inset: true,
						imageShape: "circle",
						data: [
							{
								image: "https://images.unsplash.com/photo-1589156215870-a324614b3fff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDV8fGJsYWNrJTIwZ2lybHxlbnwwfHx8fDE2OTgwNzgzNDN8MA&ixlib=rb-4.0.3&q=80&w=900",
								title: "Lianna Dumei",
								subtitle: "Marketing lead, KPMG",
							},
							{
								image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDF8fGJsYWNrJTIwd29tYW58ZW58MHx8fHwxNjk4MDc3OTEyfDA&ixlib=rb-4.0.3&q=80&w=900",
								title: "Edna Saul",
								subtitle: "Chief strategist, Kalope",
							},
							{
								image: "https://images.unsplash.com/photo-1611432579699-484f7990b127?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDM1fHxibGFjayUyMHdvbWFufGVufDB8fHx8MTY5ODA3ODEyNXww&ixlib=rb-4.0.3&q=80&w=900",
								title: "Tina Fey",
								subtitle: "Owner, Fey Consultants",
							},
						],
					},
					platform: "mobile",
				},
			],
		},
	],
};
