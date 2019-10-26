import Config from "../../config/configuration";
import pg from "pg";

export default class PgConnect {
  client = undefined;

  constructor() {
    this.client = new pg.Client({
      user: "postgres",
      host: "localhost",
      database: "authentification",
      password: "localpgadmin",
      port: 5432
    });
  }

  getAllUsers() {
    this.client
      .connect()
      .then(() => {
        this.client.query('SELECT * FROM public."T_USER"', (err, result) => {
          console.table(result.rows);
          this.client.end();
        });
      })
      .catch(err => {
        this.client.end();
        console.error("Error connecting: %s", err);
      });
  }
}
