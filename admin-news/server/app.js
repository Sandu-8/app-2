const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000'] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/post-news', (req, res) => {
  try {
  const data = axios
    .post(`https://rlpvi3pk9b.execute-api.us-east-1.amazonaws.com/testare`, req.body, {
      headers: {"Content-Type": "application/json", "Accept": "*/*", "Connection": "keep-alive", "Access-Control-Allow-Origin": "*"},
    });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(data);
  } catch {
    res.status(401).send('Unauthorized');
  }
})

app.use("/get-news", async (req, res) => {
  axios.get("https://2z74pq8swe.execute-api.us-east-1.amazonaws.com/get").then(response =>  res.status(200).send(response.data)).catch((error) => {
    res.status(401).send('Unauthorized');
  })

})

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
