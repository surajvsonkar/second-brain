import { useRef, useState } from 'react';
import { CrossIcon } from '../icons/CrossIcon';
import { Button } from './Button';
import { Input } from './Input';
import axios from 'axios';
import { BACKEND_URL } from '../config';

enum ContentType {
	Youtube = "youtube",
	Twitter = "twitter"
}

export function CreateContentModal({ open, onClose }) {

	const [type, setType] = useState(ContentType.Youtube)

	const titleRef = useRef<HTMLInputElement>(null)
	const linkRef = useRef<HTMLInputElement>(null)

	async function addContent(){
		const title = titleRef.current?.value;
		const link = linkRef.current?.value;
		await axios.post(`${BACKEND_URL}/api/v1/content`, {
			title,link,type
		}, {
			headers: {
				"Authorization" : localStorage.getItem("token")
			}
		})
		
		onClose()
	}

	return (
		<div>
			{open &&<div>
				<div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
					
				</div>
				<div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
				<div className="flex flex-col justify-center">
						<span className="bg-white opacity-100 p-4 rounded">
							<div className="flex justify-end mb-2">
								<div onClick={onClose} className="cursor-pointer">
									<CrossIcon />
								</div>
							</div>
							<div className="flex flex-col gap-4 mb-2">
								<Input ref={titleRef} placeholder='Title'/>
								<Input ref={linkRef} placeholder='Link'/>
							</div>
							<div>
								<h1>Type</h1>
								<div className='flex gap-1 p-4'>
									<Button onClick={()=> {
										setType(ContentType.Youtube)
									}} text='Youtube' variant={type === ContentType.Youtube ? "primary" : "secondary"} />
									<Button onClick={()=> {
										setType(ContentType.Twitter)
									}} text='Twitter' variant={type === ContentType.Twitter ? "primary" : "secondary"} />
								</div>
							</div>
							<div className="flex justify-center">
								<Button onClick={addContent} variant="primary" text="Submit" />
							</div>
						</span>
					</div>
				</div>
			</div>}
		</div>
	);
}

