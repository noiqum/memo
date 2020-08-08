const { buildSchema } = require("graphql");
const {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID
} = require("graphql");
const resolver = require("../resolver");

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        name: { type: GraphQLString },
        id: { type: GraphQLID },
        author: { type: GraphQLString },
    }),
});
const PersonType = new GraphQLObjectType({
    name: "person",
    fields: () => ({
        shelves: {
            type: new GraphQLList(Shelf),
            args: {
                id: { type: GraphQLID }
            }
            , resolve: (parentValue, args) => {
                return shelves.filter((elm) => {
                    return elm.ownerId === parentValue.id
                })
            }
        },
        name: { type: new GraphQLNonNull(GraphQLString) },
        id: { type: new GraphQLNonNull(GraphQLID) }
    })
})
const Shelf = new GraphQLObjectType({
    name: "shelf",
    fields: () => ({
        name: { type: GraphQLString },
        id: { type: GraphQLID },
        content: { type: new GraphQLList(BookType) },
        genre: { type: GraphQLString }
    })
})
const shelves = [{
    name: 'acil', ownerId: 1, id: 'a', content: [{ id: '1', name: 'holy book', author: 'sizo one' },
    { id: '2', name: 'captain america', author: 'marvel' },
    { id: '3', name: 'eat pray love', author: 'useless one' }], genre: 'education'
}]
const persons = [
    {
        name: "ali", id: 1, shelves: [{ id: 'a' }],
    }
]

const books = [
    { id: '1', name: 'holy book', author: 'sizo one' },
    { id: '2', name: 'captain america', author: 'marvel' },
    { id: '3', name: 'eat pray love', author: 'useless one' }
];
const rootquery = new GraphQLObjectType({
    name: "RootQuery",
    fields: () => ({
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString }
            },
            resolve: (parentValue, args) => {
                if (args.id !== undefined) {
                    for (let i = 0; i < books.length; i++) {
                        if (books[i].id == args.id) {
                            return books[i]
                        }
                    }
                } else {
                    for (let i = 0; i < books.length; i++) {
                        if (books[i].name === args.name) {
                            return books[i]
                        }
                    }
                }

            }

        },
        books: {

            type: new GraphQLList(BookType),
            resolve: () => {
                return books;
            }
        },
        person: {
            type: PersonType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parentValue, args) => {
                if (args.id !== undefined) {
                    for (let i = 0; i < persons.length; i++) {
                        if (persons[i].id == args.id) {
                            return persons[i]
                        }
                    }
                } else {
                    for (let i = 0; i < persons.length; i++) {
                        if (persons[i].name === args.name) {
                            return persons[i]
                        }
                    }
                }
            }
        }
    })

})
const schema = new GraphQLSchema({
    query: rootquery,
    mutation: null
})



module.exports = schema;
