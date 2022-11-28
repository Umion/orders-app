## Environment variables

| Key            | Description                                              |
| -------------- | -------------------------------------------------------- |
| PORT           | Default `5000`                                           |
| JWT_SECRET_KEY | Is a string or buffer                                    |
| DATABASE_URL   | postgres://postgres:postgres@postgres_app:5432/orders_db |

## Project setup

```
yarn install
```

## Compiles for development

```sh
docker-compose build
docker-compose up
```

## Run unit tests

```sh
docker-compose run app yarn test
docker-compose run app yarn test:coverage
```
