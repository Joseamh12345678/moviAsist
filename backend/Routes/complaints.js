import express from 'express';
import multer from 'multer';
import Complaint from '../Models/ComplaintModel.js';

const router = express.Router();

// Configuración de multer para almacenar imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo
    }
});

const upload = multer({ storage: storage });

// Obtener todas las quejas
router.get('/', async (req, res) => {
    const complaints = await Complaint.find();
    res.send(complaints);
});

// Crear una nueva queja con imagen
router.post('/', upload.single('image'), async (req, res) => {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    let complaint = new Complaint({
        title,
        description,
        image
    });

    complaint = await complaint.save();
    res.send(complaint);
});

export default router;