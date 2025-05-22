export const environment = {
production: false,
debug: true,
endpoints: {
books: {
base: 'http://localhost:3000/api/Book',
get: 'http://localhost:3000/api/Book',
getById: (id: number) => `http://localhost:3000/api/Book/${id}`,
      create: 'http://localhost:3000/api/Book',
      update: (id: number) => `http://localhost:3000/api/Book/${id}`,
      delete: (id: number) => `http://localhost:3000/api/Book/${id}`
    }
  }
};
