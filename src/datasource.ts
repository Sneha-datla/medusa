// data-source.ts (this initializes the database connection)
import { DataSource } from "typeorm";
import { Vendor } from "./models/vendor"; // Include all your entities here

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "sneha1992",
  database: "medusa-medusa-backend",
  entities: [Vendor], // Add all entities here
  synchronize: true,  // In production, set to false and use migrations
});
