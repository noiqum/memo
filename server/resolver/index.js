
const books = [
    { id: '1', name: 'holy book', author: 'sizo one' },
    { id: '2', name: 'captain america', author: 'marvel' },
    { id: '3', name: 'eat pray love', author: 'useless one' }
];

const resolver = () => ({
    // books: () => {
    //     return books;
    // },
    // saveBook: (args) => {
    //     const bookName = args.name;
    //     return bookName;
    // },

    book: (parentValue, args) => {
        for (let i = 0; i < books.length; i++) {
            if (books[i].id == args.id) {
                return books[i]
            }
        }

    }


});







module.exports = resolver;