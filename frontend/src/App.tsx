import { useState } from 'react';
import './App.css';
import { Button } from './components/Button';
import { PlusIcon } from './icons/PlusIcon';
import { ShareIcon } from './icons/ShareIcon';
import { Card } from './components/Card';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="p-4">
			<div className="flex justify-end gap-4">
				<Button variant="primary" text="Add Content" startIcon={<PlusIcon />} />
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
	);
}

export default App;
