import http from "node:http";

const host = "localhost";
const port = 8000;

import fs from "node:fs/promises";

async function requestListener(_request, response) {
  try {
    const contents = await fs.readFile("index.html", "utf8");
    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    response.end(contents);
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    response.end(
      "Erreur interne du serveur (code d'erreur : 500) : fichier introuvable",
    );
  }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log("NODE_ENV =", process.env.NODE_ENV);
  console.log(`Server is running on http://${host}:${port}`);
});
