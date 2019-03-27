const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
    },
    {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
    }
  ]

  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
  
    if ( person ) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateRandomId = () => {
    return Math.floor(Math.random() * Math.floor(10000));
  }

  app.post('/api/persons', (request, response) => {
      const body = request.body

      if(body.name === undefined || body.number === undefined) {
          return response.status(400).json({error: 'name or number missing'})
      }

      if(persons.find(person => person.name === body.name)){
          return response.status(400).json({error: 'name must be unique'})
      }

      const person = {
          name: body.name,
          number: body.number,
          id: generateRandomId()
      }

      persons = persons.concat(person)

      response.json(person)
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  }) 