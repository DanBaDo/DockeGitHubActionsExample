import pg from "pg";
import { config } from "dotenv";

if (process.env.NODE_ENV !== 'production') config();

const createRecipesTableSQL = `
    CREATE TABLE IF NOT EXISTS recipes (
        id SERIAL PRIMARY KEY,
        url VARCHAR(500),
        dish VARCHAR(50)
    )
`

export const addDishesSQL = `
        INSERT INTO recipes(url, dish) VALUES ($1, $2)
`

export const getDishesSQL = `
        SELECT DISTINCT dish FROM recipes 
`

export const db = new pg.Client(process.env.PG_URL)
db.connect()

try {
    db.query(createRecipesTableSQL);
} catch (error) {
    console.error("Error trying to create tables")
    throw error
}