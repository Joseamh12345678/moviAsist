import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import complaints from './Routes/complaints.js';
import { createUser, deleteUser } from './Controllers/UserController.js';
try {
    mongoose.connect('mongodb://localhost:27017/ChatVoy');
    console.log('Successfully connected to MongoDB');
} catch (error) {
    console.log(error);
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Servir archivos estáticos desde la carpeta uploads

app.use('/api/complaints', complaints);

// Rutas de usuario
app.post('/api/user', createUser);
app.delete('/api/user/:id', deleteUser);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

