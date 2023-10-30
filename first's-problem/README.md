# Advanced Library Management System
### Book Class
### Properties:

- isbn: unique id
- title: book title
- author: author of the book
- genre: genre of the book (e.g., fiction, non-fiction, sci-fi, etc.)
- publishedYear: year the book was published
- ratings: an array of ratings given by users, each rating is an object { userId, rating } where rating is a number between 1 and 5.
### Methods:

- averageRating(): returns the average rating of the book
- rateBook(userId, rating): allows a user to rate the book, or update their rating if they've already rated it
---
### LibraryManagement Function
### Properties:

- books: stores all books in an array
### Methods:

- addBook(title, author, genre, publishedYear): adds a new book to the end of the books array, auto-generates an isbn, and returns the new book object
- findBooksByAuthor(authorName): returns an array of books written by the given author
- findBooksByGenre(genre): returns an array of books from a particular genre
- topRatedBooks(n): returns the top 'n' books sorted by their average ratings
- recentlyPublished(): returns books published in the last 5 years, sorted by their published year
---
Advanced Practice Exercises:
Add Multiple Genres: Update the addBook method to accept multiple genres for a book. Modify the findBooksByGenre method to return books that have any of the provided genres.

Complex Search: Write a function that takes a query string and searches for it in book titles, authors, and genres, and returns matching books.

Rating a Book: Given an isbn, userId, and a rating, use the rateBook method to add a new rating or update an existing one.

Top Rated Authors: Write a function that returns the top 'n' authors based on the average ratings of all their books.

Recommendation System: Based on the genres of the books rated highest by a user, recommend other books from those genres which the user hasn't rated yet.

Analytics - Genre Popularity: Write a function that provides a breakdown of books in the library by genre. The result should be an object where keys are genres and values are the number of books in each genre.

Advanced Filtering: Write a function that returns all books that meet certain criteria, e.g., books by a particular author, published between certain years, and having an average rating above a certain value.