import {Complaint} from '../Models/ComplaintModel.js';


    export const createComplaint = async (req, res) => {
    try {
        title = req.body.title;
        description = req.body.description;
        date = req.body.date;
        image = req.body.image;
        if (!title || !description || !date || !image) {
            res.status(400).json({
                "msg": "Parametros Invalidos"
            })
        }
        const complaint = {
            title,
            description,
            date,
            image
        };
        await Complaint.create(complaint);
        res.status(200).json({
            "msg": "Queja creada con exito!"
        })

        
    } catch (error) {
        res.status(500).json({
            "msg": "Ocurrio un error al crear la queja"
        })
    }
    }
