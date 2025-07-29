import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import todoRoutes from "./routes/todos.ts";

const app = new Application();

app.use(todoRoutes.routes());
app.use(todoRoutes.allowedMethods());

console.log("🚀 Server running on http://localhost:8000");
await app.listen({ port: 8000 });