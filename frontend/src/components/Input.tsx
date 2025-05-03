export function Input({ onChange, placeholder, ref }: {placeholder:string; onChange?: () => void; ref: any; }) {
	return (
		<div>
			<input
				placeholder={placeholder}
				type="text"
				className="px-4 py-2 border rounded"
				onChange={onChange}
                ref={ref}
			/>
		</div>
	);
}