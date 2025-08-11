import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ClimaIcon from "./ClimaIcon";
import Clima from "./Clima";

function Previsao({ data }) {
  if (!data)
    return (
      <div className="bg-cinza2 h-fit w-full rounded-xl p-6 shadow-xl border border-gray-800">
        <p className="text-white">Carregando...</p>
      </div>
    );

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="bg-cinza2 h-fit w-full rounded-xl p-6 shadow-xl border border-gray-800 col-start-2">
      <h2 className="text-white font-medium text-2xl mb-8">Previsão</h2>
      <div>
        <div className="flex w-full justify-between place-items-center">
          <p className="text-white">Hoje</p>
          <ClimaIcon clima={data.clima} size={20}></ClimaIcon>
          <p className="text-xs text-gray-500">
            {data.clima.trim().split(/\s+/).slice(-2).join(" ")}
          </p>
        </div>
        {data.previsao.map((dia) => (
          <div key={dia.date} className="flex place-items-center mt-3">
            <div className="flex w-full justify-between place-items-center">
              <p className="text-gray-500 text">
                {capitalize(
                  format(dia.date, "EEEE", { locale: ptBR }).replace(
                    "-feira",
                    ""
                  )
                )}
              </p>

              <ClimaIcon clima={dia.day.condition.text} size={20}></ClimaIcon>

              <p className="text-xs text-gray-500">
                {dia.day.condition.text.trim().split(/\s+/).slice(-2).join(" ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Previsao;
