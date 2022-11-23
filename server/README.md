## Environment variables

| Key                  | Description                                                                                                                         |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| PORT                 | Default `5000`                                                                                                                      |
| WORKER_PORT          | Default `5050`                                                                                                                      |
| PASSPORT_SECRET      | Is a string                                                                                                                         |
| JWT_SECRET_KEY       | Is a string or buffer                                                                                                               |
| DATABASE_URL         | -                                                                                                                                   |
| REDIS_PORT           | Default `redis:redis:6379`                                                                                                          |
| ------               | ------                                                                                                                              |
| GOOGLE_APP_ID        | The app ID must be created in [Google Developers Console](https://console.developers.google.com/)                                   |
| GOOGLE_APP_SECRET    | The secret key must be created in [Google Developers Console](https://console.developers.google.com/)                               |
| MICROSOFT_APP_ID     | The consumer key are obtained by [creating an application](https://apps.dev.microsoft.com/#/appList) at Microsoft's developer site. |
| MICROSOFT_APP_SECRET | The secret key are obtained by [creating an application](https://apps.dev.microsoft.com/#/appList) at Microsoft's developer site.   |
| ------               | ------                                                                                                                              |
| S3_BUCKET            | [ Amazon S3](https://aws.amazon.com/s3/)                                                                                            |
| S3_REGION            | [ Amazon S3](https://aws.amazon.com/s3/)                                                                                            |
| S3_ACCESS_KEY_ID     | [ Amazon S3](https://aws.amazon.com/s3/)                                                                                            |
| S3_SECRET_ACCESS_KEY | [ Amazon S3](https://aws.amazon.com/s3/)                                                                                            |
| ------               | ------                                                                                                                              |
| MERIT_API_ID         | Register and generate ID on [ Merit Acktiva](https://aktiva.merit.ee)                                                               |
| MERIT_API_KEY        | Register and generate key on [ Merit Acktiva](https://aktiva.merit.ee)                                                              |

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
