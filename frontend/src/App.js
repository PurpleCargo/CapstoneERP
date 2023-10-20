import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import Inventario from './pages/Inventario';
import Recetas from './pages/Recetas';
import Restock from './pages/Restock';
import Ventas from './pages/Ventas';

function App() {
  return (
    <>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insumos" element={<Inventario />} />
          <Route path="/recetas" element={<Recetas />} />
          <Route path="/restock" element={<Restock />} />
          <Route path="/ventas" element={<Ventas />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
