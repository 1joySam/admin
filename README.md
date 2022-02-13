After these four steps and only a couple of minutes, you now have a complete commerce engine running locally. You may now explore [the documentation](https://docs.medusa-commerce.com/api).

## 🗄 Setting up Admin

1. **Clone this repository**
   ```
   cd admin
   ```
2. **Install dependencies**
   ```
   yarn install
   or npm install
   ```
3. **Start the development server**
   ```
   yarn start
   or npm start
   ```
4. **Go to [http://localhost:7000](http://localhost:7000)**

In the backend terminal you can create your own user for the admin by running:

```
medusa user -e some@email.com -p some-password
```
Alternatively, if you've seeded your server with our dummy data, you can use the following credentials:
```
admin@medusa-test.com // supersecret
```

## Database support
In production Medusa requires Postgres and Redis, but SQLite is supported for development and testing purposes. If you plan on using Medusa for a project it is recommended that you install Postgres and Redis on your dev machine.

- [Install PostgreSQL](https://www.postgresql.org/download/)
- [Install Redis](https://redis.io/download)
- [Install firebase](https://firebase.io/)

To use Postgres and Redis you should provide a `database_url` and `redis_url` in your `medusa-config.js`.
