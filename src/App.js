import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

/* components */
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Container from './components/layouts/Container'
import Message from './components/layouts/Message'

/* pages */
import Register from './components/pages/Auth/Register'
import Login from './components/pages/Auth/Login'
import MyProfile from './components/pages/User/MyProfile'
import UserEdit from './components/pages/User/UserEdit'
import UserDetails from './components/pages/User/UserDetails'
import HomePage from './components/pages/HomePage'

/* context */
import {UserProvider} from './context/UserContext' // serve para todos os componente conseguirem acessar o contexto do usuário

function App() {
  return (
    <Router>
      <UserProvider>
      <Navbar />
        <Container>
        <Message />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/user/profile">
              <MyProfile />
            </Route>
            <Route path="/user/edit">
              <UserEdit />
            </Route>
            <Route path="/user/:id">
              <UserDetails />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Container>
      <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
