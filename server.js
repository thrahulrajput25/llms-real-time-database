require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const txRoutes = require('./routes/transactionRoutes');

connectDB();
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }
});
app.use(express.json());
app.use('/api/transactions', txRoutes);

io.on('connection', sock => console.log('Client connected:', sock.id));
app.set('socketio', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
