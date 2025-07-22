import { createServer, Model } from "miragejs";
export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    // Server config here

    models: {
  song: Model, // Defines 'song' as a resource with CRUD support
   },

   seeds(server) {
  server.create("song", { id: "1", title: "Imagine", artist: "John Lennon", album: "Imagine", year: 1971 });
  server.create("song", { id: "2", title: "Billie Jean", artist: "Michael Jackson", album: "Thriller", year: 1982 });
  server.create("song", { id: "3", title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", year: 1975 });
    server.create("song", { id: "4", title: "Hotel California", artist: "Eagles", album: "Hotel California", year: 1976 });
    server.create("song", { id: "5", title: "Smells Like Teen Spirit", artist: "Nirvana", album: "Nevermind", year: 1991 });
    server.create("song", { id: "6", title: "Like a Rolling Stone", artist: "Bob Dylan", album: "Highway 61 Revisited", year: 1965 });
    server.create("song", { id: "7", title: "One", artist: "U2", album: "Achtung Baby", year: 1991 });
    server.create("song", { id: "8", title: "Hey Jude", artist: "The Beatles", album: "Past Masters", year: 1968 });
},

//CRUD OPERATIONSSSS
 routes() {
  this.namespace = "api"; // Prefix all routes with '/api'

  // READ: get all songs
  this.get("/songs", (schema) => {
    return schema.songs.all();
  });

  // CREATE a new song
  this.post("/songs", (schema, request) => {
    let attrs = JSON.parse(request.requestBody);
    return schema.songs.create(attrs);
  });

  // READ one song by id
  this.get("/songs/:id", (schema, request) => {
    let id = request.params.id;
    return schema.songs.find(id);
  });

  // UPDATE a song
  this.put("/songs/:id", (schema, request) => {
    let id = request.params.id;
    let attrs = JSON.parse(request.requestBody);
    return schema.songs.find(id).update(attrs);
  });

  // DELETE a song
  this.delete("/songs/:id", (schema, request) => {
    let id = request.params.id;
    return schema.songs.find(id).destroy();
  });
}



  });


  return server;
}
