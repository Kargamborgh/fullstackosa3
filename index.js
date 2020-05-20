const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Kari Taalasmaa",
        number: "0700-123123",
        id: 2
    },
    {
        name: "Urho Kekkonen",
        number: "050-456789",
        id: 3
    },
    {
        name: "Aku Ankka",
        number: "176-671",
        id: 4
    }
]

const generateId = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
  }

app.get('/', (req, res) => {
    res.send('<h1>Puhelinluettelo ebin</h1>')
  })

app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
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

app.post('/api/notes', (request, response) => {
    const body = request.body
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(100000000),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
  })

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})