import { Remarkable } from "remarkable";

export default function MarkdownText({ children, ...props }) {
	return (
		<div
			{...props}
			dangerouslySetInnerHTML={{
				__html: new Remarkable({ breaks: true }).render(children),
			}}
		></div>
	);
}
