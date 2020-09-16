import gql from 'graphql-tag';

export const LOGIN_USER =gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token user {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                description
                author
                link
                image
            }
        }
    }
}

`;
export const ADD_USER =gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token user {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                description
                author
                image
                link
            }
        }
    }
}
`;
export const SAVE_BOOK =gql`
mutation saveBook($input: BookInput!) {
    saveBook(input: $input) {
        _id
        username
        email
        savedBooks {
            bookId
            author
            image
            description
            title
            link
        }
    }
}
`;
 export const REMOVE_BOOK =gql`
mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            author
            image
            description
            title
            link
        }
    }
}
`;
