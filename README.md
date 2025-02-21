# Blocker

A **React-based project for cryptocurrencies**: With *Blocker* you can manage your own portfolio, track token prices and performance, and even view other users’ portfolios. The application features **Google Auth** integration and **JWT token**-based authentication.

---

## Overview

**Blocker** is designed to make crypto portfolio management simple and intuitive. It allows you to:

- Add tokens to your portfolio.  
- Display price history and performance (charts/graphs).  
- Track performance from the moment you add a token.  
- View other people’s portfolios (if they are public or shared).  
- Use Google Auth or JWT-based authentication to sign in.

Leveraging **Chart.js** (via `react-chartjs-2`), you can visualize token price histories. Additional libraries like `react-icons` enhance styling and icon support.

---

## Key Features

1. **Portfolio Management**  
   - Add various cryptocurrencies to your personal portfolio.  
   - Observe price trends and historical data using external APIs (via `axios`).

2. **Performance Monitoring**  
   - Track gains/losses since the purchase date/time.  
   - Graphical representations powered by `react-chartjs-2` and `chart.js`.

3. **Other Portfolios**  
   - View other users’ portfolios and compare their performance (depending on share settings).

4. **Authentication**  
   - **Google Login** via `react-google-login`.  
   - **JWT token**-based authentication to secure user data and portfolios.

5. **User-Friendly UI**  
   - Modern React components for a seamless experience.  
   - Visual highlights and loading animations via `react-spinners`.

---

## Requirements

- **Node.js** (version 14.x or higher recommended)  
- **npm** or **yarn** (choose your preferred package manager)  

Check your installed versions with:
```bash
node -v
npm -v
```

---

## Installation

1. **Clone** (or download) the repository:
   ```bash
   git clone https://github.com/alohacyclist/blocker.git
   ```
2. **Change** into the project directory:
   ```bash
   cd blocker
   ```
3. **Install** dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

From here, you can customize environment variables (like a `REACT_APP_GOOGLE_CLIENT_ID` or an API base URL) if needed, then start the development server:

```bash
npm start
# or
yarn start
```
