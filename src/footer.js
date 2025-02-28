import React from "react";
import "./style.css"; // Keep styles in one place

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; 2025 Shelfmate. All rights reserved.</p>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
