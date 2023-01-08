import './App.css';
import Home from './Components/Home';

import { useSelector } from 'react-redux'
import Questions from './Components/QPage';
function App() {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div className={`${theme}`}>
      <div className="App h-screen w-screen flex justify-center 
      text-center items-center bg-[#EAFDFC] dark:bg-[#0A2647] 
      transition ease-in delay-150">
        <Home/>
      </div>
    </div>
  );
}

export default App;
