const { User } = require('../models');
const { AuthenticationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth');

const resolvers = {

Query: {
 me: async (parent, args, context) => {
     if(context.user) {
         const userData = await User.findOne({_id:context.user._id})
        .select('-__v -password')
        .populate('savedBooks')

        return userData;
        }
        throw new AuthenticationError('Not logged in');
 }
},
Mutation: {
 createUser: async (parent, args) => {
     const user = await User.create(args);

     const token = signToken(user);

     return {token, user};
 },
 login: async (parent, {email, password}) => {
     const user = await User.findOne({email});

     if(!user) {
        throw new AuthenticationError('Incorrect credentials');
     }

     const correctPw = await user.isCorrectPassword(password);

     if(!correctPw) {
        throw new AuthenticationError('Incorrect credentials');

    }
    const token = signToken(user);
    return {token, user};
 },
 saveBook: async (parent, {user,body}, context) => {
     if(context.user) {
         const updatedBooks = await User.findOneAndUpdate(
            { _id: user._id },
            { $addToSet: { savedBooks: body } },
            { new: true, runValidators: true }
         );
         return updatedBooks;
     }
     throw new AuthenticationError('You need to be logged in!');
 },
 deleteBook: async (parent,{user, params}, context) => {
     if(context.user) {
      const updatedBooks = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );
      return updatedBooks;
     }
     throw new AuthenticationError('You need to be logged in!');
 }
}


};

module.exports = resolvers;