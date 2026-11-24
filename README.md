# Redux Toolkit Shopping Cart

A responsive shopping cart application built with React and Redux Toolkit. This project demonstrates modern state management, asynchronous API requests, persistent cart data, and component testing.

## Live Demo

Coming soon...

## Features

- Fetch products from Fake Store API
- Display product loading and error states
- Add products to the shopping cart
- Increase and decrease product quantities
- Remove individual products from the cart
- Clear the entire shopping cart
- Calculate total cart quantity and price
- Persist cart data using Redux Persist
- Handle asynchronous requests with Redux Toolkit's `createAsyncThunk`
- Prevent duplicate product fetch requests
- Responsive user interface
- Unit and component testing with Vitest and React Testing Library
- Custom 404 page for invalid routes

## Technologies

- React
- JavaScript (ES6+)
- Redux Toolkit
- React Redux
- React Router DOM
- Redux Persist
- Vite
- Bootstrap Icons
- CSS
- Vitest
- React Testing Library

## Installation

Clone the repository:

```bash
git clone https://github.com/zibaimani/redux-toolkit-shopping-cart.git
```

Navigate to the project directory:

```bash
cd redux-toolkit-shopping-cart
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Testing

Run all tests:

```bash
npx vitest run
```

## Production Build

Create a production build:

```bash
npm run build
```

## API

Product data is provided by [Fake Store API](https://fakestoreapi.com/).

## Project Structure

```text
src/
├── components/
│   ├── Header.jsx
│   ├── Loader.jsx
│   └── Loader.css
├── pages/
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── Products.test.jsx
│   ├── Cart.jsx
│   ├── Cart.test.jsx
│   └── NotFound.jsx
├── redux/
│   ├── cartSlice.js
│   ├── cartSlice.test.js
│   ├── productsSlice.js
│   ├── productsSlice.test.js
│   └── store.js
├── App.jsx
├── main.jsx
├── index.css
└── setupTests.js
```

## Testing Coverage

The project includes unit tests for Redux reducers, selectors, and asynchronous actions, as well as component tests for product listing and cart interactions.

## Author

Frontend Developer