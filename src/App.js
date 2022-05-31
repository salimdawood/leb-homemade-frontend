import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ContactUs from './pages/ContactUs';
import Error from './pages/Error'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import RequireAuth from './components/RequireAuth'
import UserDashboard from './pages/UserDashboard'
import CardPage from './pages/CardPage';
import AddCardPage from './pages/AddCardPage';
import {UserContextProvider} from './context/userContext'
import {CardContextProvider} from './context/cardContext'

function App() {
  
  return (
    <Router>
      <UserContextProvider>
        <CardContextProvider>
          <div className="app-container">
            <nav>
              <Navbar/>
            </nav>
            <main>
              <Routes>
                  <Route element={<RequireAuth/>}>
                    <Route path="/user/:userId/cards" element={<CardPage />}/>
                    <Route path="/user/:userId/add-card" element={<AddCardPage />}/>
                    <Route path="/user/:userId" element={<UserDashboard />}/>
                  </Route>
                  <Route path="/contactus" element={<ContactUs />}/>
                  <Route path="/signin" element={<SignIn />}/>
                  <Route path="/signup" element={<SignUp />}/>
                  <Route path="/aboutus" element={<AboutUs />}/>
                  <Route index element={<Home />}/>
                  <Route path="/*" element={<Error />}/>
                </Routes>
            </main>
            <footer>
              <Footer/>
            </footer>
          </div>
        </CardContextProvider>
      </UserContextProvider>
    </Router>
  );
}

export default App;
