import React, { useState, useEffect } from "react";
import "./style.css";
import Footer from "./footer";
import { signUp, logIn, logOut, checkAuthState } from "./auth";
import { motion } from "framer-motion"; // Import Framer Motion

const booksData = [
  { title: "Atomic Habits", author: "James Clear", publishDate: "2018", summary: "A book about building good habits." },
  { title: "Deep Work", author: "Cal Newport", publishDate: "2016", summary: "A book about focused work." },
  { title: "The Alchemist", author: "Paulo Coelho", publishDate: "1988", summary: "A story about following dreams." },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", publishDate: "2011", summary: "A book about cognitive biases." },
  { title: "The Power of Habit", author: "Charles Duhigg", publishDate: "2012", summary: "How habits shape our lives." }
];

function App() {
  const [books, setBooks] = useState(booksData);
  const [search, setSearch] = useState("");
  const [modalBook, setModalBook] = useState(null);
  const [user, setUser] = useState(null);
  const [modalType, setModalType] = useState(""); // "login" or "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentBookIndex, setCurrentBookIndex] = useState(0); // For book rotation

  useEffect(() => {
    checkAuthState(setUser);
  }, []);

  // Function to cycle books manually
  const nextBook = () => {
    setCurrentBookIndex((prevIndex) => (prevIndex + 1) % books.length);
  };

  // Handle Login
  const handleLogin = async () => {
    try {
      await logIn(email, password);
      alert("Login successful!");
      setEmail(""); // Clear input field
      setPassword(""); // Clear input field
      setModalType(""); // Close modal
    } catch (error) {
      alert(error);
    }
  };

  // Handle Signup
  const handleSignup = async () => {
    try {
      await signUp(email, password);
      alert("Signup successful!");
      setEmail(""); // Clear input field
      setPassword(""); // Clear input field
      setModalType(""); // Close modal
    } catch (error) {
      alert(error);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await logOut();
    setUser(null);
  };

  return (
    <div className="App">
      {/* Navbar */}
      <header>
        <nav className="navbar">
          <div className="logo">Shelfmate.</div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
            <button className="search-btn">🔍</button>
          </div>
          <div className="nav-buttons">
            {user ? (
              <>
                <span className="user-email">👤 {user.email}</span>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button className="login-btn" onClick={() => setModalType("login")}>Login</button>
                <button className="signup-btn" onClick={() => setModalType("signup")}>Sign Up</button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main>
        <motion.section
          className="hero"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1>Discover, Review, and Explore Books</h1>
          <p>Your ultimate destination for book summaries, reviews, and recommendations!</p>
          <motion.button
            className="explore-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Explore Now
          </motion.button>
        </motion.section>

        {/* Book List Section */}
        <section className="book-list">
          <h2>Popular Books</h2>
          <div className="book-container">
            {books
              .slice(currentBookIndex, currentBookIndex + 3) // Show only 3 books at a time
              .map((book, index) => (
                <motion.div
                  key={index}
                  className="book"
                  onClick={() => setModalBook(book)}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </motion.div>
              ))}
          </div>
          <button className="next-btn" onClick={nextBook}>Next</button>
        </section>
      </main>

      {/* Book Details Modal */}
      {modalBook && (
        <motion.div
          className="modal"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.div
            className="modal-content"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: -50 }}
            transition={{ duration: 0.4 }}
          >
            <span className="close" onClick={() => setModalBook(null)}>&times;</span>
            <h2>{modalBook.title}</h2>
            <p>Author: {modalBook.author}</p>
            <p>Published: {modalBook.publishDate}</p>
            <p>{modalBook.summary}</p>
          </motion.div>
        </motion.div>
      )}

      {/* Login/Signup Modal */}
      {modalType && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalType("")}>&times;</span>
            <h2>{modalType === "login" ? "Login" : "Sign Up"}</h2>
            <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {modalType === "login" ? (
              <button onClick={handleLogin}>Login</button>
            ) : (
              <button onClick={handleSignup}>Sign Up</button>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
