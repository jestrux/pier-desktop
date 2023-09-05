export const randomId = () => Math.random().toString(36).slice(2);

export const isEmptyObj = (obj) => Object.keys(obj).length === 0;

export const formDataObject = (formData) => {
	return Array.from(formData).reduce(
		(agg, [key, value]) => ({
			...agg,
			[key]: value,
		}),
		{}
	);
};

export const chakraTheme = {
	config: {
		// initialColorMode: "dark",
		useSystemColorMode: true,
	},
	colors: {
		primary: {
			200: "#b070f1",
			500: "rebeccapurple",
		},
		contentAlpha: {
			50: "#D4D4D4",
			200: "#C4C4C4",
			500: "#808080",
			600: "#666666",
		},
	},
};

export const exportJSONAsCSV = ({ filename = "data", data }) => {
	const replacer = (key, value) => (value === null ? "" : value);
	const header = Object.keys(data[0]);
	const csv = [
		header.join(","), // header row first
		...data.map((row) =>
			header
				.map((fieldName) => JSON.stringify(row[fieldName], replacer))
				.join(",")
		),
	].join("\r\n");

	return manualDownload({
		data: new Blob([csv], { type: "text/csv;charset=utf-8;" }),
		filename: filename + ".csv",
	});
};

export const manualDownload = ({ filename, data }) => {
	const link = document.createElement("a");
	link.href = URL.createObjectURL(data);
	link.download = filename;
	link.click();
};

export const appColorChoices = {
	Blue: "#2196F3",
	Green: "#4CAF50",
	Pink: "#E91E63",
	Yellow: "#FFEB3B",
	Indigo: "#3F51B5",
	Orange: "#FF5722",
};

export const materialColors = {
	Red: "#f44336",
	Pink: "#e91e63",
	Purple: "#9c27b0",
	"Deep Purple": "#673ab7",
	Indigo: "#3f51b5",
	Blue: "#2196f3",
	"Light Blue": "#03a9f4",
	Cyan: "#00bcd4",
	Teal: "#009688",
	Green: "#4caf50",
	"Light Green": "#8bc34a",
	Lime: "#cddc39",
	Yellow: "#ffeb3b",
	Amber: "#ffc107",
	Orange: "#ff9800",
	"Deep Orange": "#ff5722",
	Brown: "#795548",
	"Blue Gray": "#607d8b",
};

export const appIconChoices = {
	Noise: "https://ipf-website.s3.amazonaws.com/noise.png",
	Blob: "https://ipf-website.s3.amazonaws.com/blob.png",
	Confetti: "https://ipf-website.s3.amazonaws.com/confetti.png",
	Gallery: "https://ipf-website.s3.amazonaws.com/gallery.png",
	Graph: "https://ipf-website.s3.amazonaws.com/graph.png",
	Website: "https://ipf-website.s3.amazonaws.com/website.png",
	"Android Black": "https://ipf-website.s3.amazonaws.com/android-black.png",
	"Android White": "https://ipf-website.s3.amazonaws.com/android-white.png",
	Paperless: "https://ipf-website.s3.amazonaws.com/paperless.png",
	Rareblocks: "https://ipf-website.s3.amazonaws.com/rareblocks.png",
	"Darling Brew": "https://ipf-website.s3.amazonaws.com/darling-brew.png",
	"Moon Skincare": "https://ipf-website.s3.amazonaws.com/moon-skincare.png",
	"Moon Skincare Icon":
		"https://ipf-website.s3.amazonaws.com/moon-skincare-icon.png",
	iPF: "https://ipfsoftwares.com/img/logo-blue.png",
	// iPF: "https://ipfsoftwares.com/favicon.png",
	NIC: "https://ipf-website.s3.amazonaws.com/nic.png",
};

export const objectFieldChoices = (choices) =>
	choices.map((choice) => {
		const label = objectField(choice, "label");
		return {
			tempId: label,
			label: label,
			...(typeof choice == "object" ? choice : {}),
		};
	});

export const objectField = (object, field) => {
	return typeof object == "object" ? object?.[field] : object;
};

export const objectAsLabelValue = (object) => {
	return Object.entries(object).map(([label, value]) => ({ label, value }));
};

export const camelCaseToSentenceCase = (text) => {
	if (!text || !text.length) return "";
	const result = text.replace(/([A-Z]{1,})/g, " $1");
	return result.charAt(0).toUpperCase() + result.slice(1);
};

export const parseFields = (fields, data) => {
	if (!fields) return;

	return Object.entries(fields).map(([name, value]) => {
		let { type, label, choices, defaultValue, ...fieldProps } =
			typeof value == "object" ? value : { type: value };

		let dataValue = data?.[name];
		if (type == "sectionText") {
			dataValue = {
				title: data?.title,
				subtitle: data?.subtitle,
			};
		}

		const computedDefaultValue = dataValue ?? defaultValue;

		if (choices && !choices.includes(computedDefaultValue))
			choices.push(computedDefaultValue);

		return {
			__id: "id" + randomId(),
			name,
			label: label || name,
			type,
			choices,
			defaultValue: computedDefaultValue,
			value: computedDefaultValue,
			...fieldProps,
		};
	});
};

export const onEditButtons = (currentPierApp, button) => ({
	title: "Edit Button",
	action: "Save Button",
	secondaryAction: "Hide Button",
	onSecondaryAction: (button) => ({
		...button,
		hidden: true,
	}),
	fields: {
		label: "text",
		appPage: {
			type: "boolean",
			label: "Link to app page",
		},
		url: {
			label: "External URL",
			defaultValue: "#",
			show: (state) => !state.appPage,
		},
		page: {
			type: "choice",
			choices: currentPierApp?.pages.map(({ name }) => name),
			show: (state) => state.appPage,
		},
		style: {
			type: "radio",
			choices: ["Flat", "Outline", "Filled"],
		},
		useAppColor: {
			type: "boolean",
			label: "Use app color as background",
			// show: (state) => state.style == "Filled",
		},
	},
	...(button?.hidden ? { data: { ...button, hidden: false } } : {}),
});

export const buttonEditorListProps = ({
	buttons: value,
	currentPierApp,
	onSave,
} = {}) => {
	let buttons = [...(value || [])];
	const hiddenButtons = value?.filter(({ hidden }) => hidden);
	if (hiddenButtons.length == 2) {
		buttons = value.map((button) => ({
			...button,
			hidden: false,
		}));

		onSave(buttons);
	}

	const editorProps = {
		editable: true,
		canAdd: false,
		onEdit: (button) => onEditButtons(currentPierApp, button),
		onSave,
		onGroupAction: (buttons) => {
			const hidden = buttons.filter(({ hidden }) => !hidden).length > 0;

			return buttons.map((button) => ({
				...button,
				hidden,
			}));
		},
		value: buttons,
		trailing: ({ hidden, url, page } = {}) =>
			hidden ? "Hidden" : url || page,
	};

	const pageProps = {
		secondaryAction: "Hide Buttons",
		secondaryActionType: "danger",
		confirmText: "Hide",
	};

	return [pageProps, editorProps];
};

export function shuffle(array) {
	return [...array].sort(() => Math.random() - 0.5);
}

export const stockImages = [
	"https://images.unsplash.com/photo-1653541396636-2cfe61946e21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwyOHwxODkxODc3fHx8fHwyfHwxNjc2NzA4NTAx&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1629116083948-4709b2acc7b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwyMHw0NDM1NzA1OXx8fHx8Mnx8MTY3NjcwODQ5NA&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1535146851324-6571dc3f2672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwzfDE4OTE4Nzd8fHx8fDJ8fDE2NzY3MDg1MDE&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwyfDM0NDM1NTJ8fHx8fDJ8fDE2NzY3MDg0OTc&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1672310035534-7f48cfb23164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwzfDE0NTgzMTh8fHx8fDJ8fDE2NzY3MDg0OTY&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1615526674830-9247965327ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwxM3wzNDQzNTUyfHx8fHwyfHwxNjc2NzA4NDk3&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1633019485164-c255a43fdd7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwyM3xyNTQ2UlJJSk5SMHx8fHx8Mnx8MTY3NjcwODUwNQ&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1674333753243-0ff9d63d2222?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnw0fDEzMTkwNDB8fHx8fDJ8fDE2NzY3MDg0OTI&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1640678784170-4ad923f006e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwyOHxyNTQ2UlJJSk5SMHx8fHx8Mnx8MTY3NjcwODUwNQ&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1634892202510-acf5ad72635f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwxMnw0NDM1NzA1OXx8fHx8Mnx8MTY3NjcwODQ5NA&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1628933490013-3e26b2c2df86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwxN3wyMzg4MTMyNXx8fHx8Mnx8MTY3NjcwODQ5OQ&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1639653745939-cfd291164234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwyN3xyNTQ2UlJJSk5SMHx8fHx8Mnx8MTY3NjcwODUwNQ&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1674413145062-af85d82616d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwxN3wxMzE5MDQwfHx8fHwyfHwxNjc2NzA4NDky&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1561817223-f67e69e6bd6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwxOHxyNTQ2UlJJSk5SMHx8fHx8Mnx8MTY3NjcwODUwNQ&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1628762189331-85c5bd4b36bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwyMXw0NDM1NzA1OXx8fHx8Mnx8MTY3NjcwODQ5NA&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1586951175696-3f1f588c518c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwxOXwyMTczNjI1Mnx8fHx8Mnx8MTY3NjcwODQ5NQ&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1542464497-e217d476a9b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwxOHwxODkxODc3fHx8fHwyfHwxNjc2NzA4NTAx&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1656056773803-2c7b9e74c1d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwyMHw5Mjk3NjZ8fHx8fDJ8fDE2NzY3MDg1MDM&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1658246975950-6f87691fa48e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwyMXwxODkxODc3fHx8fHwyfHwxNjc2NzA4NTAx&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1617215019308-de280e0efb82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnw1fDM0NDM1NTJ8fHx8fDJ8fDE2NzY3MDg0OTc&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1533135091724-62cc5402aa20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwxN3wyMTczNjI1Mnx8fHx8Mnx8MTY3NjcwODQ5NQ&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1672665145444-a886dc0d7015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnw0fDE0NTgzMTh8fHx8fDJ8fDE2NzY3MDg0OTY&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1613480031371-7d4a24981ca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwxOHwyMzg4MTMyNXx8fHx8Mnx8MTY3NjcwODQ5OQ&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1593697820980-a9d1a839aff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwyfDE4OTE4Nzd8fHx8fDJ8fDE2NzY3MDg1MDE&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1594631248765-2d8581f01984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnw4fDIzODgxMzI1fHx8fHwyfHwxNjc2NzA4NDk5&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1612068661767-06b8b2295ab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwyM3wzNDQzNTUyfHx8fHwyfHwxNjc2NzA4NDk3&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1533899114961-3aa0579cd5b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwyN3wyMTczNjI1Mnx8fHx8Mnx8MTY3NjcwODQ5NQ&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1674185763031-44c92cc9a5ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwzMHwxMzE5MDQwfHx8fHwyfHwxNjc2NzA4NDky&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1532210317995-cc56d90177d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwyOHwyMTczNjI1Mnx8fHx8Mnx8MTY3NjcwODQ5NQ&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1674594386542-56a141a87ce8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwzfDEzMTkwNDB8fHx8fDJ8fDE2NzY3MDg0OTI&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1497681883844-82b4f0a359a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwzMHwzNDQzNTUyfHx8fHwyfHwxNjc2NzA4NDk3&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1655233493925-deb6495a6f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwxOXw5Mjk3NjZ8fHx8fDJ8fDE2NzY3MDg1MDM&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1674080579362-dfb05936b9c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwyMXwxMzE5MDQwfHx8fHwyfHwxNjc2NzA4NDky&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1674158687384-023265a5d536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwyM3wxMzE5MDQwfHx8fHwyfHwxNjc2NzA4NDky&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1579101451346-4d0cd752f4b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwyOHwyMzg4MTMyNXx8fHx8Mnx8MTY3NjcwODQ5OQ&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1612203985729-70726954388c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwxMXw5Mjk3NjZ8fHx8fDJ8fDE2NzY3MDg1MDM&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1660873056468-9528b8318918?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwzMHwxNDU4MzE4fHx8fHwyfHwxNjc2NzA4NDk2&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1542986130-d0c46350cf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwxfDIzODgxMzI1fHx8fHwyfHwxNjc2NzA4NDk4&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1611521178062-d4a7ca75ae8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwxfDIxNzM2MjUyfHx8fHwyfHwxNjc2NzA4NDk1&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1661449168296-4dacacb8b1aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwxNXwxNDU4MzE4fHx8fHwyfHwxNjc2NzA4NDk2&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1654874766809-35d8136cf8c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwxNnw5Mjk3NjZ8fHx8fDJ8fDE2NzY3MDg1MDM&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1623128159364-4ebcfcecd58d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwxMHw5Mjk3NjZ8fHx8fDJ8fDE2NzY3MDg1MDM&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1641890533142-71727d69491d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwyOXxyNTQ2UlJJSk5SMHx8fHx8Mnx8MTY3NjcwODUwNQ&ixlib=rb-4.0.3&q=80&w=1080",
	"https://images.unsplash.com/photo-1628762596536-15f623931468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjE2NXwwfDF8Y29sbGVjdGlvbnwyNnw0NDM1NzA1OXx8fHx8Mnx8MTY3NjcwODQ5NA&ixlib=rb-4.0.3&q=80&w=1080",
];
