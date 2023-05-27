import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavigationBar from './components/NavigationBar';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './screens/Home';
import Stations from './screens/Stations';
import Journeys from './screens/Journeys';
import StationDetails from './screens/StationDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stations" element={<Stations />} />
          <Route path="/journeys" element={<Journeys />} />
          <Route path="/station" element={<StationDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
