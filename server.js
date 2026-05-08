const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "https://hotspotman.netlify.app" }));

let computer;

app.get("/computer", async (req, res) => {
  if (computer) {
    res.send(computer);
    return;
  }
  const resp = await axios.post(
    "https://engine.hyperbeam.com/v0/vm",
    {},
    {
      headers: { Authorization: `Bearer ${process.env.HB_API_KEY}` },
    }
  );
  computer = resp.data;
  res.send(computer);
});

app.listen(process.env.PORT || 8080, () => console.log("Server running"));