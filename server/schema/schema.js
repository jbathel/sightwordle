const { words } = require('../sampleData.js');

// Mongoose Models
const Word = require('../models/Word');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
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

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add word
    addWord: {
      type: WordType,
      args: {
        word: { type: GraphQLNonNull(GraphQLString) },
        wordLength: { type: GraphQLNonNull(GraphQLString) },
        wordGroup: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const word = new Word({
          word: args.word,
          wordLength: args.wordLength,
          wordGroup: args.wordGroup,
        });
        return word.save();
      },
    },
    // Delete word
    deleteWord: {
      type: WordType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Word.findByIdAndRemove(args.id);
      },
    },
    //  Update a word
    updateWord: {
      type: WordType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        word: { type: GraphQLString },
        wordLength: { type: GraphQLString },
        wordGroup: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Word.findByIdAndUpdate(
          args.id,
          {
            $set: {
              word: args.word,
              wordLength: args.wordLength,
              wordGroup: args.wordGroup,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
