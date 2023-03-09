import './styles/App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AllMovies from './pages/AllMovies';
import Header from './components/Header';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/all-movies" element={<AllMovies />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
