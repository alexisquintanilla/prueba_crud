import path from "path"
import { readFile, writeFile, unlink, rename } from 'fs/promises'

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
        return res.render('inicio', { success: true });
    } catch (err) {

        console.error('Error al escribir el archivo:', err);
        res.render('inicio', { success: false, error: 'Error al crear el archivo' });
    }
}

const leer = async (req, res) => {
    const leerArchivo = req.query.leerArchivo;
    console.log(leerArchivo)
    const filePath = path.join(pathFile, `${leerArchivo}.json`)
    console.log(filePath)
    try {
        const lectura = await readFile(filePath, 'utf-8')
        console.log(lectura)
        return res.json({ lectura })
    } catch (error) {
        console.error('Error al leer:', error);
        res.render('errorLeer', { lectura: false });
    }
}

const renombrar = async (req, res) => {
    const nombreArchivo = req.query.nombreArchivo
    const newNombreArchivo = req.query.newNombreArchivo
    const filePath = path.join(pathFile, `${nombreArchivo}.json`)
    const newFilePath = path.join(pathFile, `${newNombreArchivo}.json`)


    console.log(filePath)
    console.log(newFilePath)
    try {
        await rename(filePath, newFilePath)
        res.render('renombrar', { nombreArchivo, newNombreArchivo });
    } catch (error) {
        console.error('Error al leer:', error);
        res.render('errorLeer');
    }
}


const eliminarArchivo = async (req, res) => {
    const eliminarArchivo = req.query.eliminarArchivo;
    console.log(eliminarArchivo)
    const filePath = path.join(pathFile, `${eliminarArchivo}.json`)
    console.log(filePath)
    try {
        const lectura = await unlink(filePath)
        return res.render('eliminar')

    } catch (error) {
        console.error('Error al leer:', error);
        res.render('errorLeer');
    }
}

export const crudController = {
    get,
    crearArchivo,
    leer,
    eliminarArchivo,
    renombrar
}