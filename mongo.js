const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true })

const Person = mongoose.model('Person',{
    name: String,
    number: String
})

const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
})

if (process.argv[2]) {
    person
        .save()
        .then(response => {
            console.log(`adding person ${process.argv[2]} number ${process.argv[3]} to the directory`)
            mongoose.connection.close()
        })
} else {
    Person
        .find({})
        .then(result => {
            console.log('puhelinluettelo:')
            result.forEach(person => {

                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })

}
