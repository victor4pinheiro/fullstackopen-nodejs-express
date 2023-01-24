import { Request, Response } from "express";

import persons from "../../db.json";

interface PersonInterface {
  id: number;
  name: string;
  number: string;
}

class PersonController {
  static newPersons: Array<PersonInterface>;

  constructor() {
    PersonController.newPersons = persons;
  }

  static generateMaxIds() {
    const maxId =
      PersonController.newPersons.length > 0
        ? Math.max(...PersonController.newPersons.map((person) => person.id))
        : 0;
    return maxId + 1;
  }

  static isPerson(object: any | PersonInterface): object is PersonInterface {
    return "name" in object && "number" in object;
  }

  getAll(request: Request, response: Response) {
    if (PersonController.newPersons)
      return response.status(200).json(PersonController.newPersons);
    return response.status(404).json({ error: "no data" });
  }

  getById(request: Request, response: Response) {
    const id = Number(request.params.id);
    const person = PersonController.newPersons.find(
      (person) => person.id === id
    );

    if (person) response.json(person);
    response.status(404).send("No person found");
  }

  getInfo(request: Request, response: Response) {
    const count = PersonController.newPersons.length;
    return response.send(
      `Phonebook has info for ${count} persons. <br/>${new Date()}`
    );
  }

  create(request: Request, response: Response) {
    const body = request.body;

    if (!PersonController.isPerson(body))
      response.status(404).send("Name or number is missing");

    const person = {
      id: PersonController.generateMaxIds(),
      ...body,
    };

    PersonController.newPersons = persons.concat(person);
    response.status(201).json(PersonController.newPersons);
  }

  delete(request: Request, response: Response) {
    const id = Number(request.params.id);

    if (!PersonController.newPersons.some((person) => person.id === id))
      response.status(404).send("No person found");

    const newPersons = PersonController.newPersons.filter(
      (person) => person.id !== id
    );

    if (PersonController.newPersons.length === newPersons.length) {
      response.status(404).send("Deletion not succeeded");
    }

    PersonController.newPersons = newPersons;
    response.json(PersonController.newPersons);
  }
}

export { PersonController };
