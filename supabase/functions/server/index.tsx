import { Hono } from "npm:hono";
const app = new Hono();
app.get("/", (c) => c.text("OK"));
Deno.serve(app.fetch);