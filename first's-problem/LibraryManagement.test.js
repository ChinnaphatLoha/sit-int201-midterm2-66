const LibraryManagement = require('./LibraryManagement');

/**
 * Test suite for LibraryManagement
 */
describe('LibraryManagement', () => {
    /**
     * Library instance
     * @type {Object}
     */
  let library;

  /**
   * Setup before each test
   */
  beforeEach(() => {
    library = LibraryManagement();
  });

  test('Books should be added to the library', () => {
    let length = 0;
    length = library.addBook('Book 1', 'Author 1', ['Genre1', 'Genre2'], 2021);
    length = library.addBook('Book 2', 'Author 2', ['Genre2', 'Genre3'], 2022);
    expect(length).toBe(2);
  });

  test('Books should be found by author', () => {
    library.addBook('Book 1', 'Author 1', ['Genre1', 'Genre2'], 2021);
    library.addBook('Book 2', 'Author 2', ['Genre2', 'Genre3'], 2022);
    const books = library.findBooksByAuthor('Author 1');
    expect(books.length).toBe(1);
    expect(books[0].title).toBe('Book 1');
  });

  test('Books should be found by genre', () => {
    library.addBook('Book 1', 'Author 1', ['Genre1', 'Genre2'], 2021);
    library.addBook('Book 2', 'Author 2', ['Genre2', 'Genre3'], 2022);
    const books = library.findBooksByGenre('Genre2');
    expect(books.length).toBe(2);
  });

  test('Top rated books should be retrieved', () => {
    library.addBook('Book 1', 'Author 1', ['Genre1', 'Genre2'], 2021);
    library.addBook('Book 2', 'Author 2', ['Genre2', 'Genre3'], 2022);
    library.rateBook(1, 1, 5);
    library.rateBook(2, 1, 4);
    const topRatedBooks = library.topRatedBooks(1);
    expect(topRatedBooks.length).toBe(1);
    expect(topRatedBooks[0].title).toBe('Book 1');
  });

  test('Recently published books should be retrieved', () => {
    library.addBook('Book 1', 'Author 1', ['Genre1', 'Genre2'], 2021);
    library.addBook('Book 2', 'Author 2', ['Genre2', 'Genre3'], 2022);
    const recentlyPublishedBooks = library.recentlyPublished();
    expect(recentlyPublishedBooks.length).toBe(2);
    expect(recentlyPublishedBooks[0].title).toBe('Book 2');
  });

  test('Books should be searched by query', () => {
    library.addBook('Book 1', 'Author 1', ['Genre1', 'Genre2'], 2021);
    library.addBook('Book 2', 'Author 2', ['Genre2', 'Genre3'], 2022);
    const searchedBooks = library.searchBooks('Author 1');
    expect(searchedBooks.length).toBe(1);
    expect(searchedBooks[0].title).toBe('Book 1');
  });

  test('Books should be rated', () => {
    library.addBook('Book 1', 'Author 1', ['Genre1', 'Genre2'], 2021);
    library.rateBook(1, 1, 4);
    expect(library.books[0].ratings.length).toBe(1);
  });

  test('Top rated authors should be retrieved', () => {
    library.addBook('Book 1', 'Author 1', ['Genre1', 'Genre2'], 2021);
    library.addBook('Book 2', 'Author 2', ['Genre2', 'Genre3'], 2022);
    library.rateBook(1, 1, 5);
    library.rateBook(2, 1, 4);
    const topRatedAuthors = library.topRatedAuthors(1);
    expect(topRatedAuthors.length).toBe(1);
    expect(topRatedAuthors[0].author).toBe('Author 1');
  });

  test('Books should be recommended to a user', () => {
    library.addBook('Book 1', 'Author 1', ['Genre1', 'Genre2'], 2021);
    library.addBook('Book 2', 'Author 2', ['Genre2', 'Genre3'], 2022);
    library.rateBook(1, 1, 5);
    const recommendations = library.recommendBooks(1);
    expect(recommendations.length).toBe(1);
    expect(recommendations[0].title).toBe('Book 2');
  });

  test('Genre popularity should be calculated', () => {
    library.addBook('Book 1', 'Author 1', ['Genre1', 'Genre2'], 2021);
    library.addBook('Book 2', 'Author 2', ['Genre2', 'Genre3'], 2022);
    const genrePopularity = library.genrePopularity();
    expect(genrePopularity.Genre1).toBe(1);
    expect(genrePopularity.Genre2).toBe(2);
    expect(genrePopularity.Genre3).toBe(1);
  });

  test('Books should be filtered based on criteria', () => {
    library.addBook('Book 1', 'Author 1', ['Genre1', 'Genre2'], 2021);
    library.addBook('Book 2', 'Author 2', ['Genre2', 'Genre3'], 2022);
    library.rateBook(1, 1, 3);
    const filteredBooks = library.advancedFiltering(
      'Author 1',
      [2000, 2022],
      3
    );
    expect(filteredBooks.length).toBe(1);
    expect(filteredBooks[0].title).toBe('Book 1');
  });
});
