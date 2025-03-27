import { Schema, model } from 'mongoose'

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  favoriteGenre: {
    type: String,
    required: true,
    minlength: 2
  }
})

export default model('User', schema)
