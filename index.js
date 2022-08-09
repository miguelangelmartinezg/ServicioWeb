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
const contactos2 = [];



app.get("/Contactos", (request, response) => {

    fetch("http://www.raydelto.org/agenda.php")
        .then(function (misDatos) {
            return misDatos.json();

        }).then(contacto => response.json(contacto));

});
app.get('/NuevoContacto', (request, response) => {


    fetch("http://www.raydelto.org/agenda.php").then(function (misDatos) {
        return misDatos.json();

    }).then(function (misDatos) {
        misDatos.forEach(registros => {


            contactos.push(registros);
        });

    });
    response.render('NuevoContacto.ejs', {
        misContactos: contactos
    })
    //console.log(contactos);
});

app.post('/AddNuevoContacto', (request, response) => {

    var newContacto = {
        nombre: request.body.Nombre,
        apellido: request.body.Apellido,
        telefono: request.body.Telefono
    }
    contactos2.push(request.body)
    let ContactoArrayJson = JSON.stringify(newContacto);

    fetch("http://www.raydelto.org/agenda.php", {
        method: "POST",
        body: ContactoArrayJson

    });
    fetch("http://www.raydelto.org/agenda.php").then(function (misDatos) {
        return misDatos.json();

    }).then(function (misDatos) {
        misDatos.forEach(registros => {


            contactos.push(registros);
        });

    });
    response.render('NuevoContacto.ejs', {
        misContactos: contactos
    })
})


app.listen(8080);