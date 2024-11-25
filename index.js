const express = require("express");

const app = express();

const persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.use(express.json());

app.get("/api/persons", (request, response) => {
  response.send(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (!person) {
    response.status(404).send("Person not Found");
  }
  response.send(person);
});

app.get("/info", (request, response) => {
  response.send(
    `The phonebook has info for ${
      persons.length
    } people <p> ${new Date().toString()}</p>`
  );
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
