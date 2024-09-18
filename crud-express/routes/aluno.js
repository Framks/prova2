var express = require("express")
var router = express.Router();

const AlunoService = require("../services/AlunoService")
const { request, response} = require('express');

router.get('/', async (request, response, nex) => {
    lista = await AlunoService.listar()
    response.status(200).json(lista)
})

router.post('/criar', async (request, response, next) => {
    response.json( await AlunoService.criar(request.body))
})

router.get('/:id', async (req, resp, next)=>{
    resp.json(await AlunoService.getById(req.params.id))
} )

router.put('/:id', async (request, response) =>{
    let professorNovo = request.body
    professorNovo.id = request.params.id
    response.json(await AlunoService.editar(request.params.id, professorNovo))
})

router.delete('/:id', (request, response, next) =>{
    AlunoService.delete(request.params.id);
})

module.exports = router;