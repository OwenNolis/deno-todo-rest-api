import { Application, send } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import todoRoutes from "./routes/todos.ts";
import { isDeploy } from "./utils/env.ts"; // Zorg dat je deze functie hebt
import { Todo } from "./models/todo.ts";

const app = new Application();

// 🔧 Initialiseer Deno KV als je op Deno Deploy draait
if (isDeploy()) {
  const kv = await Deno.openKv();
  const res = await kv.get(["todos"]);
  if (res.value === null) {
    await kv.set(["todos"], [] as Todo[]);
    console.log("🔧 Deno KV initialized with empty todos array");
  }
}

// 🔹 Serve static files (HTML, CSS, JS)
app.use(async (ctx, next) => {
  const filePath = ctx.request.url.pathname;
  const rootDir = `${Deno.cwd()}/public`;

  try {
    await send(ctx, filePath, {
      root: rootDir,
      index: "index.html",
    });
  } catch {
    await next();
  }
});

// 🔹 API routes
app.use(todoRoutes.routes());
app.use(todoRoutes.allowedMethods());

console.log("🚀 Server running on http://localhost:8000");
await app.listen({ port: 8000 });