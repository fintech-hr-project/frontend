import { ArrowLeft, SearchX } from 'lucide-react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="not-found">
      <SearchX size={52} aria-hidden="true" />
      <h1>Página não encontrada</h1>
      <p>O endereço acessado não existe ou foi movido.</p>
      <Link className="button button-primary" to="/">
        <ArrowLeft size={17} aria-hidden="true" /> Voltar para a visão geral
      </Link>
    </main>
  );
}

export default NotFound;
