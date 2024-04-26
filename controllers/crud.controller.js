import path from "path"
import { readFile, writeFile } from 'fs/promises'

const __dirname = import.meta.dirname
const pathFile = path.join(__dirname, '../data/')

const get = (req, res) => {
    res.render('inicio')
}

const crearArchivo = async (req, res) => {
    const nombreArchivo = req.body.nombreArchivo;
    const contenidoArchivo = req.body.contenidoArchivo

    const filePath = path.join(pathFile, `${nombreArchivo}.json`)

    try {

        await writeFile(filePath, contenidoArchivo);
        const lectura = await readFile(filePath, 'utf-8')

        console.log(lectura)
        if (lectura) {
            return res.render('inicio', { success: true });
        } else {
            return res.render('inicio', { success: false, error: 'Error al crear el archivo' });
        }


    } catch (err) {

        console.error('Error al escribir el archivo:', err);
        res.render('inicio', { success: false, error: 'Error al crear el archivo' });
    }
}

const leer = (req, res) => {
    try {
        const leerArchivo = req.body.leerArchivo
        res.json(leerArchivo)
    } catch (error) {
        console.error('Error al leer:', err);
        res.render('inicio');
    }

}

export const crudController = {
    get,
    crearArchivo,
    leer
}