const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@full-stack-2024.5qw11.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=full-stack-2024`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

const namePerson = process.argv[3]
const numberPerson = process.argv[4]

if (namePerson && numberPerson) {
  const person = new Person({
    name: namePerson,
    number: numberPerson,
  })

  person.save().then((result) => {
    console.log(`Added ${namePerson} number ${numberPerson} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

// const note = new Note({
//   content: 'Mongoose makes things easy',
//   important: true,
// })

// note.save().then((result) => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })
