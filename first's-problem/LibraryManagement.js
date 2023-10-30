/**
 * Represents a book in the library.
 */
class Book {
  /**
   * Creates a new Book instance.
   * @param {number} isbn - Unique ID of the book.
   * @param {string} title - Title of the book.
   * @param {string} author - Author of the book.
   * @param {string[]} genres - Genres of the book.
   * @param {number} publishedYear - Year the book was published.
   */
  constructor(isbn, title, author, genres, publishedYear) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.genres = genres;
    this.publishedYear = publishedYear;
    /**
     * @type {{ userId: number, rating: 1 | 2 | 3 | 4 | 5 }[]}
     */
    this.ratings = [];
  }

  /**
   * Calculates the average rating of the book.
   * @returns {number} - Average rating.
   */
  averageRating() {
    if (this.ratings.length === 0) {
      return 0;
    }
    const totalRating = this.ratings.reduce(
      (sum, rating) => sum + rating.rating,
      0
    );
    return totalRating / this.ratings.length;
  }

  /**
   * Allows a user to rate the book or update their rating if they've already rated it.
   * @param {number} userId - ID of the user.
   * @param {number} rating - User's rating for the book (1 to 5).
   */
  rateBook(userId, rating) {
    rating = Math.max(1, Math.min(5, rating));
    const existingRatingIndex = this.ratings.findIndex(
      (r) => r.userId === userId
    );
    if (existingRatingIndex === -1) {
      this.ratings.push({ userId, rating });
    } else {
      this.ratings[existingRatingIndex].rating = rating;
    }
  }
}

/**
 * Manages the library's books and provides various functionalities.
 * @returns {{books,addBook,findBooksByAuthor,findBooksByGenre,topRatedBooks,recentlyPublished,searchBooks,rateBook,topRatedAuthors,recommendBooks,genrePopularity,advancedFiltering,}} - Library management functions.
 */
const LibraryManagement = () => {
  /**
   * @type {Book[]}
   */
  let books = [];
  let currentId = 0;

  /**
   * Adds a new book to the library.
   * @param {string} title - Title of the book.
   * @param {string} author - Author of the book.
   * @param {string[]} genres - Genres of the book.
   * @param {number} publishedYear - Year the book was published.
   * @returns {number} - Total number of books in the library.
   */
  const addBook = (title, author, genres, publishedYear) => {
    const book = new Book(++currentId, title, author, genres, publishedYear);
    books.push(book);
    return books.length;
  };

  const findBooksByAuthor = (authorName) =>
    books.filter((book) => book.author === authorName);

  const findBooksByGenre = (genre) => {
    return books.filter((book) => book.genres.includes(genre));
  };

  const topRatedBooks = (n) => {
    return books
      .sort((a, b) => b.averageRating() - a.averageRating())
      .slice(0, n);
  };

  const recentlyPublished = () => {
    return books
      .filter((book) => book.publishedYear >= new Date().getFullYear() - 5)
      .sort((a, b) => b.publishedYear - a.publishedYear);
  };

  const searchBooks = (query) => {
    return books.filter(
      (book) =>
        book.title.includes(query) ||
        book.author.includes(query) ||
        book.genres.includes(query)
    );
  };

  const rateBook = (isbn, userId, rating) => {
    const book = books.find((book) => book.isbn === isbn);
    if (book) {
      book.rateBook(userId, rating);
    }
  };

  /**
   * 
   * @param {number} n 
   * @returns {{author: string, averageRating: number}[]}}
   */
  const topRatedAuthors = (n) => {
    const authors = {};
    for (const book of books) {
      if (authors[book.author]) {
        authors[book.author].push(book);
      } else {
        authors[book.author] = [book];
      }
    }
    return Object.entries(authors)
      .map(([author, books]) => ({
        author,
        averageRating:
          books.reduce((sum, book) => sum + book.averageRating(), 0) /
          books.length,
      }))
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, n);
  };

  /**
   * Recommends books to a user based on the genres of highly rated books by the user.
   * @param {number} userId - ID of the user.
   * @returns {Object[]} - Array of recommended books.
   */
  const recommendBooks = (userId) => {
    /**
     * @type {Set<string>}
     */
    const userRatedGenres = new Set();
    for (const book of books) {
      if (book.ratings.some((rating) => rating.userId === userId)) {
        book.genres.forEach((genre) => userRatedGenres.add(genre));
      }
    }

    const unratedBooksInGenres = books.filter((book) => {
      const isUserRated = book.ratings.some(
        (rating) => rating.userId === userId
      );
      const isGenreRated = book.genres.some((genre) =>
        userRatedGenres.has(genre)
      );
      return !isUserRated && isGenreRated;
    });

    // Calculate average rating for each unrated book
    const recommendedBooks = unratedBooksInGenres.map(
      ({ isbn, title, author, genres, publishedYear, ratings }) => {
        const totalRating = ratings.reduce(
          (sum, rating) => sum + rating.rating,
          0
        );
        const avgRating = totalRating / ratings.length;
        return { isbn, title, author, genres, publishedYear, avgRating };
      }
    );

    // Sort recommended books by average rating in descending order
    recommendedBooks.sort((a, b) => b.avgRating - a.avgRating);

    return recommendedBooks;
  };

  const genrePopularity = () => {
    const genres = {};
    for (const book of books) {
      for (const genre of book.genres) {
        if (genres[genre]) {
          genres[genre]++;
        } else {
          genres[genre] = 1;
        }
      }
    }
    return genres;
  };

  const advancedFiltering = (author, publishedYears, avgRating) => {
    return books.filter((book) => {
      const isAuthorMatch = book.author === author;
      const isPublishedYearMatch =
        book.publishedYear >= publishedYears[0] &&
        book.publishedYear <= publishedYears[1];
      const isAvgRatingMatch = book.averageRating() >= avgRating;
      return isAuthorMatch && isPublishedYearMatch && isAvgRatingMatch;
    });
  };

  /**
   * @type {{books,addBook,findBooksByAuthor,findBooksByGenre,topRatedBooks,recentlyPublished,searchBooks,rateBook,topRatedAuthors,recommendBooks,genrePopularity,advancedFiltering,}}
   */
  return {
    books,
    addBook,
    findBooksByAuthor,
    findBooksByGenre,
    topRatedBooks,
    recentlyPublished,
    searchBooks,
    rateBook,
    topRatedAuthors,
    recommendBooks,
    genrePopularity,
    advancedFiltering,
  };
};

module.exports = LibraryManagement;
