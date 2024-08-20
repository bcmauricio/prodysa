import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CardList from './components/CardList';  // Componente para listar las tarjetas
import EditCard from './components/EditCard';  // Componente para editar una tarjeta
import CardPage from './components/CardPage';  // Componente para ver una tarjeta
import CreateCard from './components/CreateCard';  // Componente para capturar una nueva tarjeta

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirigir automáticamente de la raíz a la página de crear tarjeta */}
        <Route path="/" element={<Navigate to="/create" />} />

        {/* Ruta para capturar una nueva tarjeta */}
        <Route path="/create" element={<CreateCard />} />

        {/* Ruta para listar las tarjetas */}
        <Route path="/cards" element={<CardList />} />

        {/* Ruta para editar una tarjeta existente */}
        <Route path="/edit/:id" element={<EditCard />} />

        {/* Ruta para ver una tarjeta específica */}
        <Route path="/card/:id" element={<CardPage />} />
      </Routes>
    </Router>
  );
}

export default App;






