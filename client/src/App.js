import './App.css';
import "bootstrap/dist/css/bootstrap.min.css.map";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './home/pages/Home';
import NavBar from './shared/components/NavBar';
import SignUp from './home/pages/SignUp';

function App() {
  return (
   <>
   <BrowserRouter>
   <NavBar/>
    
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/register' element={<SignUp />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
