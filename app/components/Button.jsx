export default function Button({
	type = "button",
	className = "",
	processing,
	children,
	onClick,
}) {
	return (
		<button
			type={type}
			className={
				`inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white active:bg-gray-900 transition ease-in-out duration-150 hover:opacity-70 ${
					processing && "opacity-25"
				} ` + className
			}
			disabled={processing}
			onClick={onClick ? onClick : null}
		>
			{children}
		</button>
	);
}
