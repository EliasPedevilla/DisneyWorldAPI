import request from "supertest";
import app from "../index.js";

describe("CHARACTERS TEST", () => {
  describe("GET /characters", () => {
    it("response with a json containing all characters", (done) => {
      request(app)
        .get("/characters")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe("GET /characters/:id", () => {
    it("response with a json containing a single character", (done) => {
      request(app)
        .get("/characters/1")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });

    it('response with status 400 and text "The id must be a number"', (done) => {
      request(app)
        .get("/characters/abc")
        .expect("The id must be a number")
        .expect(400, done);
    });

    it('response with status 400 and text "The id must be a number"', (done) => {
      request(app)
        .get("/characters/999999")
        .expect("The character does not exist")
        .expect(404, done);
    });
  });

  describe("POST /characters/create", () => {
    it('response with status 400 and text "In the body there are incorrect or empty fields"', (done) => {
      request(app)
        .post("/characters/create")
        .expect("In the body there are incorrect or empty fields")
        .expect(400, done);
    });

    it('response with status 400 and text "In the body there are incorrect or empty fields"', (done) => {
      request(app)
        .post("/characters/create")
        .send({ name: 123 })
        .expect("In the body there are incorrect or empty fields")
        .expect(400, done);
    });
  });

  describe("PUT /characters/update/:movieId", () => {
    it('response with status 400 and text "The id must be a number"', (done) => {
      request(app)
        .put("/characters/update/string")
        .expect("The id must be a number")
        .expect(400, done);
    });

    it('response with status 400 and text "The id must be a number"', (done) => {
      request(app)
        .put("/characters/update/99999")
        .send({
          urlPhoto: "https://example.com",
          name: "example",
          age: 10,
          weight: 99,
          history: "History",
        })
        .expect("The character does not exist")
        .expect(404, done);
    });
  });

  describe("DELETE /characters/delete/:movieId", () => {
    it('response with status 400 and text "The id must be a number"', (done) => {
      request(app)
        .delete("/characters/delete/string")
        .expect("The id must be a number")
        .expect(400, done);
    });

    it('response with status 400 and text "The id must be a number"', (done) => {
      request(app)
        .delete("/characters/delete/99999")
        .expect("The character does not exist")
        .expect(404, done);
    });
  });
});

describe("MOVIES TEST", () => {
  describe("GET /movies", () => {
    it("response with a json containing all movies", (done) => {
      request(app)
        .get("/movies")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe("GET /movies/:id", () => {
    it("response with a json containing a single character", (done) => {
      request(app)
        .get("/movies/1")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });

    it('response with status 400 and text "The id must be a number"', (done) => {
      request(app)
        .get("/movies/abc")
        .expect("The id must be a number")
        .expect(400, done);
    });

    it('response with status 400 and text "The id must be a number"', (done) => {
      request(app)
        .get("/movies/999999")
        .expect("The movie does not exist")
        .expect(404, done);
    });
  });

  describe("POST /movies/create", () => {
    it('response with status 400 and text "In the body there are incorrect or empty fields"', (done) => {
      request(app)
        .post("/movies/create")
        .expect("In the body there are incorrect or empty fields")
        .expect(400, done);
    });

    it('response with status 400 and text "In the body there are incorrect or empty fields"', (done) => {
      request(app)
        .post("/movies/create")
        .send({ title: 123 })
        .expect("In the body there are incorrect or empty fields")
        .expect(400, done);
    });
  });

  describe("PUT /movies/update/:movieId", () => {
    it('response with status 400 and text "The id must be a number"', (done) => {
      request(app)
        .put("/movies/update/string")
        .expect("The id must be a number")
        .expect(400, done);
    });

    it('response with status 400 and text "The id must be a number"', (done) => {
      request(app)
        .put("/movies/update/99999")
        .send({
          urlPhoto: "https://example.com",
          name: "example",
          age: 10,
          weight: 99,
          history: "History",
        })
        .expect("The movie does not exist")
        .expect(404, done);
    });
  });

  describe("DELETE /movies/delete/:movieId", () => {
    it('response with status 400 and text "The id must be a number"', (done) => {
      request(app)
        .delete("/movies/delete/string")
        .expect("The id must be a number")
        .expect(400, done);
    });

    it('response with status 400 and text "The id must be a number"', (done) => {
      request(app)
        .delete("/movies/delete/99999")
        .expect("The movie does not exist")
        .expect(404, done);
    });
  });
});
