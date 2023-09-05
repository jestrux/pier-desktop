import { Link } from "@remix-run/react";
import centeredFields from "./centeredFields";

function youTubeIdFromUrl(url) {
	url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
	const youtubeRegex = /(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/;
	if (!youtubeRegex.test(url)) return null;

	return url[2] !== undefined ? url[2].split(/[^0-9a-z_-]/i)[0] : url[0];
}

function getMapLocation(location, width, height) {
	if (!location || !location.length) return null;

	try {
		let { coords } = JSON.parse(location);
		if (!coords) return null;

		coords.reverse().join(",");

		return {
			image: `
            https://www.mapquestapi.com/staticmap/v5/map?key=WeIoVZDtlQwX3HwGpXiNjk12Ca9eQJUm&center=${coords}&size=${width},${height}&type=dark&zoom=8&marker-7B0099
        `,
			google: `https://www.google.com/maps/search/?api=1&query=${coords}`,
		};
	} catch (error) {
		console.log("Can't parse location: ", error);
		return null;
	}
}

export default function TableColumn({ field, value, isFirst, alignLeft }) {
	const fieldType = field.type;
	let renderValue = value;

	if (fieldType == "image") {
		renderValue = (
			<img
				className={`inline object-cover
                    ${
						field.meta.face
							? "rounded-full aspect-square w-8"
							: "aspect-video w-14 rounded"
					}
                `}
				src={value}
				alt=""
			/>
		);
	}

	if (fieldType == "date") {
		const showTime = field.meta.includeTime;
		renderValue = new Intl.DateTimeFormat("en-GB", {
			hour12: true,
			dateStyle: "medium",
			// dateStyle: showTime ? "medium" : "long",
			...(showTime ? { timeStyle: "short" } : {}),
		})
			.format(new Date(value))
			.replace(` ${new Date().getFullYear()}`, "");
	}

	if (fieldType == "video") {
		const videoId = youTubeIdFromUrl(value);
		renderValue = (
			<a
				target="_blank"
				href={value}
				className="inline-flex relative overflow-hidden aspect-video w-14 rounded"
				rel="noreferrer"
			>
				<img
					className="h-full w-full object-cover"
					src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
				/>

				<span className="bg-black bg-opacity-50 text-red-500 absolute inset-0 flex items-center justify-center z-10">
					<svg fill="currentColor" width="20px" viewBox="0 0 24 24">
						<rect fill="#fff" x="5" y="5" width="12" height="12" />
						<path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
					</svg>
				</span>
			</a>
		);
	}

	if (fieldType == "status") {
		const statusColor = field.meta.availableStatuses.find(
			({ name }) => name === value
		).color;

		renderValue = (
			<div className="flex items-center gap-2">
				<span
					className="rounded-full w-3 h-3"
					style={{ background: statusColor }}
				/>

				<span className="pb-0.5 lowercase text-content/60 text-sm leading-none">
					{value}
				</span>
			</div>
		);
	}

	if (fieldType == "location") {
		let locationName = "View Location";
		try {
			locationName = JSON.parse(value)?.name;
		} catch (error) {}

		renderValue = (
			<a
				className="text-blue-500 underline"
				target="_blank"
				href={getMapLocation(value, 1080, 720)?.google}
				rel="noreferrer"
			>
				{locationName}
			</a>
		);
	}

	if (fieldType == "reference") {
		try {
			value = JSON.parse(value);
		} catch (error) {}

		renderValue = (
			<Link
				className="text-blue-500 underline"
				to={`/pier/models/${field.meta.model}/${value["_id"]}`}
			>
				<span>{value[field.meta.mainField]}</span>
			</Link>
		);
	}

	if (fieldType == "number") renderValue = value?.toLocaleString();

	return (
		<td className="border-b border-content/10">
			<span
				className={`w-full h-full block truncate
                ${centeredFields.includes(fieldType) & !alignLeft ? "text-center" : ""}
                ${fieldType == "long text" && "truncate"}
                ${isFirst == "pl-1"}
            `}
			>
				{renderValue}
			</span>
		</td>
	);
}
