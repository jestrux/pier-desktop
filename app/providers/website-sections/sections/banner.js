export const defaultSettings = {
	layout: "Centered",
	image: "https://images.unsplash.com/photo-1522444501378-94cddd292428?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8c2VhcmNofDEzNXx8aW5kb29yJTIwcGxhbnRzfGVufDB8fHx8MTY4MTg0NTA3OQ&ixlib=rb-4.0.3&q=80&w=1080",
	title: "Ten remote productivity\nhacks and tricks",
	subtitle:
		"The little things that actually boost your energy and keep you \ngoing through your work day.",
	buttonOne: {
		tempId: "Speaker List",
		label: "Speaker List",
		hidden: true,
		url: "#",
		style: "Outline",
		useAppColor: false,
	},
	buttonTwo: {
		label: "Grab your own copy now",
		appPage: false,
		url: "#",
		style: "Filled",
		useAppColor: true,
		tempId: "Book your Seat",
		hidden: false,
	},
	color: "black",
	background: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",
};

export default function banner() {
	return {
		index: 0,
		type: "banner",
		name: "Banner",
		fields: {
			background: "color",
			color: {
				type: "radio",
				choices: ["inherit", "black", "white"],
			},
			layout: {
				label: "Layout",
				type: "radio",
				choices: ["Regular", "Centered"],
			},
			text: {
				type: "object",
				fields: {
					title: "markdown",
					subtitle: "markdown",
				},
			},
			buttonOne: "button",
			buttonTwo: "button",
			image: "image",
		},
		defaultValues: defaultSettings,
	};
}
