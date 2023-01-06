//este es el ejemplo de la clinica veterinaria

const clinicaAnimalitos = [
    {
        id:1,
        nombre:"minina",
        edadMascota:2,
        nombreDuenio: "Ami",
        tipo:"gatito",
        diagnostico: "enfermedad de su panza",
       
    },
    {
        id:2,
        nombre:"lucas",
        edadMascota:5,
        nombreDuenio: "Carlitos",
        tipo:"perrito",
        diagnostico: "cuidados especiales",
      


    }
]
const express = require('express')
const bodyParser = require('body-parser')
const { request, response } = require('express')
const port = 3000
const app = express()

app.use(bodyParser.json())

app.post('/AgregarAnimales', (request, response) => {
    if(Object.keys(request.body).length === 0){
        response.status(400);
        response.json({

            error: "favor de ingreasar los datos 😾"
        });
    }
    const animalitos ={
        id: Date.now(),
        ...request.body
              
    }
    clinicaAnimalitos.push(animalitos);

    response.status(201);
    response.json({
        mensaje :"Nuevo ingreso Exitoso 🐷"

    });
})

app.get('/animalitos/todos', (request,response) =>{
    response.json(clinicaAnimalitos);
})

app.get('/animalitosId/:id', (request,response) =>{
       if(/^[0-9]+$/.test(request.params.id)){
        const animalId = Number(request.params.id)
        for(let animalito of clinicaAnimalitos){
            if(animalito.id === animalId){
                response.json(animalito);
            }
        }
        response.json({
            mensaje:"Animal no encontrado 🐺"
        });
    }else{
        response.status(400)
        response.json({
           error: "codigo invalido 🙀"
        })
    }
})

app.put('/animalitos',(request, response) =>{
    if(Object.keys(request.body).length === 0){
        response.status(400);
        response.json({
            mensaje:"Ingresar los datos requeridos 🐼"
        });        
    }
    for(let i=0; i<clinicaAnimalitos.length; i++){
        if(clinicaAnimalitos[i].id === request.body.id){
            clinicaAnimalitos[i] = request.body;
            response.json({
                animalito: clinicaAnimalitos[i],
                mensaje: "Registro Actualizado 🐻"
            });
           return; 
        }
        
    }
    response.status(400);
    response.json({
       error:"No existen datos 🐈🐕"
    });
})

app.delete('/animalitos/:id', (request, response) => {
    const idanimal = Number(request.params.id);
    for(let i=0; i< clinicaAnimalitos.length; i++){
        if(clinicaAnimalitos[i].id === idanimal){
            const animalEliminado = clinicaAnimalitos[i];
            clinicaAnimalitos.splice(i,1);
            response.json({
                contacto :animalEliminado,
                mensaje:"el contacto fue eliminado "
            })
            return;
        }
    }
    response.status(400);
    response.json({
        error: `el registro con id : ${idanimal} no existe` 
    });

});

app.listen(port, () =>{
    console.log(`Aplicacion escuchando en el ${port}`);
})
