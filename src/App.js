import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './Components/Header'
import Footer from './Components/Footer'

//Website Pages Layout.
import HomePage from './Pages/HomePage'
import ProductPage from './Pages/ProductPage'


function App() {
  return (
    <Router >
      {/* Header Component "Contains NavBar". */}
      <Header />

      <main className='py-3'>
        <Container>
          <Routes>
          <Route path='/' exact element={<HomePage />}/>
          <Route path='/product/:id' element={<ProductPage />}/>
          </Routes>
        </Container>
      </main>

      {/* Footer Component "Contains Copyright". */}
      <Footer />
    </Router>
  );
}

export default App;
