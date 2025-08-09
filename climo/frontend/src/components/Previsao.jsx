import React, { useEffect, useState } from "react";

function Previsao() {
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

  //   const climaIcon = (clima) => {
  //     return clima === "Céu limpo " || clima === "Sol" ? (
  //       <Sun color="#ffc800" size={80} className="col-start-2" />
  //     ) : clima === "Nublado" || clima === "Parcialmente nublado" ? (
  //       <Cloudy size={80} color="#446fee" className="col-start-2" />
  //     ) : (
  //       <CloudRain size={48} color="#1f59e0" />
  //     );
  //   };

  return (
    <div className="bg-cinza2 h-[25rem] w-full rounded-xl p-6 shadow-xl border border-gray-800 col-start-2">
      <h2 className="text-white font-medium text-xl">Previsão</h2>
      {clima.previsao.map((dia) => (
        <div key={dia.date} className="flex ">
          <p>{dia.date}</p>
          <p>Máx: {dia.day.maxtemp_c}°C</p>
          <p>Mín: {dia.day.mintemp_c}°C</p>
          <p>{dia.day.condition.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Previsao;
