import { Routes, Route } from 'react-router-dom';
import Getdata from './components/Getdata';
import Data from './components/Data';
import Header from './components/Header';

function App() {
  return (
    <div>

    <Header/>
    <Routes>
      <Route path="/" element={<Getdata />} />
      <Route path="/:id" element={<Data />} />
    </Routes>
    </div>
  );
}

export default App;
