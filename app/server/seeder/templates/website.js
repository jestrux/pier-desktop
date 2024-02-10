export default {
	id: 6,
	name: "Paperless",
	icon: "https://ipf-website.s3.amazonaws.com/paperless.png",
	color: "#86520D",
	type: "website",
	settings: {
		mainPage: 1,
		nav: {
			enabled: true,
			showLabels: true,
			showAppName: false,
		},
		showAppBar: true,
		fontFamily: "'Open Sans', sans-serif",
		headingFontFamily: "'Montserrat', sans-serif",
		headingFontSize: "2.5rem",
		headingFontWeight: 700,
		roundedCorners: "full",
	},
	active: true,
	createdAt: "2023-11-01T15:02:26.210Z",
	updatedAt: "2023-11-01T15:02:26.210Z",
	sections: [
		{
			id: 49,
			name: "Global Appbar",
			type: "appBar",
			platform: "all",
			settings: {
				showAppName: false,
				scrollBehavior: "Lift",
				links: [
					{
						tempId: "Home",
						label: "Home",
						appPage: true,
						page: "Home",
						underline: false,
					},
					{
						tempId: "About Us",
						label: "About Us",
						appPage: false,
						url: "#",
						underline: false,
					},
					{
						label: "Our Services",
						appPage: false,
						url: "#",
						underline: false,
						tempId: "Our Services",
					},
					{
						tempId: "Contact Us",
						label: "Feautured Work",
						appPage: false,
						url: "#",
						underline: false,
					},
				],
				activeLink: {
					showIndicator: false,
					useAppColorForText: false,
				},
				buttonOne: {
					tempId: "Login",
					label: "Contact Us",
					appPage: false,
					url: "#",
					style: "Outline",
					useAppColor: false,
					hidden: false,
				},
				buttonTwo: {
					tempId: "Get Started",
					label: "Get Started",
					url: "#",
					style: "Filled",
					hidden: true,
				},
				layout: "Regular",
				logo: "https://ipf-website.s3.amazonaws.com/darling-brew.png",
				useAppColorForText: true,
				showIndicator: true,
				showIndicatorForActiveLink: true,
				useAppColorForActiveLink: true,
			},
			index: 0,
			appId: 6,
			pageId: null,
			createdAt: "2023-11-01T15:02:26.214Z",
			updatedAt: "2023-11-01T15:02:26.214Z",
		},
		{
			id: 47,
			name: "Footer",
			type: "footer",
			platform: "all",
			settings: {
				background: "black",
				color: "white",
			},
			index: 100,
			appId: 6,
			pageId: null,
			createdAt: "2023-11-01T15:02:26.214Z",
			updatedAt: "2023-11-01T15:02:26.214Z",
		},
	],
	pages: [
		{
			id: 6,
			name: "Home",
			icon: "home",
			type: "custom",
			settings: {
				layout: "default",
			},
			active: false,
			index: 1,
			appId: 6,
			createdAt: "2023-11-01T15:02:26.212Z",
			updatedAt: "2023-11-01T15:02:26.212Z",
			sections: [
				{
					id: 50,
					name: "Banner",
					type: "banner",
					platform: "all",
					settings: {
						layout: "Centered",
						image: "https://images.unsplash.com/photo-1596120236172-231999844ade?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDR8fHZhY2F0aW9ufGVufDB8fHx8MTY5ODgzNTE1Nnww&ixlib=rb-4.0.3&q=80&w=1080",
						title: "The perfect vacation partner",
						subtitle:
							"Take the stress out of planning the perfect vacation, browse and pick from our carefully catered itineraries then just show up and enjoy",
						buttonOne: {
							label: "Plan your vacation",
							appPage: false,
							url: "#",
							style: "Outline",
							tempId: "Speaker List",
							hidden: false,
						},
						buttonTwo: {
							label: "See our offerings",
							appPage: false,
							url: "#",
							style: "Filled",
							useAppColor: true,
							tempId: "Book your Seat",
							hidden: false,
						},
						color: "inherit",
						background: "inherit",
						video: "https://www.youtube.com/watch?v=4134XM6m1g4",
						fullWidth: true,
					},
					index: 1,
					appId: null,
					pageId: 6,
					createdAt: "2023-11-01T15:02:26.214Z",
					updatedAt: "2023-11-01T15:02:26.214Z",
				},
				{
					id: 48,
					name: "Grid Section",
					type: "gridSection",
					platform: "all",
					settings: {
						background: "inherit",
						color: "inherit",
						layout: "Horizontal",
						title: "Eco-friendly tours",
						subtitle:
							"The eco-friendly tours that we organize raise awareness about environmental concerns.",
						buttonOne: {
							label: "See all tours",
							appPage: false,
							url: "#",
							style: "Outline",
							useAppColor: false,
							hidden: false,
						},
						buttonTwo: {
							label: null,
							appPage: false,
							url: "#",
							style: "Filled",
							useAppColor: true,
							hidden: true,
						},
						aspectRatio: "portrait",
						columns: 4,
						gap: "2rem",
						overlayText: false,
						padding: "0.5rem",
						textPlacement: "bottomLeft",
					},
					index: 1,
					appId: null,
					pageId: 6,
					createdAt: "2023-11-01T15:02:26.214Z",
					updatedAt: "2023-11-01T15:02:26.214Z",
				},
				{
					id: 52,
					name: "Media Section",
					type: "mediaSection",
					platform: "all",
					settings: {
						background:
							"linear-gradient(90deg, #FFD4A2 0%, #ECE6FF 100%)",
						color: "black",
						layout: "Regular",
						title: "Unwind in luxe",
						subtitle:
							"With over 20 years of knowledge, we use emerging technologies to solve problems and shape the behaviors of tomorrow. We’ve taken the time to study every part of the industry and have the process down pat.\n\nWe’re very passionate and take a lot of pride in everything we do and that's clear in the meticulous care into every little detail.",
						buttonOne: {
							label: "See all available activities",
							appPage: false,
							url: "#",
							style: "Outline",
							useAppColor: false,
							hidden: false,
						},
						buttonTwo: {
							label: null,
							appPage: false,
							url: "#",
							style: "Filled",
							useAppColor: true,
							hidden: true,
						},
						image: "https://images.unsplash.com/photo-1604348825621-22800b6ed16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDF8fGNoYWlycyUyQ3Bvb2x8ZW58MHx8fHwxNjk4ODM1MDk1fDA&ixlib=rb-4.0.3&q=80&w=1080",
					},
					index: 1,
					appId: null,
					pageId: 6,
					createdAt: "2023-11-01T15:02:26.214Z",
					updatedAt: "2023-11-01T15:02:26.214Z",
				},
				{
					id: 54,
					name: "Media Section",
					type: "mediaSection",
					platform: "all",
					settings: {
						background: "inherit",
						color: "inherit",
						layout: "Regular",
						title: "Reaffirm your style",
						subtitle:
							"With over 20 years of knowledge, we use emerging technologies to solve problems and shape the behaviors of tomorrow. We’ve taken the time to study every part of the industry and have the process down pat.\n\nWe’re very passionate and take a lot of pride in everything we do and that's clear in the meticulous care into every little detail.",
						buttonOne: {
							label: "Customise your itinerary",
							appPage: false,
							url: "#",
							style: "Outline",
							hidden: false,
						},
						buttonTwo: {
							label: "Learn more",
							appPage: false,
							url: "#",
							style: "Filled",
							useAppColor: true,
							hidden: true,
						},
						image: "https://images.unsplash.com/photo-1649874888490-23f7c0390a02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDUyfHx2YWNhdGlvbiUyQyUyMGdpcmwlMkMlMjBjaGFpcnxlbnwwfHx8fDE2OTg4MzUzMjV8MA&ixlib=rb-4.0.3&q=80&w=1080",
						flipped: true,
					},
					index: 1,
					appId: null,
					pageId: 6,
					createdAt: "2023-11-01T15:02:26.214Z",
					updatedAt: "2023-11-01T15:02:26.214Z",
				},
				{
					id: 53,
					name: "Feature Section",
					type: "featureSection",
					platform: "all",
					settings: {
						background: "gray",
						color: "black",
						layout: "Regular",
						title: "Values we live by",
						subtitle: "",
						buttonOne: {
							label: "Get started",
							appPage: false,
							url: "#",
							style: "Outline",
							useAppColor: false,
							hidden: true,
						},
						buttonTwo: {
							label: "Learn more",
							appPage: false,
							url: "#",
							style: "Filled",
							useAppColor: true,
							hidden: true,
						},
						columns: 4,
						gap: "2rem",
					},
					index: 1,
					appId: null,
					pageId: 6,
					createdAt: "2023-11-01T15:02:26.214Z",
					updatedAt: "2023-11-01T15:02:26.214Z",
				},
				{
					id: 51,
					name: "Cta Section",
					type: "ctaSection",
					platform: "all",
					settings: {
						background: "inherit",
						color: "black",
						layout: "Horizontal",
						title: "Ready to get started?",
						subtitle:
							"Join many others like you jumping in and joining our movement.",
						buttonOne: {
							label: "Make a donation",
							appPage: false,
							url: "#",
							style: "Outline",
							useAppColor: false,
							hidden: false,
						},
						buttonTwo: {
							label: "Partner with us",
							appPage: false,
							url: "#",
							style: "Filled",
							useAppColor: true,
							hidden: false,
						},
					},
					index: 1,
					appId: null,
					pageId: 6,
					createdAt: "2023-11-01T15:02:26.214Z",
					updatedAt: "2023-11-01T15:02:26.214Z",
				},
			],
		},
	],
	primaryBgTextColor: "#FFFFFF",
};