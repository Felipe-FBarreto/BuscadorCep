import React from 'react';
import { FiSearch } from 'react-icons/fi';
import Button from './Components/Button';
import Input from './Components/Input';
import './App.css';
import api from './services/api';

function App() {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);
  const [dados, setDados] = React.useState({});

  function handleChange({ target }) {
    setValue(target.value);
    if (value !== '') {
      setError(null);
    }
    setDados({});
  }

  async function handleSearch(event) {
    event.preventDefault();
    if (value === '') {
      setError('Digite um Cep Valido');
    }
    try {
      const { data } = await api.get(`${value}/json`);
      setDados(data);

      setValue('');
      if (data.erro === true) {
        setError('Digite um Cep Valido');
      }
    } catch (err) {
      setError('Digite um Cep Valido');
      setDados({});
    }
  }
  function hendleBlur() {
    if (value === '' || value.length < 8) {
      setError('Digite um Cep Valido');
    }
    if (value === Number) {
      setError(null);
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador Cep</h1>
      <div className="containerInput">
        <form onSubmit={handleSearch}>
          <Input
            type="number"
            value={value}
            placeholder="Digite seu cep..."
            onChange={handleChange}
            onBlur={hendleBlur}
          />

          <Button>
            <FiSearch size={25} color="#fff" />
          </Button>
        </form>
      </div>
      <div className="error">{error && <p>{error}</p>}</div>
      {Object.keys(dados).length > 1 && (
        <main className="main">
          <h2>CEP: {dados.cep}</h2>
          <span>{dados.logradouro} </span>
          {dados.complemento === '' ? (
            <span style={{ display: 'none' }}></span>
          ) : (
            <span>Complemento: {dados.complemento}</span>
          )}
          <span>{dados.bairro}</span>
          <span>
            Cidade: {dados.localidade} {dados.uf}
          </span>
          <span>DDD: {dados.ddd}</span>
        </main>
      )}
    </div>
  );
}

export default App;
