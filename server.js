const express = require('express');
const path = require('path');
const app = express();

// Cambia '[nombre-de-tu-proyecto]' por el nombre de la carpeta generada en `dist`
const appFolder = path.join(__dirname, 'dist', 'erp-cartolito-v2');

// Servir los archivos estáticos desde la carpeta `dist`
app.use(express.static(appFolder));

// Redirigir todas las solicitudes al `index.html` de Angular
app.get('/*', (req, res) => {
  res.sendFile(path.join(appFolder, 'browser/index.html'));
});

// Iniciar el servidor en el puerto deseado

app.listen((process.env.PORT || 3001),()=>{
    
    console.log('Api ERP Cartolito corriendo en el puerto: ',app.get('port'));
    //initConfig.verifyAdmin();
});