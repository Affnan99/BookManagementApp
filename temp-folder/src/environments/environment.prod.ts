export const environment = {
production: true,
apiUrl: 'http://your-production-api.com/api',
version: '1.0.0',
debug: false,
endpoints: {
books: {
base: 'http://your-production-api.com/api/books',
get: 'http://your-production-api.com/api/books',
getById: (id: number) => `http://your-production-api.com/api/books/${id}`,
      create: 'http://your-production-api.com/api/books',
      update: (id: number) => `http://your-production-api.com/api/books/${id}`,
      delete: (id: number) => `http://your-production-api.com/api/books/${id}`
    }
  }
};
