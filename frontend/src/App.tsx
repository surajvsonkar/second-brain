import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Button, ButtonVariants } from './components/ui/Button';
import { Plusicon } from './icons/Plusicon';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<h1 className="text-7xl font-bold underline">Hello world!</h1>
      <Button variants={"primary"} size='sm' onClick={()=> {console.log("button is clicked")}} text='share' startIcon={<Plusicon size='lg'/>}/>
      <Button variants={"secondary"} size='md' onClick={()=> {console.log("button is clicked")}} text='share'/> 
      <Button variants={"primary"} size='lg' onClick={()=> {console.log("button is clicked")}} text='share'/>
		</>
	);
}

export default App;
