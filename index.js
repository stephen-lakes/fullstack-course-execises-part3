const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

const app = express();

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

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(morgan("tiny"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
morgan.token("body", (req) => JSON.stringify(req.body));
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

const generateId = () => Math.floor(Math.random() * 1000);
const nameExists = (name) => {
  return Person.findOne({ name: name });
};

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name.trim() || !number.trim()) {
    return response
      .status(400)
      .json({ error: "Name and Phone number must be provided" });
  }

  Person.findOne({ name })
    .then((person) => {
      if (person) {
        person.number = number;
        person.save();
        return response.status(200).json(person);
      } else {
        const newPerson = new Person({
          name: name,
          number: number,
        });
        newPerson
          .save()
          .then((contact) => response.status(201).send(newPerson))
          .catch((error) => {
            console.log("ERROR====>", error.name);
            response.status(500).json({error})
          });
      }
    })
    .catch((error) => console.error("Error Finding person by name", error));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) response.json(person);
      // else response.status(404).send("Person not Found");
      else response.status(404).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;
  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  response.send(
    `The phonebook has info for ${Person.countDocuments(
      {}
    )} people <p> ${new Date().toString()}</p>`
  );
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
