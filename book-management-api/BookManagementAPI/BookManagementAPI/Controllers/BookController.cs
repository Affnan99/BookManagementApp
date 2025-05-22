using Microsoft.AspNetCore.Mvc;
using BookManagementAPI.Models;
using BookManagementAPI.Services;

namespace BookManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly BookService _bookService;

        public BookController(BookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public ActionResult<List<Book>> GetAll() => _bookService.GetAll();

        [HttpGet("{id}")]
        public ActionResult<Book> GetById(int id)
        {
            var book = _bookService.GetById(id);
            return book == null ? NotFound() : Ok(book);
        }

        [HttpPost]
        public ActionResult<Book> Add(Book book)
        {
            var createdBook = _bookService.Add(book);
            return CreatedAtAction(nameof(GetById), new { id = createdBook.Id }, createdBook); // ✅ Correct
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Book book)
        {
            var result = _bookService.Update(id, book);
            return result ? NoContent() : NotFound(); // ✅ Use boolean return
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _bookService.Delete(id);
            return result ? NoContent() : NotFound(); // ✅ Use boolean return
        }
    }
}
