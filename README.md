<p align="center"><img width="300" height="300" src="public/logo_1.png" alt="Logo"></p>

<h1 align="center" style="font-size:200px; font-famili:Raleway">entel - Share Your Needs</h1>

<p align="center">
  <a href="https://entel.me"><img src="https://img.shields.io/website?down_color=lightgrey&down_message=offline&label=entel.app&style=for-the-badge&up_color=green&up_message=online&url=https%3A%2F%2Fentel.me"></a>
  <img src="https://img.shields.io/github/languages/top/entel-me/entel?style=for-the-badge">
  <img src="https://img.shields.io/github/license/entel-me/entel?style=for-the-badge">
</p>

<a name="overview"></a>

## Overview

Replace the unnecessary walk to the next supermarket by a new shoppinglist in entel. If you are going to the store, help others close to you by accepting their shopping list and bring them the products they need!

_entel_ is a modern web app that is built with [Blitz.js](https://github.com/blitz-js/blitz), a full-stack React framework, made to boost productivity.
A hosted version can be found at [**entel.me**](https://www.entel.me/)

<a name="features"></a>

## Features

<table>
  <thead>
    <tr>
      <th>✨</th>
      <th>Feature</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>✅</td>
      <td>Create an account</td>
    </tr>
    <tr>
      <td>📆</td>
      <td>Create a new shoppinglist</td>
    </tr>
    <tr>
      <td>🤝</td>
      <td>Accept and complete shoppinglists from others</td>
    </tr>
    <tr>
      <td>📲</td>
      <td>Chat with the owners to organize shopping</td>
    </tr>
    <tr>
      <td>✉️</td>
      <td>Email confirmations and reminders</td>
    </tr>
  </tbody>
</table>
Many thanks to Roman for creating the cute logo 💖

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Setup entel locally

To run entel locally, you need to install [NodeJS](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). Additionally, you should be able to run PostgreSQL on your machine. You can achieve this by

- installing it natively on your computer or
- via docker.

### First steps ✨

But first of all, you have to clone and open this repository.

```bash
git clone https://github.com/entel-me/entel.git
cd entel
```

After that, you should be able to install the dependencies with npm.

```bash
npm i
```

Great! Let's start with setting up environment variables. 🔥

### Setup enviroment variables 📝

First, you have to create two empty files`.env.local` and `env.test.local`. You can specify environment variables in these files. Afterward, you call them with `process.env.`.

`DATABASE_URL` is an important variable that connects the PostgreSQL database with our application. If you're running PostgreSQL in docker, you set

- username,
- password,
- the name of the database
  on your own and include them in a URL. Here is an example:

```txt
POSTGRES_USER=entel
POSTGRES_PASSWORD=crazypassword
POSTGRES_DB=enteldb
DATABASE_URL=postgresql://entel:crazypassword@localhost:5432/enteldb
```

If you're running PostgreSQL natively on your computer, you have to enter the URL of your database in each `.local` file. Please be aware that you have to remove the [`predev` script](https://github.com/entel-me/entel/blob/1f352942b6f9cec4aabad566766f752c4c3c82f5/package.json#L5) from package.json to run entel without errors.

```txt
DATABASE_URL=postgresql://entel:crazypassword@localhost:5432/enteldb
```

If you want to test the mailer in [`mailers/`](https://github.com/entel-me/entel/tree/develop/mailers), you have to add your

- mail,
- password,
- and mail host
  to the `.local` files too:

```txt
MAIL_HOST=mail.privateemail.com
MAIL_MAIL=info@antonykamp.de
MAIL_PASSWORD=crazypassword
```

Great! After that, we take care of the database itself.

### Run the database 📋

The last thing we have to do is migrating the database with [prisma](https://www.prisma.io/). For the following step, the database should already be running. You can achieve this with docker with the command:

```bash
docker-compose up -d
```

Now you can set up the database by entering:

```bash
blitz prisma migrate dev --preview-feature
```

Btw, if you change something in [schema.prisma](https://github.com/entel-me/entel/blob/develop/db/schema.prisma) you have to re-run the last command.
Now we can try out our application. 🥳

### Run the application

To run entel you execute

```bash
blitz dev
```

and view your new app at [http://localhost:3000/](http://localhost:3000/)! Perfect 🎉

Have fun with the app :)

## How to run entel "in production"

We use a second environment called ["entel-dev"](https://entelme-dev.herokuapp.com) to test entel under real-world conditions. If you want, you can run your version of the application on this environment before merging it into `develop`. Just write to @Till-B or @antonykamp 💻.

For security reasons, these "review apps" are using the same database as "entel-dev" but not as the public environment "entel.me". Also, if you send emails, they will land at the [ethereal mailbox](https://ethereal.email/) of Carolina 😉. Therefore, use the following email and password:

```bash
email: carolina38@ethereal.email
password: 3jqaynkSquQv5Pra1u
```
