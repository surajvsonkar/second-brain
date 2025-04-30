import { ReactElement } from 'react';

interface ButtonProps {
	variant: 'primary' | 'secondary';
	text: string;
	startIcon: ReactElement;
}

const variantClasses = {
	primary: 'bg-purple-600 text-white',
	secondary: 'bg-purple-200 text-purple-400',
};

const defaultStyles = 'px-4 py-2 rounded-md font-light flex items-center';

export function Button(props: ButtonProps) {
	return (
		<button className={variantClasses[props.variant] + ' ' + defaultStyles}>
			<div className='pr-2'>{props.startIcon}</div>
			{props.text}
		</button>
	);
}
