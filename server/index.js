const express = require('express');
const cors = require('cors');
const app = express();

const router = require('./router');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(router);


app.listen(port, () => {
  console.log(`🎪 Server running at: http://localhost:${port} 🎪`);
});