require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const url = process.env.MONGODB_URI;

console.log('connection to', url);

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const validateNumber = (number) => {
  // check for correct format
  const parts = number.split('-');
  if (parts.length !== 2) return false;

  if (!/^\d{2,3}$/.test(parts[0]) || !/^\d+$/.test(parts[1])) return false;

  return true;
};

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: validateNumber,
      message: (props) => `${props.value} is not a valid phone number! It should be in the format XX-XXXXXXX or XXX-XXXXXXXX.`,
    },
    required: [true, 'User phone number required'],
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
