import React, { Component } from 'react'
import { connect } from "react-redux";
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from "./Question.module.css";

class QuestionNavbar extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" >
        <Navbar.Brand >Would you rather</Navbar.Brand>
        <Nav className="mr-auto">
            <NavItem >
              <Link to="newQuestion" className={styles.barLink}>
              New Question</Link>
          </NavItem>
          <NavItem href="#pricing" className={styles.barLink}>Leader Board</NavItem>
        </Nav>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link >login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {typeof this.props.authedUser === 'undefined'
          ? ''
          : console.log(this.props.authedUser.name)}
      </Navbar>
    )
  }
}



function mapStateToProps({ questions , authedUser,users }) {
  return {
    questionIds: Object.keys(questions),
    authedUser: users[authedUser],
    users:users
  };
}

export default connect(mapStateToProps)(QuestionNavbar);
