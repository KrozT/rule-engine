<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A simple Rule Engine made with <a href="https://github.com/nestjs/nest" target="_blank">Nest</a> for e-Smart Take Home</p>

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Environment Variables

```bash
# Primary configuration variables for the application
NEST_PORT=3000
MONGO_PORT=27017

# Mongo connection string check port address always be the same of MONGO_PORT
MONGO_URI=mongodb://localhost:27017/main
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.