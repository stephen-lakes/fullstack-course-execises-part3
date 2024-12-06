require("dotenv").config();
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as arguement");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);

mongoose.connect(url);

const phonebookSchema = mongoose.Schema({
  name: String,
  number: String,
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);

if (!name && !number) {
  Phonebook.find({}).then((result) => {
    console.log("phonebooK:");
    result.forEach((contact) => console.log(contact.name, contact.number));
    mongoose.connection.close();
  });
} else {
  const newContact = new Phonebook({
    name,
    number,
  });

  newContact.save().then((contact) => {
    console.log(`$added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
