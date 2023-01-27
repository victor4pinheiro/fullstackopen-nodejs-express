import { Request, Response } from "express";
import mongoose from "mongoose";
import Database from "../database/database";
import Person from "../model/person";

interface PersonInterface {
  name: string;
  number: string;
}

class PersonController {
  static isPerson(object: any | PersonInterface): object is PersonInterface {
    return "name" in object && "number" in object;
  }

  async countPeople() {
    return await Person.find().countDocuments();
  }

  create(request: Request, response: Response) {
    const body = request.body;

    if (!PersonController.isPerson(body))
      return response.status(404).json({ error: "Missing name or number" });

    /* if (PersonController.newPersons.find((person) => person.name === body.name))
      return response.status(409).json({ error: "Person already exists" }); */

    const person = new Person({
      ...body,
    });

    try {
      Database.connect().then(() => {
        person.save().then((savedPerson) => {
          response.status(200).json(savedPerson);
          Database.disconnect();
        });
      });
    } catch (error) {
      response.status(400).json({ error: `Failed operation: ${error}` });
    }
  }

  getAll(request: Request, response: Response) {
    try {
      Database.connect().then(() => {
        Person.find({}).then((notes) => {
          response.status(200).json(notes);
          Database.disconnect();
        });
      });
    } catch (error) {
      response.status(400).json({ error: `Failed operation: ${error}` });
    }
  }

  getById(request: Request, response: Response) {
    const id = request.params.id;

    try {
      Database.connect().then(() => {
        Person.findById(id)
          .then((person) => {
            return response.json(person);
          })
          .catch((error) => {
            return response.status(404).json({ error: "No person found" });
          });
        Database.disconnect();
      });
    } catch (error) {
      response.status(400).json({ error: `Failed operation: ${error}` });
    }
  }

  getInfo(request: Request, response: Response) {
    Database.connect().then(async () => {
      const count = await Person.countDocuments();
      return response.send(
        `Phonebook has info for ${count} persons. <br/>${new Date()}`
      );
    });
  }

  delete(request: Request, response: Response) {
    const id = request.params.id;

    console.log(typeof id);
    try {
      Database.connect().then(() => {
        Person.findByIdAndDelete(id, (error, person) => {
          Database.disconnect();
          if (error)
            return response.status(404).json({ error: `Person not found` });
          return response.status(200).json(person);
        });
      });
    } catch (error) {
      response.status(400).json({ error: `Failed operation: ${error}` });
    }
  }
}

export default PersonController;
