import db from "#db/client";
import { createEmployee } from "#db/queries/employees";
import { faker } from "@faker-js/faker";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let i = 0; i < 10; i++) {
    console.log(
      await createEmployee({
        name: faker.person.fullName(),
        birthday: faker.date.birthdate(),
        salary: faker.number.int({ min: 40000, max: 200000 }),
      }),
    );
  }
}
