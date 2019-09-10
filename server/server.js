import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import graphqlHttp from 'express-graphql';
import { buildSchema } from 'graphql';
import bcrypt from 'bcrypt';
import Post from './models/posts';
import User from './models/users';

require('babel-core/register');
require('babel-polyfill');
var ObjectId = require('mongodb').ObjectID;

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
        type Post {
          _id: ID!
          text: String!
          date: String!
          creator: User!
        }

        input PostInput {
          title: String!
          description: String!
          price: Float!
          date: String!
        }
        type User {
          _id: ID!
          email: String!
          password: String
          createdPosts: [Post!]
        }
        input UserInput {
          email: String!
          username: String!
          password: String!
        }
        input LoggingInput {
          email: String!
        }
        input PostQueryInput {
          userId: String!
        }
        type RootQuery {
            posts: [Post!]!
        }
        type RootMutation {
            createPost(postInput: PostInput): Post
            createUser(userInput: UserInput): User
            login(loggingInput: LoggingInput): User
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      posts: async (userId) => {
        let posts;
        try {
          // posts = await Post.find({creator: ObjectId(`${userId}`) });
          posts = await Post.find({creator: ObjectId("5d77f6d72603a81dffcac840") });
          
        } catch (e) {
          throw new Error('Something went wrong in posts');
        }
        return posts;
      },
      createPost: async (args) => {
        let post;
        try {
          post = new Post({
            title: args.postInput.title,
            description: args.postInput.description,
            price: +args.postInput.price,
            date: new Date(args.postInput.date),
            creator: '5d666d94066c4618efbf178c',
          });

          post = await post.save();

          const foundUser = await User.findById('5d666d94066c4618efbf178c');
          if (!foundUser) {
            throw new Error('User not found');
          }

          foundUser.createdPosts.push(post);
          foundUser.save();
        } catch (e) {
          throw new Error('Something went wrong in createPost');
        }
        return post;
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
      },
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
