import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

/* components */
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Container from './components/layouts/Container'
import Message from './components/layouts/Message'

/* pages */
import Register from './components/pages/Auth/Register'
import Login from './components/pages/Auth/Login'

/* context */
import {UserProvider} from './context/UserContext' // serve para todos os componente conseguirem acessar o contexto do usuário

function App() {
  return (
    <Router>
      <UserProvider>
      <Navbar />
        <Message />
        <Container>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </Switch>
        </Container>
      <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
