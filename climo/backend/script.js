require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api/clima", async (req, res) => {
  try {
    const paisQuery = req.query.pais || "Brasil"; // usa o query param ou o default
    const paisTratado = encodeURIComponent(paisQuery);
    var pais = req.query.pais;

    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${paisTratado}&lang=pt`
    );

    const forecast = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${paisTratado}&days=3&lang=pt`
    );

    const hforecast = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${paisTratado}&days=1&lang=pt`
    );

    const data = await response.json();
    const fdata = await forecast.json();
    const fhdata = await hforecast.json();

    const horarios = ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00"];
    const horasSelecionadas = fhdata.forecast.forecastday[0].hour.filter(
      (hora) => {
        const horaStr = hora.time.split(" ")[1];
        return horarios.includes(horaStr);
      }
    );

    const previsaoFiltrada = horasSelecionadas.map((hora) => ({
      time: hora.time,
      temp_c: hora.temp_c,
      condition: {
        text: hora.condition.text,
      },
    }));

    res.json({
      pais: data.location.country,
      cidade: data.location.name,
      regiao: data.location.region,
      temperatura: data.current.temp_c,
      clima: data.current.condition.text,
      previsao: fdata.forecast.forecastday,
      previsao_hoje: previsaoFiltrada,
    });

    // ...
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o clima" });
  }
});

app.listen(PORT, () => console.log("Servidor rodando na porta 3000"));
