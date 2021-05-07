# Contributing

- Weclome
- Rules

## Local setup ✨

To run entel locally, you need to install [NodeJS](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). Additionally, you should be able to run PostgreSQL on your machine. You can achieve this by

- installing it natively on your computer or
- via docker.

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

### Enviroment variables & mailer📝

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

TODO: mailer stuff

Great! After that, we take care of the database itself.

### Run database 📋

TODO Used datamodel (ER-Diagramm)

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

### Run application


To run entel you execute

```bash
blitz dev
```

and view your new app at [http://localhost:3000/](http://localhost:3000/)! Perfect 🎉

Have fun with the app :)

## Branches, environments and their intention

### master vs develop

### entel vs entel-dev