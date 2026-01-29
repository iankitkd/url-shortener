import { buildApp } from "./app.js";

const app = buildApp();
const PORT = 3000;

app.listen({ port: PORT }, () => {
  console.log(`API running on port ${PORT}`);
});
