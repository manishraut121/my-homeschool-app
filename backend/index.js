// backend/index.js
require('dotenv').config();
const app = require('./src/app');

// You can configure port with an ENV variable or default to 8080 for Cloud Run
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
