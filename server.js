const express = require('express');
const path = require('path');
const app = express();

// Servir les fichiers statiques du build
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback pour toutes les autres routes (important pour SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Client server running on port ${PORT}`);
});
