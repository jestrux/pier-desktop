import { Remarkable } from "remarkable";

export default function MarkdownText({ children }) {
	return (
		<div
			dangerouslySetInnerHTML={{
				__html: new Remarkable({ breaks: true }).render(children),
			}}
		></div>
	);
}
