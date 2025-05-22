using BookManagementAPI.Models;
namespace BookManagementAPI.Services
{
    public class BookService
    {
        private readonly List<Book> _books = new();

        public List<Book> GetAll() => _books;

        public Book? GetById(int id) => _books.FirstOrDefault(b => b.Id == id);

        public Book Add(Book book)
        {
            book.Id = _books.Count + 1;
            _books.Add(book);
            return book; // ✅ Return the added book
        }

        public bool Update(int id, Book updated)
        {
            var book = GetById(id);
            if (book == null) return false;

            book.Title = updated.Title;
            book.Author = updated.Author;
            book.ISBN = updated.ISBN;
            book.PublicationDate = updated.PublicationDate;
            return true; // ✅ Return success flag
        }

        public bool Delete(int id)
        {
            var book = GetById(id);
            if (book == null) return false;

            _books.Remove(book);
            return true; // ✅ Return success flag
        }
    }
}
