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

app.get('/', (req, res) => {
    res.send('<h1>Puhelinluettelo ebin</h1>')
  })

app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

app.get('/info', (req, res) => {
    res.send(`<div>Phonebook has info for ${persons.length} people</div>
    <div>${new Date()}</div>`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})