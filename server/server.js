import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import graphqlHttp from 'express-graphql';
import { buildSchema } from 'graphql';
import bcrypt from 'bcrypt';
import Event from './models/events';
import User from './models/users';

require('babel-core/register');
require('babel-polyfill');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
        type Event {
          _id: ID!
          title: String!
          description: String!
          price: Float!
          date: String!
          creator: User!
        }

        input EventInput {
          title: String!
          description: String!
          price: Float!
          date: String!
        }
        type User {
          _id: ID!
          email: String!
          password: String
          createdEvents: [Event!]
        }
        input UserInput {
          email: String!
          username: String!
          password: String!
        }
        input LoggingInput {
          email: String!
        }
        type RootQuery {
            events: [Event!]!
        }
        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
            login(loggingInput: LoggingInput): User
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: async () => {
        let events;
        try {
          events = await Event.find().populate('creator');
        } catch (e) {
          throw new Error('Something went wrong in events');
        }
        return events;
      },
      createEvent: async (args) => {
        let event;
        try {
          event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5d666d94066c4618efbf178c',
          });

          event = await event.save();

          const foundUser = await User.findById('5d666d94066c4618efbf178c');
          if (!foundUser) {
            throw new Error('User not found');
          }

          foundUser.createdEvents.push(event);
          foundUser.save();
        } catch (e) {
          throw new Error('Something went wrong in createEvent');
        }
        return event;
      },
      createUser: async (args) => {
        let user;
        try {
          user = await User.findOne({ email: args.userInput.email });
          if (user) {
            throw new Error('User exits already');
          }
          const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
          user = new User({
            email: args.userInput.email,
            username: args.userInput.username,
            password: hashedPassword,
          });
          user = await user.save();
        } catch (e) {
          throw new Error(`Something went wrong in createUser: ${e.message}`);
        }
        return user;
      },
      login: async (args) => {
        let user;
        try {
          user = await User.findOne({ email: args.loggingInput.email });
          if (!user) {
            throw new Error('User is not registered');
          }
        } catch (e) {
          throw new Error(`Something went wrong in login: ${e.message}`);
        }
        return user;
      }
    },
    graphiql: true,
  }),
);

// app.use(expressValidator());

app.listen(port, () => console.log(`Server is listening on port: ${port}`));

mongoose.connect('mongodb://localhost:27017/blog-graphql', { useNewUrlParser: true, useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Mongoose connection established');
});
