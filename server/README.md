## Environment variables

| Key            | Description           |
| -------------- | --------------------- |
| PORT           | Default `5000`        |
| JWT_SECRET_KEY | Is a string or buffer |
| DATABASE_URL   | -                     |

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
