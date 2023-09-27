import http from "node:http";

const host = "localhost";
const port = 8000;

import fs from "node:fs/promises";

async function requestListener(request, response) {
  response.setHeader("Content-Type", "text/html");
  try {
    let urlSegments = request.url.split("/");

    if (urlSegments[1] === "index.html" || urlSegments[1] === "") {
      const contents = await fs.readFile("index.html", "utf8");
      response.writeHead(200);
      return response.end(contents);
    }

    if (urlSegments[1] === "random" && urlSegments.length === 3) {
      const nb = parseInt(urlSegments[2]);
      if (!isNaN(nb)) {
        const randomNumbers = [];
        for (let i = 0; i < nb; i++) {
          randomNumbers.push(Math.floor(100 * Math.random()));
        }
        response.writeHead(200);
        return response.end(`<html><p>${randomNumbers.join(", ")}</p></html>`);
      }
    }

    response.writeHead(404);
    return response.end(`<html><p>404: NOT FOUND</p></html>`);
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
  }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log("NODE_ENV =", process.env.NODE_ENV);
  console.log(`Server is running on http://${host}:${port}`);
});
