# Deno Todo REST API

A simple REST API for managing todos built with Deno.

## Features

- Create, read, update, and delete todos
- Built with Deno and TypeScript
- RESTful API endpoints
- Oak Middleware Framework
- Runs locally in localhost
- Deployed online using Deno Deploy
- Local storage using JSON file
- Online storage using Deno KV Global Database

## Getting Started

### Prerequisites

- [Deno](https://deno.land/) installed on your machine

### Installation

1. Clone the repository:
```bash
git clone https://github.com/OwenNolis/deno-todo-rest-api.git
cd deno-todo-rest-api
```

2. Enable Deno in project

Make in the root a .vscode/settings.json file
```bash
{
  "deno.enable": true,
  "deno.lint": true,
  "deno.unstable": false
}
```

3. Run the application:
```bash
deno run --allow-net --allow-read --allow-write main.ts
```

## API Endpoints

- `GET /todos` - Get all todos
- `GET /todos/:id` - Get a specific todo
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## License

MIT License
