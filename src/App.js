import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home';
import ListView from './Pages/ListView/ListView';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/listview' element={<ListView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
