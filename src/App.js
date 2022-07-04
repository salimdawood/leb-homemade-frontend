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
import UpdateCardPage from './pages/UpdateCardPage';
import AddCardPage from './pages/AddCardPage';
import {UserContextProvider} from './context/userContext'
import {CardContextProvider} from './context/cardContext'
import {NotificationContextProvider} from './context/notificationContext'
import MenuModel from './model/MenuModel'
import PhotoModel from './model/PhotoModel'
import NotificationModel from './model/NotificationModel'
import UserCards from './pages/UserCards';

function App() {
  
  return (
    <Router>
      <UserContextProvider>
        <CardContextProvider>
          <NotificationContextProvider>
            <div className="app-container">
              <nav>
                <Navbar/>
              </nav>
              <main>
                <Routes>
                    <Route element={<RequireAuth/>}>
                      <Route path="/user/:userId/cards" element={<UpdateCardPage />}/>
                      <Route path="/user/:userId/add-card" element={<AddCardPage />}/>
                      <Route path="/user/:userId" element={<UserDashboard />}/>
                    </Route>
                    <Route path="/:username/cards" element={<UserCards />}/>
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
            <PhotoModel/>
            <MenuModel/>
            <NotificationModel/>
          </NotificationContextProvider>
        </CardContextProvider>
      </UserContextProvider>
    </Router>
  );
}

export default App;
