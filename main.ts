import { Application, send } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import todoRoutes from "./routes/todos.ts";

const app = new Application();

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