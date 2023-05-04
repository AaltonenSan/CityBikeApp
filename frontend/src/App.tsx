import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Stations from './components/Stations';
import Journeys from './components/Journeys';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/stations' element={<Stations />} />
          <Route path='/journeys' element={<Journeys />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
