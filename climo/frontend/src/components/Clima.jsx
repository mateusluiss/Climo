import React from "react";
import ClimaIcon from "./ClimaIcon";
import PrevisaoHoje from "./PrevisaoHoje";

function Clima({ data, nomeCidade }) {
  if (!data) {
    return (
      <div className="bg-cinza2 h-fit w-full rounded-xl p-6 shadow-xl border border-gray-800">
        <p className="text-white">Carregando...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-cinza2 h-fit w-full rounded-xl p-6 shadow-xl border border-gray-800">
        <div className="flex justify-between">
          <div>
            <h1 className="text-white text-3xl font-bold">{nomeCidade}</h1>
            <p className="col-start-1 text-gray-400 text-sm">{`${data.regiao}, ${data.pais}`}</p>
          </div>
          <ClimaIcon clima={data.clima} size={80}></ClimaIcon>
        </div>
        <h2 className="text-6xl text-white font-light">{data.temperatura}°</h2>
        <p className="mt-2 text-gray-400 text-sm">{data.clima}</p>
      </div>
      <PrevisaoHoje data={data}></PrevisaoHoje>
    </div>
  );
}

export default Clima;
