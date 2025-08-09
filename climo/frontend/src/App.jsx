import React from "react";
import { Search } from "lucide-react";
import Clima from "./components/Clima";
import Previsao from "./components/Previsao";

function App() {
  return (
    <div className="bg-fundo h-screen">
      <header className=" text-white flex border-b-1 border-gray-700 p-5 place-items-center justify-between px-10">
        <h1 className="text-2xl font-bold">Climo</h1>
        <div className="bg-cinza p-2 rounded-xl flex place-items-center gap-4">
          <Search size={15} color="#d1d5dc" />
          <input
            type="search"
            placeholder="Search for cities"
            className="outline-0 text-gray-200 text-sm"
          ></input>
        </div>
      </header>
      <main className="grid grid-cols-[2fr_13rem] gap-10 px-13 mt-5">
        <Clima></Clima>
        <Previsao></Previsao>
      </main>
    </div>
  );
}

export default App;
