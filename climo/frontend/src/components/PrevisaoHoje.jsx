import React from "react";
import ClimaIcon from "./ClimaIcon";

function PrevisaoHoje({ data }) {
  if (!data)
    return (
      <div className="bg-cinza2 h-fit w-full rounded-xl p-6 shadow-xl border border-gray-800">
        <p className="text-white">Carregando...</p>
      </div>
    );

  return (
    <div>
      <div className="mt-8 bg-cinza2 h-fit w-full rounded-xl p-6 shadow-xl border border-gray-800">
        <h2 className="text-white text-xl font-semibold">Previsão de hoje</h2>
        <div className="grid grid-cols-3 justify-between mt-5 md:flex md:flex-row place-items-center">
          {data.previsao_hoje.map(({ time, temp_c, condition }) => {
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
