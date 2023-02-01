<a name="fullstack"></a>
# Fullstackopen
The project can store the contacts (name and number) in a phonebook.

For the frontend, React is used because it can help to understand how to build a frontend (my major experience is backend) managing states, especially when filter some datas instead of request the data filtered by back.

For the backend, TypeScript and Nodejs is used because unhappily the course still uses JavaScript till that point, but I want to learn more things, so I chose Type instead JavaScript. To manage routes, endpoints, routes, Express is the best option  because not only it can solve the problem but it have a good documentation.

For database, Mongoose is used as a course requirement. It have some benefits, but suffer from a poorly documentation (lacks of examples is the biggest problem), but happily there are many examples on tutorial sites.

For log, Morgan is used as a course requirement, but I liked the choice, because it's my first time using a library to log (on Java, I used the famous sysout) and it can help debug the application, especially in a Express application, because it can be used as a middleware.

For environment varibles, I used .env (it's not on repo) and I already believed in export varibles in deploy environment (only!), but dotenv was a good surprise, beucase it hide the varibles better than .env.

For deploy, I used render (the course offered fly.io and render) and this was a good surprise, because I have the first experience of deploying a backend application.

# Summary
- [Fullstackopen](#fullstackopen)
- [Summary](#summary)
- [Getting start](#getting-start)
  - [Prerequisites](#prerequisites)
  - [How to use](#how-to-use)
- [Issues](#issues)
- [License](#license)

<a name="getting-start"></a>
# Getting start

<a name="prerequisites"></a>
## Prerequisites

* Package manger: [PNPM](https://pnpm.io/) >= 7.25.1
* Version manager: [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/): >= v19.4.0

PS.: I don't know if using old versions can be break compatibility. It's up to you to test.

<a name="how-to-use"></a>
## How to use

Firstly clone the files:
```
git clone https://github.com/victor4pinheiro/fullstackopen-nodejs-express
```

After that, you install all dependencies with pnpm:
```
pnpm i
```

To run the dev server:
```
pnpm run dev
```

To build the project:
```
pnpm run build
```


To start the project (only do this after build):
```
pnpm run start
```

<a name="issues"></a>
# Issues

Feel free to file a new issue with a respective title and description.

<a name="license"></a>
# License

This project is under the MIT license. See the LICENSE for details.

[LICENSE](LICENSE)

Made with :heart: by [Victor Pinheiro](https://www.linkedin.com/in/victor-4-pinheiro/)


