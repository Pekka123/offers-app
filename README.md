# offer-app

## Installation

Clone the repository

```
git clone git@gitlab.dzangolab.com:sushan.manandhar/csv-to-database.git
```

Install dependencies

```
npm install
```

### Configuration

* Copy `.env.example` to `.env` and update the relevant values.

Credential for database

```
username: sample || <DB_USER>
password: sample@123 || <DB_PASSWORD>
database: offer_db
```

#### Usage

To run the database

```
docker compose up -d
```

##### To access the database

Run the url

```
http://localhost:<ADMINER_PORT>/
```

###### Create a Table

In SQL command write this given below query to create the table:

```
CREATE TABLE offers (
  id         SERIAL PRIMARY KEY,
  bicode     varchar(50),
  boutid     integer,
  merchantID varchar(50) NOT NULL ,
  merchant   varchar(50) NOT NULL,
  cur        varchar(50),
  pri        decimal,
  qua        integer,
  cas        integer,
  form       integer,
  url        text,
  upd        date NOT NULL
);
```

###### To run the program

To upload csv file to database

```
npm start ./files/offers.csv
```

To retrieve updates from database

```
npm run update 
```
