require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const API_KEY = process.env.API_KEY;
let pais = "EUA";

app.use(cors());

app.get("/api/clima", async (req, res) => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${pais}&lang=pt`
    );

    const forecast = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${pais}&days=7&lang=pt`
    );
    const data = await response.json();
    const fdata = await forecast.json();

    //console.log(fdata.forecast.forecastday);
    // Aqui você pode enviar só o que quiser pro frontend, ex:
    res.json({
      pais: data.location.country,
      cidade: data.location.name,
      regiao: data.location.region,
      temperatura: data.current.temp_c,
      clima: data.current.condition.text,
      previsao: fdata.forecast.forecastday,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o clima" });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
