import { useEffect, useState } from "react";
import React from "react";
import ClimaIcon from "./ClimaIcon";

function Clima() {
  const [clima, setClima] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/clima")
      .then((res) => res.json())
      .then((data) => setClima(data))
      .catch((err) => console.error(err));
  }, []);

  if (!clima)
    return (
      <div className="bg-cinza2 h-fit w-full rounded-xl p-6 shadow-xl border border-gray-800">
        <p className="text-white">Carregando...</p>
      </div>
    );

  return (
    <div className="bg-cinza2 h-fit w-full rounded-xl p-6 shadow-xl border border-gray-800">
      <div className="flex justify-between">
        <div>
          <h1 className="text-white text-3xl font-bold">{clima.cidade}</h1>
          <p className="col-start-1 text-gray-400 text-sm">{`${clima.regiao}, ${clima.pais}`}</p>
        </div>
        <ClimaIcon clima={clima.clima} size={80}></ClimaIcon>
      </div>
      <h2 className="text-6xl text-white font-light">{clima.temperatura}°</h2>
      <p className="mt-2 text-gray-400 text-sm">{clima.clima}</p>
    </div>
  );
}

export default Clima;
