import './App.css';

import "bootstrap/dist/css/bootstrap.min.css.map";
import Home from './home/pages/Home';
import Navbar from './shared/components/Navbar';


function App() {
  return (
   <>
    <h1>Staffing Ai Network</h1>
   
    <Navbar/>
    <Home />
    </>
  );
}

export default App;
