const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

let persons = [
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

const requestLogger = (request, response, next) => {
  console.log("Method", request.method);
  console.log("Path", request.path);
  console.log("Body", request.body);
  console.log("----");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(400).send({ error: "unknown endpoint" });
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(morgan("tiny"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
morgan.token("body", (req) => JSON.stringify(req.body));
app.get("/api/persons", (request, response) => {
  response.send(persons);
});

const generateId = () => Math.floor(Math.random() * 1000);
const nameExits = (name) => {
  return persons.some((person) => person.name === name);
};

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name.trim() || !number.trim()) {
    return response
      .status(400)
      .json({ error: "Name and Phone number must be provided" });
  }

  if (nameExits(name)) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const newPerson = { id: generateId(), name: name, number: number };

  persons = persons.concat(newPerson);
  response.status(201).send(newPerson);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (!person) {
    response.status(404).send("Person not Found");
  }
  response.send(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.get("/info", (request, response) => {
  response.send(
    `The phonebook has info for ${
      persons.length
    } people <p> ${new Date().toString()}</p>`
  );
});

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
