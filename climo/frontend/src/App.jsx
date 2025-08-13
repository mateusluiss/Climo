import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Clima from "./components/Clima";
import Previsao from "./components/Previsao";
import PrevisaoHoje from "./components/PrevisaoHoje";
import data from "./paises.json";
import "dotenv/config";

function App() {
  const [value, setValue] = useState("");
  const [climaData, setClimaData] = useState(null);
  const [cidade, setCidade] = useState("Carregando...");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = async (searchTerm, atualizarInput) => {
    if (atualizarInput) {
      setValue(searchTerm);
    }
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

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

          fetch(url)
            .then((res) => res.json())
            .then((data) => {
              const cidadeDetectada =
                data.address.city || data.address.town || data.address.village;
              setCidade(cidadeDetectada);

              onSearch(cidadeDetectada, false);
            });
        },
        () => setCidade("Permissão negada")
      );
    } else {
      console.warn("Erro ao obter localização, usando padrão (Brasil)");
      onSearch("Brasil", false);
    }
  }, []);

  return (
    <div className="bg-fundo min-h-screen">
      <header className=" text-white flex flex-col border-b-1 border-gray-700 gap-5 p-5 place-items-center justify-between px-10 md:flex-row md:gap-0">
        <div className="flex place-items-center gap-3">
          <h1 className="text-2xl font-bold">climoo</h1>
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
                  onSearch(value.trim(), true);
                }
              }}
            ></input>
          </div>
          <div
            id="dropdown"
            className={`absolute bg-fundo rounded-2xl w-fit md:w-[10rem] transition-all duration-200 ease-in ${
              value &&
              data.some(
                (item) =>
                  item.nome.toLowerCase().startsWith(value.toLowerCase()) &&
                  item.nome.toLowerCase() !== value.toLowerCase()
              )
                ? "translate-y-0 opacity-100"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
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
                  onClick={() => onSearch(item.nome, true)}
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
        <Clima data={climaData} nomeCidade={cidade}></Clima>
        <Previsao data={climaData}></Previsao>
      </main>
    </div>
  );
}

export default App;
