const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "*" }));

let computer;

app.get("/computer", async (req, res) => {
  if (computer) {
    res.send(computer);
    return;
  }
  try {
    const resp = await axios.post(
      "https://engine.hyperbeam.com/v0/vm",
      {},
      {
        headers: { Authorization: `Bearer ${process.env.HB_API_KEY}` },
      }
    );
    computer = resp.data;
    res.send(computer);
  } catch (err) {
    console.error("Hyperbeam error:", err.message);
    res.status(500).send({ error: err.message });
  }
});

app.listen(process.env.PORT || 8080, () => console.log("Server running"));