import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmpreendimentosList from './pages/EmpreendimentosList';
import EmpreendimentoForm from './pages/EmpreendimentoForm';
import EmpreendimentoView from './pages/EmpreendimentoView';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <h1>Projeto Capital</h1>
          <p>Sistema de Gerenciamento de Empreendimentos</p>
        </header>
        <main className="main">
          <Routes>
            <Route path="/" element={<EmpreendimentosList />} />
            <Route path="/empreendimentos" element={<EmpreendimentosList />} />
            <Route path="/empreendimentos/novo" element={<EmpreendimentoForm />} />
            <Route path="/empreendimentos/:id" element={<EmpreendimentoView />} />
            <Route path="/empreendimentos/:id/editar" element={<EmpreendimentoForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
