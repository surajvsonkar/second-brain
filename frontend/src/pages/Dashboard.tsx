import { useEffect, useState } from 'react';
import '../App.css';
import { Button } from '../components/Button';
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Card } from '../components/Card';
import { CreateContentModal } from '../components/CreateContentModal';
import { Sidebar } from '../components/Sidebar';
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import { BACKEND_URL } from '../config';

function Dashboard() {
	const [modalOpen, setModalOpen] = useState(false);
    const {contents, refresh} = useContent();

	useEffect(()=> {
		refresh()
	}, [modalOpen])

	return (
		<div>
			<Sidebar />
			<div className="p-4 ml-76 min-h-screen bg-gray-100 border">
				<CreateContentModal
					open={modalOpen}
					onClose={() => {
						setModalOpen(false);
					}}
				/>
				<div className="flex justify-end gap-4">
					<Button
						onClick={() => {
							setModalOpen(true);
						}}
						variant="primary"
						text="Add Content"
						startIcon={<PlusIcon />}
					/>
					<Button
						onClick={async ()=> {
							const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
								share: true
							}, {
								headers: {
									Authorization: localStorage.getItem("token")
								}
							})

						const shareUrl = `http://localhost:5173/share/${response.data.hash}`

						navigator.clipboard.writeText(shareUrl)
						}
					
					}

						variant="secondary"
						text="Share Brain"
						startIcon={<ShareIcon />}
					/>
				</div>
				<div className="flex gap-4 flex-wrap">
                    {contents.map(({type,link,title})=> <Card
						type={type}
						link={link}
						title={title}
					/>)}
					
				</div>
			</div>
		</div>
	);
}

export default Dashboard;