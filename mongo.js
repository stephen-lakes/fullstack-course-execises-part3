const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as arguement");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const phone = process.argv[4];

const url = `mongodb+srv://fullstack-phonebook-prod:${password}@phonebook-prod-cluster.aaquz.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=phonebook-prod-cluster`;
mongoose.set("strictQuery", false);

mongoose.connect(url);

const phonebookSchema = mongoose.Schema({
  name: String,
  phone: String,
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);

// const newContact = new Phonebook({
//   name,
//   phone: phone,
// });

// newContact.save().then(contact => {
//   console.log("DONE", contact);
//   mongoose.connection.close();
// });

Phonebook.find({}).then((result) => {
  result.forEach(contact => console.log(contact));
  mongoose.connection.close();
});
