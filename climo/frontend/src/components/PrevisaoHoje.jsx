import React, { useEffect, useState } from "react";
import ClimaIcon from "./ClimaIcon";

function PrevisaoHoje() {
  const [previsaoHoje, setPrevisaoHoje] = useState([]);

  useEffect(() => {
    // Buscar a API que retorna a previsão com os horários filtrados
    fetch("http://localhost:3000/api/clima")
      .then((res) => res.json())
      .then((data) => {
        // data.previsao_hoje é o array já filtrado que enviamos
        setPrevisaoHoje(data.previsao_hoje);
      })
      .catch((err) => {
        console.error("Erro ao carregar previsão:", err);
      });
  }, []);

  return (
    <div>
      <div className="mt-8 bg-cinza2 h-fit w-full rounded-xl p-6 shadow-xl border border-gray-800">
        <h2 className="text-white text-xl font-semibold">Previsão de hoje</h2>
        <div className="flex justify-between mt-5">
          {previsaoHoje.map(({ time, temp_c, condition }) => {
            // Extrair só o horário (HH:mm) da string time '2025-08-10 06:00'
            const horario = time.split(" ")[1];
            return (
              <div
                key={time}
                className="flex flex-col items-center p-4 rounded-lg w-20"
              >
                <span className="text-gray-500 text-xs mb-2">{horario}</span>
                <ClimaIcon clima={condition.text} size={35}></ClimaIcon>
                <span className="text-white text-xs mt-2 font-semibold">
                  {Math.round(temp_c)}°
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PrevisaoHoje;
