import React, { useState } from "react";
import { Search } from "lucide-react";
import Clima from "./components/Clima";
import Previsao from "./components/Previsao";
import PrevisaoHoje from "./components/PrevisaoHoje";
import logo from "./assets/logo.svg";
import data from "./paises.json";

function App() {
  const [value, setValue] = useState("");
  const [climaData, setClimaData] = useState(null);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = async (searchTerm) => {
    setValue(searchTerm);
    //api to fetch search results

    try {
      const response = await fetch(
        `http://localhost:3000/api/clima?pais=${encodeURIComponent(
          searchTerm
        )}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar país");
      }

      const data = await response.json();
      setClimaData(data);
    } catch (error) {
      console.error(error);
      // Mostrar mensagem de erro para o usuário, se quiser
    }
  };

  return (
    <div className="bg-fundo min-h-screen">
      <header className=" text-white flex flex-col border-b-1 border-gray-700 gap-5 p-5 place-items-center justify-between px-10 md:flex-row md:gap-0">
        <div className="flex place-items-center gap-3">
          <img src={logo} className="bg-azul w-10 p-1 rounded-xl"></img>
          <h1 className="text-2xl font-bold">Climo</h1>
        </div>
        <div>
          <div className="bg-cinza p-2 rounded-xl flex place-items-center gap-4">
            <Search size={15} color="#d1d5dc" />
            <input
              type="search"
              placeholder="Procurar"
              className="outline-0 text-gray-200 text-sm"
              value={value}
              onChange={onChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSearch(value.trim());
                }
              }}
            ></input>
          </div>
          <div id="dropdown" className="absolute bg-fundo rounded-2xl w-fit">
            {data
              .filter((item) => {
                const searchTerm = value.toLowerCase();
                const nomePais = item.nome.toLowerCase();

                return (
                  searchTerm &&
                  nomePais.startsWith(searchTerm) &&
                  nomePais !== searchTerm
                );
              })
              .slice(0, 5)
              .map((item) => (
                <div
                  className="cursor-pointer hover:bg-cinza transition-all duration-100 ease-in-out"
                  onClick={() => onSearch(item.nome)}
                  id="dropdown-row"
                  key={item.nome}
                >
                  {item.nome}
                </div>
              ))}
          </div>
        </div>
      </header>
      <main className="flex flex-col gap-10 px-12 mt-5 lg:grid lg:grid-cols-[2fr_17rem] mx-auto pb-10">
        <Clima data={climaData}></Clima>
        <Previsao data={climaData}></Previsao>
      </main>
    </div>
  );
}

export default App;
