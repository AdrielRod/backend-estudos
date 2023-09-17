const express = require('express')
const server = express()

server.use(express.json())

//Query params = são os parametros que passamos na rota
// query params = ?nome=NodeJs
// Route params = /curso/2
// request body = {nome: 'curso'}

//localhost:3000/curso

const cursos = ['Node JS', 'Javascript', 'ReactNative']

function checkCurso(req, res, next){
    if(!req.body.name){
        return res.status(400).json({error: "Nome do curso é obrigatório"})
    }
    return next()

}

function checkIndexCurso(req, res, next){
    const curso = curso[req.params.index]
    if(!curso){
        return res.status(400).json({error: "Usuário nao existe"})
    }
    return next()

}

server.use((req, res, next) => {
    console.log("requisição", req.url)
    return next()
})

server.get('/cursos', checkIndexCurso, (req, res) => {
    return res.json(cursos)
})

server.get('/cursos/:index', (req, res) => {
    const {index} = req.params
    return res.json(cursos[index])
})

server.post('/cursos', checkCurso, (req, res) => {
    const {name} = req.body
    cursos.push(name)

    return res.json(cursos)
})

server.put('/cursos/:index', checkCurso, (req, res) => {
    const {index} = req.params
    const {name} = req.body

    cursos[index] = name

    return res.json(cursos)
})

server.delete('/cursos/:index', (req, res) => {
    const {index} = req.params

    cursos.splice(index, 1)

    return res.send()
})

server.listen(3000)