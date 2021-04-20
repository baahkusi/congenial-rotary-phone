# congenial-rotary-phone

A simple fetch and dump API. Express + MongoDB. Live api example here 👉 https://ancient-caverns-85900.herokuapp.com.

## API

### Endpoint

POST https://ancient-caverns-85900.herokuapp.com/api/v1/getir

#### Example Request Body

```json
{
    "startDate": "2016-01-26",
    "endDate": "2018-02-02",
    "minCount": 2990,
    "maxCount": 3000
}
```

#### Example Response Body

```json
{
    "code": 0,
    "msg": "Sucess",
    "records": [
        {
            "key": "KrZIErky",
            "createdAt": "2016-08-15T01:12:05.989Z",
            "totalCount": 2993
        },
        {
            "key": "KrZIErky",
            "createdAt": "2016-08-15T01:12:05.989Z",
            "totalCount": 2992
        },
        {
            "key": "bxoQiSKL",
            "createdAt": "2016-01-29T01:59:53.494Z",
            "totalCount": 2991
        }
    ]
}
```

## Running for development

Follow these steps to get the project up and running for development

- `npm install`
- `cp .env.example .env`
- Setup appropriate env variables
- `npm run dev` for development.

## Running for deployment

Follow these steps to get the project up and running for deployment

- `npm install`
- `cp .env.example .env`
- Setup appropriate env variables
- `npm run start` to see it in action.
