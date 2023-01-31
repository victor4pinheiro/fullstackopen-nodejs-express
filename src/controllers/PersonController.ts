import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Database from "../database/database";
import CustomError from "../model/errors";
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

  create(request: Request, response: Response, next: NextFunction) {
    const body = request.body;

    if (!PersonController.isPerson(body))
      next(new CustomError("missing name or number", 404));

    const person = new Person({
      ...body,
    });

    Database.connect()
      .then(() => {
        person
          .save()
          .then((person) => response.status(201).json(person))
          .catch((error) => next(error))
          .finally(() => mongoose.disconnect());
      })
      .catch((error) => next(error));
  }

  getAll(request: Request, response: Response, next: NextFunction) {
    Database.connect()
      .then(() => {
        Person.find({})
          .then((persons) => response.status(200).json(persons))
          .catch((error) => next(error))
          .finally(() => mongoose.disconnect());
      })
      .catch((error) => next(error));
  }

  getById(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;

    Database.connect()
      .then(() => {
        Person.findById(id)
          .then((person) =>
            person
              ? response.status(200).json(person)
              : next(new CustomError("person not found", 404))
          )
          .catch((error) => next(error))
          .finally(() => mongoose.disconnect());
      })
      .catch((error) => next(error));
  }

  getInfo(request: Request, response: Response, next: NextFunction) {
    Database.connect()
      .then(async () => {
        const count = await Person.countDocuments();
        return response
          .status(200)
          .send(`Phonebook has info for ${count} persons. <br/>${new Date()}`);
      })
      .catch((error) => next(error));
  }

  update(request: Request, response: Response, next: NextFunction) {
    const body = request.body;

    if (!PersonController.isPerson(body))
      next(new CustomError("missing name or number", 404));

    const id = request.params.id;

    const person = new Person({
      _id: id,
      ...body,
    });

    Database.connect()
      .then(() => {
        Person.findByIdAndUpdate(id, person)
          .then((person) =>
            person
              ? response.status(200).json(person)
              : next(new CustomError("person not found", 404))
          )
          .catch((error) => next(error))
          .finally(() => mongoose.disconnect());
      })
      .catch((error) => next(error));
  }

  delete(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;

    Database.connect()
      .then(() => {
        Person.findByIdAndDelete(id)
          .then((person) =>
            person
              ? response.status(200).json(person)
              : next(new CustomError("person not found", 404))
          )
          .catch((error) => next(error))
          .finally(() => mongoose.disconnect());
      })
      .catch((error) => next(error));
  }
}

export default PersonController;
