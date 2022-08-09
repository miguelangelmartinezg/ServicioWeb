const express = require('express');
const { request } = require('http');
const fetch = require("node-fetch");
const ejs = require('ejs');
const app = express();
const morgan = require('morgan');
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
const contactos = [];


app.get("/Contactos", (request, response) => {

    fetch("http://www.raydelto.org/agenda.php")
        .then(promesa => promesa.json())
        .then(contacto => response.json(contacto));

});
app.get('/NuevoContacto', (request, response) => {

    response.render('NuevoContacto')
});

app.post('/AddNuevoContacto', (request, response) => {

    //console.log();
    response.send('Recibido Micky');
})


app.listen(8080);