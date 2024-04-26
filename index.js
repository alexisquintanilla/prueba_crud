import express from 'express'
import { engine } from 'express-handlebars';
import router from './routes/crud.route.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ruta absoluta
const __dirname = import.meta.dirname

// middleware archivos estáticos
app.use(express.static('data'))
app.use('/assets/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/assets/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'))

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

app.use('/', router)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor trabajando en PORT ${PORT}`)
})