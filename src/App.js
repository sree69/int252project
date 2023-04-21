import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Display from './pages/Display';
import Home from './pages/Home';
import Popular from './pages/Popular';
import Upcoming from './pages/Upcoming';
import Toprated from './pages/Toprated';
import Searchdisplay from './pages/Searchdisplay';
import Latest from './pages/Latest';
import Tvhome from './pages/Tvhome';
import Tvdisplay from './pages/Tvdisplay';
import Tvsearchdisplay from './pages/Tvsearchdisplay';
import Displaydemo from './pages/Displaydemo';
import Tvpopular from './pages/Tvpopular';



function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        {/* <Route path='/Display/:id' element={<Display/>}></Route> */}
        <Route path='/Displaydemo/:id' element={<Displaydemo/>}></Route>
        <Route path='/Popular' element={<Popular/>}></Route>
        <Route path='/Upcoming' element={<Upcoming/>}></Route>
        <Route path='/Toprated' element={<Toprated/>}></Route>
        <Route path='/Latest' element={<Latest/>}></Route>
        <Route path='/Searchdisplay/:name' element={<Searchdisplay/>}></Route>
        <Route path='/Searchdisplay/:name/Displaydemo/:id' element={<Displaydemo/>}></Route>


        <Route path='/Tvhome' element={<Tvhome/>}></Route>
        <Route path='/Tvhome/Tvdisplay/:id' element={<Tvdisplay/>}></Route>
        <Route path='/Tvsearchdisplay/:name' element={<Tvsearchdisplay/>}></Route>
        <Route path='/Tvpopular/:name' element={<Tvpopular/>}></Route>

        
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
