import { ReactElement } from 'react';

interface SidebarItemProps {
	text: string;
	icon: ReactElement;
}

export function SidebarItems({ text, icon }: SidebarItemProps) {
	return ( 
		<div className="flex text-gray-700 items-center cursor-pointer hover:bg-gray-200 rounded transition-all pl-4 duration-150">
			<div className='p-2'>{icon}</div>
		<div className='p-2'>{text}</div>
		</div>
	);
}
