const { ApolloServer, gql, PubSub } = require("apollo-server");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://user:passwor1d@cluster0-oeio5.gcp.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;

const movieSchema = new mongoose.Schema({
  title: String,
  releaseDate: Date,
  rating: Number,
  status: String,
  actorIds: [String]
});
// l123l123l123

const Movie = mongoose.model("Movie", movieSchema);

const typeDefs = gql`
  scalar Date

  enum Status {
    WATCHED
    INTERESTED
    NOT_INTERESTED
    UNKNOWN
  }

  type Actor {
    id: ID!
    name: String!
  }

  type Movie {
    id: ID!
    title: String
    releaseDate: Date
    rating: Int
    status: Status
    # actor: [Actor!]! - need to have an array with data
    actor: [Actor]!
  }

  type Subscription {
    movieAdded: Movie
  }

  type Query {
    movies: [Movie]
    movie(title: String): Movie
  }

  input ActorInput {
    id: ID
    # name: String
  }

  input MovieInput {
    id: ID
    title: String
    releaseDate: Date
    rating: Int
    status: Status
    # actor: [Actor!]! - need to have an array with data
    actor: [ActorInput]
  }

  type Mutation {
    addMovie(movie: MovieInput): [Movie]
  }
`;

const movies = [
  {
    title: "Kongfu Panda",
    releaseDate: new Date("1-2-2014"),
    rating: 5,
    id: "11",
    actor: [
      {
        id: "111"
      }
    ]
  },
  {
    title: "Eye of the Dragon",
    releaseDate: new Date("1-2-1974"),
    rating: 1,
    id: "2",
    actor: [
      {
        id: "777"
      }
    ]
  }
];

const actors = [
  {
    name: "Bruce lee",
    id: "777"
  },
  {
    name: "Checky chan",
    id: "111"
  }
];

const pubsub = new PubSub();
const MOVIE_ADDED = "MOVIE_ADDED";

const resolvers = {
  Subscription: {
    movieAdded: {
      subscribe: () => pubsub.asyncIterator([MOVIE_ADDED])      
    }
  },
  Query: {
    movies: () => {
      return Movie.find();
    },
    // movie: (obj, args, context, info) => {
    movie: (obj, { title }) => Movie.find({ title })
  },
  Mutation: {
    addMovie: async (obj, { movie }, { userId }) => {
      if (userId) {
        try {
          const addedMovie = await Movie.create({
            ...movie
          });
          pubsub.publish(MOVIE_ADDED, { movieAdded: addedMovie });
          return Movie.find();
        } catch (error) {
          console.log("error", error);
        }
      }
      return [];
    }
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "La Date",
    parseValue: value => new Date(value),
    serialize: value => value.getTime(),
    parseLiteral: ast => {
      ast.kind === Kind.INT ? new Date(ast.value) : null;
    }
  }),
  Movie: {
    actor: obj =>
      obj.actor.map(requestedActor =>
        actors.find(dbActor => dbActor.id === requestedActor.id)
      )
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: ({ req }) => {
    const fakeUser = {
      userId: "helloImAUser"
    };
    return { ...fakeUser };
  }
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  // we're connected!
  console.log("Database connected! 😄 ");

  server
    .listen({
      port: process.env.PORT || 4000
    })
    .then(({ url }) => {
      console.log(`Server started at ${url}`);
    });
});
