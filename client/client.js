const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

// Conexión al servidor WebSocket
const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
    console.log('Conectado al servidor WebSocket');
});

ws.on('message', (data) => {
    console.log('Archivo recibido del servidor:', data);

    // Escribir el archivo JSON en el sistema de archivos
    const filePath = path.join(__dirname, '../data/output.json');
    fs.writeFile(filePath, data, 'utf8', (err) => {
        if (err) {
            console.error('Error al escribir el archivo:', err);
            return;
        }
        console.log('Archivo guardado en:', filePath);
    });
});

ws.on('close', () => {
    console.log('Conexión cerrada por el servidor');
});