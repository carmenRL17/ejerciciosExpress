const contactos = [
    {
        id:1,
        nombre:"Carmen",
        telfono:"11111111111"

    },
    {
        id:2,
        nombre:"Juan",
        telfono:"11111111111"

    },
    {
        id:1,
        nombre:"Ami",
        telfono:"11111111111"

    }
]




const express = require('express')
const cors = require('cors')
const path =require('path')
const bodyParser =require('body-parser')
const { request } = require('http')
const { resolve } = require('path')
const { response } = require('express')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/paginas/index.html'))
})

app.post('/longo', (peticion, respuesta) =>{
    respuesta.send("regalame una matita")
})

app.post('/contactos',(request,response) =>{
    if(Object.keys(request.body).length ===0){
        response.status(400);
        response.json({
            error:"el contacto es requerido"
        });

    }
    const contacto = {
        id:Date.now(),
        ...request.body
    }
    contactos.push(contacto);

    response.status(201);
    response.send('contacto resgistrado exitosamente 😁😁😁');
})

app.put('/contactos',(request, response) =>{ 
    if(Object.keys(request.body).length ===0){
        response.status(400);
        response.json({
            error:"el contacto es requerido"
        }); 
    }
    for(let i=0; i<contactos.length; i++){
        if(contactos[i].id === request.body.id){
            contactos[i] = request.body;
            response.json({
                contacto:contactos[i],
                mensaje:"contacto actualizdo 😘"

            });
            return;
        }
    }
    response.status(400);
    response.json({
        error:"el contacto no existe 🦃"
    })

})

app.delete('/contactos/:id', (request, response) => {
    const idContactos = Number(request.params.id);
    for(let i=0; i< contactos.length; i++){
        if(contactos[i].id === idContactos){
            const contactoEliminado = contactos[i];
            contactos.splice(i,1);
            response.json({
                contacto :contactoEliminado,
                mensaje:"el contacto fue eliminado "
            })
            return;
        }
    }
    response.status(400);
    response.json({
        error: `el contacto id : ${idContactos} no existe` 
    });

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/saludar',(request, response) =>{
    const nombre = request.query.nombre;
    if(nombre){
        response.send(`hola ${nombre}!`);
    }else {
        response.send("hola extanio");
    }
})
app.get('/contactos/todos', (request, response) =>{
    response.json(contactos);


})


app.get('/contactos/:id',(request,response) =>{
    if(/^[0-9]+$/.test(request.params.id)){
        const userId = Number(request.params.id);
        for(let contacto of contactos){
            if(contacto.id === userId){
                response.json(contacto);

            }
        } 
        response.send("contacto no encontrado");
    }else {
        response.status(400)
        response.json({
            error:"Id de contacto no valido"

        });
    }
})