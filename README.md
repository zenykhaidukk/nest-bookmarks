# nest-bookmarks

Its a REST api for my simple pet project to play around w Nest.js and other technologies.

# Technologies used:

- Nest.js
- Postgres
- Docker
- Prisma
- Argon
- class-transformer, class-validator
- dotenv-cli
- passport
- pactum

# Features

- JWT authorization
- e2e testing
- db teardown with docker
- auth strategy, custom decorators

# Installation

You'll need env vars to start an api. Example can be found in `.env.example`. After settting up env vars, run:

- `pnpm install`
- `pnpm db:dev:restart`
- `pnpm run dev`
