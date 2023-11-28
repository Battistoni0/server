const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadsallo');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

exports.upload = upload.single('myFile');

exports.uploadFile = (req, res) => {
    try {
        // Lógica para manejar el archivo subido
        console.log('Archivo subido:', req.file);
        res.send('Archivo subido exitosamente');
    } catch (error) {
        console.error('Error al manejar el archivo:', error);
        res.status(500).send('Error al manejar el archivo');
    }
};

exports.getUploadedFiles = (req, res) => {
    try {
        // Obtener la lista de archivos en la carpeta 'uploadsallo'
        const files = fs.readdirSync('uploadsallo');
        console.log('Archivos subidos:', files);
        res.json({ files });
    } catch (error) {
        console.error('Error al obtener archivos subidos:', error);
        res.status(500).send('Error al obtener archivos subidos');
    }
};


// Modificar el controlador en controllers/uploadallo.js
exports.getFileContent = (req, res) => {
    console.log('Entró al controlador getFileContent');
    const fileName = req.params.fileName;
    const filePath = path.join('uploadsallo', fileName);

    // Verificar si el archivo existe
    if (fs.existsSync(filePath)) {
        // Crear un flujo de lectura y enviarlo como respuesta
        const fileStream = fs.createReadStream(filePath);
        res.status(200)
            .header('Content-Type', 'application/pdf')
            .header('Content-Disposition', `inline; filename="${fileName}"`)
            .header('Cache-Control', 'no-cache')
            .header('Pragma', 'no-cache')
            .header('Expires', '0')
            .send(fileStream);
    } else {
        res.status(404).send('Archivo no encontrado');
    }
};