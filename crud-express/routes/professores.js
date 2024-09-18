var express = require("express")
var router = express.Router();

const ProfessorService = require("../services/ProfessorService")
const { request, response} = require('express');

router.get('/', async (request, response, nex) => {
    lista = await ProfessorService.listar()
    response.status(200).json(lista)
})

router.post('/criar', async (request, response, next) => {
    response.json( await ProfessorService.criar(request.body))
})

router.get('/:id', async (req, resp, next)=>{
    resp.json(await ProfessorService.getById(req.params.id))
} )

router.put('/:id', async (request, response) =>{
    let professorNovo = request.body
    professorNovo.id = request.params.id
    response.json(await ProfessorService.editar(request.params.id, professorNovo))
})

router.delete('/:id', (request, response, next) =>{
    ProfessorService.delete(request.params.id);
})

module.exports = router;