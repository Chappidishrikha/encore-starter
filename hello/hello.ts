
import { api } from "encore.dev/api";
import { db } from "./db";

// Saves a greeting and returns the message.
export const get = api(
  { expose: true, method: "GET", path: "/hello/:name" },
  async ({ name }: { name: string }): Promise<Response> => {
    const msg = `Welcome ${name}!`;

    await db.exec`
      INSERT INTO greetings (name, message)
      VALUES (${name}, ${msg})
    `;

    return { message: msg };
  }
);

interface Response {
  message: string;
}
