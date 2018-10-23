import React from 'react';
import {Link } from 'react-router-dom';
import { Navbar,Nav,NavItem } from 'react-bootstrap';


const NavBar = () => {
        return (
         <div>
            <Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
     <Link to='/'>SevenSoft</Link>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
      <NavItem eventKey={1} href={`/${'produce'}`}>
        Produce
      </NavItem>
      <NavItem eventKey={2} href={`/${'Meats'}`}>
        Meats
      </NavItem>
      <NavItem eventKey={3} href={`/${'Dairy'}`}>
        Dairy
      </NavItem>
      <NavItem eventKey={4} href={`/${'Beverages'}`}>
        Beverages
      </NavItem>
      <NavItem eventKey={5} href="/profile">
        User
      </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>;
         </div>
                        
        );
    
    
}

export default NavBar;