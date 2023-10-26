// const person = require("./person");
// console.log(person.name);

// Module Wrapper function contains require, module, exports, __filename, __dirname

// console.log(__dirname, __filename);

// const Person = require("./person");
// const person1 = new Person("Abdullah", 23);

// console.log(person1.greeting());

// Creating a HTTP server
const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((request, response) => {
  // if (request.url === "/") {
  //   fs.readFile(
  //     path.join(__dirname, "public", "index.html"),
  //     (err, content) => {
  //       if (err) {
  //         throw err;
  //       }
  //       response.writeHead(200, { "Content-Type": "text/html" });
  //       response.end(content);
  //     }
  //   );
  // }

  // if (request.url === "/about") {
  //   fs.readFile(
  //     path.join(__dirname, "public", "about.html"),
  //     (err, content) => {
  //       if (err) {
  //         throw err;
  //       }
  //       response.writeHead(200, { "Content-Type": "text/html" });
  //       response.end(content);
  //     }
  //   );
  // }

  // if (request.url === "/api/users") {
  //   const users = [
  //     { name: "Abdullah", age: 23 },
  //     { name: "Sam", age: 22 },
  //   ];
  //   response.writeHead(200, { "Content-Type": "application/json" });
  //   response.end(JSON.stringify(users));
  // }

  // Build file path
  let filePath = path.join(
    __dirname,
    "public",
    request.url === "/" ? "index.html" : request.url
  );
  // console.log(filePath);
  // response.end();

  // Extention of file
  let extName = path.extname(filePath);

  // Initial content type
  let contentType = "text/html";

  // Check ext and set the content type
  switch (extName) {
    case ".js":
      contentType: "text/javascript";
      break;
    case ".css":
      contentType: "text/css";
      break;
    case ".json":
      contentType: "application/json";
      break;
    case ".png":
      contentType: "image/png";
      break;
    case ".jpg":
      contentType: "image/jpg";
      break;
    default:
      break;
  }

  // Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Page not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            if (err) {
              throw err;
            }
            response.writeHead(200, { "Content-Type": contentType });
            response.end(content, "utf-8");
          }
        );
      } else {
        // Some server error
        response.writeHead(500);
        response.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content, "utf-8");
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
