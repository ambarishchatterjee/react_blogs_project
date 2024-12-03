
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/login/Login';
import Registration from './pages/auth/registration/Registration';
import Blogs from './pages/blog/Blogs';
import BlogDetails from './pages/blog/BlogDetails';
import Categories from './pages/blog/Categories';
import CategoryPost from './pages/blog/CategoryPost';
import Wrapper from './layout/wrapper/Wrapper';

function App() {
  return (
    <div className="App">
      <Router>
      <Wrapper>
      <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/registration' element={<Registration/>} />
          <Route path='/blogs' element={<Blogs/>} />
          <Route path='/blog/:id' element={<BlogDetails />} />
          <Route path='/categories' element={<Categories/>} />
          <Route path='/category/:id' element={<CategoryPost/>} />
        </Routes>
        </Wrapper>
        </Router>
    </div>
  );
}

export default App;
