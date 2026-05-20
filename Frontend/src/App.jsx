import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'

function App() {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <Home />
      </main>
      <Footer />
    </>
  )
}

export default App
