import { Router } from "express"
import { crudController } from "../controllers/crud.controller.js"

const router = Router()

router.get('/', crudController.get)

router.post('/', crudController.crearArchivo)

router.get('/leer', crudController.leer)

router.get('/renombrar', crudController.renombrar)

router.get('/eliminar', crudController.eliminarArchivo)

// router.leer('/leer', crudController.leer)

export default router;