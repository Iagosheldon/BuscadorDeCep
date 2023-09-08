import { useState } from "react"
import { FiSearch } from "react-icons/fi";
import './style.css'

import api from './services/api.js';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] =useState({});

  async function handleSearch(){

    if(input === ''){
      alert('Digite algo !!!')
      return;
    }
    try{
      const response = await api.get(`${input}/json/`)
      setCep(response.data)
      setInput("");
      
    } catch{
      alert("ops, Deu um erro ao buscar")
      setInput("")
      
    }

  }
  
  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>


      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu cep..."
        value={input}
        onChange={(e) => setInput(e.target.value)}>

        </input>
        <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color='#000'></FiSearch>
        </button>
      </div>

      {Object.keys(cep).length > 0 &&(
              <main className="main">
                <h2> CEP {cep.cep}</h2>
        
                <span>{cep.logradouro}</span>
                <span>{cep.complemento}</span>
                <span>{cep.bairro}</span>
                <span>{cep.localidade}- {cep.uf} </span>
                <span> {cep.ddd}</span>
      
            </main>
        
      )}

    </div>
  );
}

export default App;
