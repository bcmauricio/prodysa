const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Card = require('./models/card');  // Asegúrate de que la ruta del modelo sea correcta

const app = express();

// Middleware para permitir CORS y manejar JSON
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));  // Servir imágenes estáticamente

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/cardsDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Configuración de multer para guardar archivos en la carpeta 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Ruta para obtener una tarjeta por su ID
app.get('/api/cards/:id', async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Tarjeta no encontrada' });
    }
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la tarjeta' });
  }
});

// Ruta para actualizar una tarjeta por su ID
app.put('/api/cards/:id', upload.array('newImages', 5), async (req, res) => {
  try {
    const cardId = req.params.id;
    const updateData = req.body;

    // Procesar imágenes existentes
    let updatedImages = [];
    if (req.body.existingImages) {
      updatedImages = JSON.parse(req.body.existingImages);
    }

    // Procesar nuevas imágenes
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const imgData = fs.readFileSync(file.path);
        updatedImages.push(imgData.toString('base64')); // Convertir a base64
      });
    }

    // Actualizar la tarjeta con los nuevos datos e imágenes
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { ...updateData, images: updatedImages },
      { new: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: 'Tarjeta no encontrada' });
    }

    res.status(200).json({ message: 'Tarjeta actualizada correctamente', updatedCard });
  } catch (error) {
    console.error('Error al actualizar la tarjeta:', error);
    res.status(500).json({ error: 'Error al actualizar la tarjeta' });
  }
});

// Ruta para eliminar una tarjeta por su ID
app.delete('/api/cards/:id', async (req, res) => {
  try {
    const cardId = req.params.id;
    const deletedCard = await Card.findByIdAndDelete(cardId);
    if (!deletedCard) {
      return res.status(404).json({ message: 'Tarjeta no encontrada' });
    }
    res.status(200).json({ message: 'Tarjeta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarjeta' });
  }
});

// Puerto del servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});




