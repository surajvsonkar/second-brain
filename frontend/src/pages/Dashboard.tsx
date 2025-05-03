import { useState } from 'react';
import '../App.css';
import { Button } from '../components/Button';
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Card } from '../components/Card';
import { CreateContentModal } from '../components/CreateContentModal';
import { Sidebar } from '../components/Sidebar';

function Dashboard() {
	const [modalOpen, setModalOpen] = useState(false);

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
						variant="secondary"
						text="Share Brain"
						startIcon={<ShareIcon />}
					/>
				</div>
				<div className="flex gap-4">
					<Card
						type="twitter"
						link="https://x.com/msurajhu/status/1917584848425808299"
						title="latest tweet"
					/>
					<Card
						type="youtube"
						link="https://www.youtube.com/watch?v=W0JMngTSw6A"
						title="favourite song"
					/>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;