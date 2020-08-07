// import the gql tagged template function
const { gql } = require('apollo-server-express');


// create our typeDefs
const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    savedBooks:[Book]
}
type Book {
    author:String
    description: String
    bookId: String
    image: String
    link:String
    title:String
}
type Auth {
    token: ID!
    user: User
}

type Query{
    me: User

}
type Mutation {
  login(email: String!, password: String):Auth
  addUser(username: String!, email: String!, password: String!):Auth
  addBook(author:String
    description: String
    bookId: String
    image: String
    link:String
    title:String) Book
  deleteBook(bookId: String!)
}

`;

// export the typeDefs
module.exports = typeDefs;