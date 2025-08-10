import React from "react";
import { Sun, Cloudy, CloudRain } from "lucide-react";

function ClimaIcon({ clima, size }) {
  return clima === "Céu limpo " || clima === "Sol" ? (
    <Sun color="#ffc800" size={size} className="col-start-2" />
  ) : clima === "Nublado" || clima === "Parcialmente nublado" ? (
    <Cloudy size={size} color="#446fee" className="col-start-2" />
  ) : (
    <CloudRain size={size} color="#1f59e0" className="col-start-2" />
  );
}

export default ClimaIcon;
