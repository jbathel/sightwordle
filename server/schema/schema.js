const { words } = require('../sampleData.js');

// Mongoose Models
const Word = require('../models/Word');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require('graphql');

// Word Type
const WordType = new GraphQLObjectType({
  name: 'Word',
  fields: () => ({
    id: { type: GraphQLID },
    word: { type: GraphQLString },
    wordLength: { type: GraphQLString },
    wordGroup: { type: GraphQLString },
  }),
});

// Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    words: {
      type: new GraphQLList(WordType),
      resolve(parent, args) {
        return Word.find();
      },
    },
    word: {
      type: WordType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Word.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
