import { defaultSettings as defaultAppBarSettings } from "~/providers/website-sections/sections/appBar";
import { defaultSettings as defaultBannerSettings } from "~/providers/website-sections/sections/banner";
import { defaultSettings as defaultFooterSettings } from "~/providers/website-sections/sections/footer";

export default {
	icon: "https://ipf-website.s3.amazonaws.com/paperless.png",
	color: "#2196f3",
	type: "website",
	name: "Paperless",
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
		headingFontSize: "2.85rem",
		headingFontWeight: 800,
		roundedCorners: "regular",
	},
	sections: [
		{
			name: "Global Appbar",
			type: "appBar",
			index: 0,
			settings: defaultAppBarSettings,
			platform: "all",
		},
		{
			name: "Footer",
			type: "footer",
			index: 100,
			settings: defaultFooterSettings,
			platform: "all",
		},
	],
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
					name: "Banner",
					type: "banner",
					index: 1,
					settings: defaultBannerSettings,
					platform: "all",
				},
			],
		},
	],
};
