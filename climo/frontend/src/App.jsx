import React from "react";
import { Search } from "lucide-react";
import Clima from "./components/Clima";
import Previsao from "./components/Previsao";
import PrevisaoHoje from "./components/PrevisaoHoje";
import logo from "./assets/logo.svg";

function App() {
  return (
    <div className="bg-fundo h-screen">
      <header className=" text-white flex border-b-1 border-gray-700 p-5 place-items-center justify-between px-10">
        <div className="flex place-items-center gap-3">
          <img src={logo} className="bg-azul w-10 p-1 rounded-xl"></img>
          <h1 className="text-2xl font-bold">Climo</h1>
        </div>
        <div className="bg-cinza p-2 rounded-xl flex place-items-center gap-4">
          <Search size={15} color="#d1d5dc" />
          <input
            type="search"
            placeholder="Search for cities"
            className="outline-0 text-gray-200 text-sm"
          ></input>
        </div>
      </header>
      <main className="flex flex-col gap-10 px-13 mt-5 md:grid md:grid-cols-[2fr_17rem]">
        <Clima></Clima>
        <Previsao></Previsao>
      </main>
    </div>
  );
}

export default App;
