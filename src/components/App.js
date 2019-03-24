import React, { Component, Fragment } from "react";
import { 
  BrowserRouter as Router, 
  Route,
  Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { Container } from "react-bootstrap";
import QuestionNavigation from "./QuestionNavigation";
import QuestionPreviewContainer from "./QuestionPreviewContainer";
import QuestionNavbar from "./QuestionNavbar";
import LoadingBar from 'react-redux-loading'
import QuestionPage from './QuestionPage'
import Lader from './Lader'
import NewQuestion from './NewQuestion'

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100) // fake async
  }
}

class Login extends React.Component {
  state = {
    redirectToRefferrer: false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToRefferrer: true
      }))
    })
  }

  render() {
    const { redirectToRefferrer } = this.state
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (redirectToRefferrer === true) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div>
        <p>You must log in to view this page at {from.pathname}</p>
        <button onClick={this.login}>Log in </button>
      </div>
    )

  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
)


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Container>
          <QuestionNavbar />

          <div>
            <LoadingBar />
            {this.props.loading === true
              ? null
              : <div>
                <Route path='/' exact component={QuestionPreviewContainer} />
                <Route path='/question/:id' exact component={QuestionPage} />
                <Route path='/lader' exact component={Lader} />
                <Route path='/newQuestion' exact component={NewQuestion}/>
              </div>}
          </div>
        </Container>
      </Router>

    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
