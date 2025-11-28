    import { BrowserRouter } from 'react-router-dom';
    import { Routes, Route } from 'react-router-dom';
    import HomeCredit from './HomeCredit.jsx';
    import Products from './Products.jsx';

    function App() {
      return (
        <BrowserRouter>
           <Routes>
                <Route path="/" element={<HomeCredit />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </BrowserRouter>
      );
    }

    export default App;