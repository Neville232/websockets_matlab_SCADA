const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

// Configuración del servidor WebSocket
const wss = new WebSocket.Server({ port: 8080 });

console.log('Servidor WebSocket escuchando en el puerto 8080');

// Ruta del archivo JSON
const filePath = path.join(__dirname, '../data/input.json');

// Escucha conexiones de clientes
wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    // Enviar el archivo inicial al cliente
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            ws.send(JSON.stringify({ error: 'Error al leer el archivo' }));
            return;
        }
        ws.send(data);
        console.log('Archivo enviado al cliente');
    });

    // Observar cambios en el archivo
    fs.watch(filePath, (eventType) => {
        if (eventType === 'change') {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error al leer el archivo:', err);
                    ws.send(JSON.stringify({ error: 'Error al leer el archivo' }));
                    return;
                }
                ws.send(data);
                console.log('Archivo actualizado enviado al cliente');
            });
        }
    });

    // Manejar mensajes del cliente
    ws.on('message', (message) => {
        console.log('Mensaje recibido del cliente:', message);
    });

    // Manejar la desconexión del cliente
    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});