require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content]'))
app.use(cors())
app.use(express.static('build'))

const generateId = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
  }

app.get('/', (req, res) => {
    res.send('<h1>Puhelinluettelo ebin</h1>')
  })

  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    //unnecessary logging of id console.log(id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
      console.log(person)
  })

app.get('/info', (req, res) => {
    res.send(`<div>Phonebook has info for ${persons.length} people</div>
    <div>${new Date()}</div>`)
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'gotta have a name' })
  }

  if (body.number === undefined) {
    return response.status(400).json({ error: 'gotta have a number' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

/*app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({ 
          error: 'gotta have a name' 
        })
      } else if (!body.number) {
          return response.status(400).json({
              error: 'gotta have a number'
          })
      } else if (persons.find(person => person.name === body.name)) {
          return response.status(400).json({
              error: 'gotta have a UNIQUE name'
          })
      }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(100000000),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  }) */

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
  })

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})