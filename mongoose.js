const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userexpress:VTZwsVyTVfHsR5t0@cluster0.iy3g1.mongodb.net/latihan?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// membuat skema untuk collection quotes
const quoteSchema = new mongoose.Schema({
  word: String
})

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  price: { type: Number, required: true, min: 1000, max: 1000000 },
  stock: Number,
  status: { type: Boolean, default: true }
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\S+@\S+$/.test(v)
      },
      message: props => `${props.value} is not a valid email`
    }
  },
  password: String
})

// membuat model untuk schema quote
const Quote = mongoose.model('Quote', quoteSchema)
const Product = mongoose.model('Product', productSchema)
const User = mongoose.model('User', userSchema)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async() => {
  // try {
  //   const newProduct = await Product.create({
  //     name: 'Co',
  //     price: 900
  //   })
  //   console.log(newProduct)
  // } catch (error) {
  //   console.log(error.message)
  // }

  try {
    const newUser = await User.create({
      username: 'jacky',
      email: 'jack@gmail.com',
      password: '123456'
    })
    console.log(newUser)
  } catch (error) {
    console.log(error.message)
  }
})

