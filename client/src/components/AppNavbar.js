import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { LoginModal } from './LoginModal';
import { Logout } from './Logout';
import { RegisterModal } from './RegisterModal';

export const AppNavbar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) =>
    state.auth.user ? state.auth.user.name : null
  );

  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <div>
      <Navbar color="dark" dark expand="md" className="mb-5">
        <NavbarBrand href="/" className="mr-auto">
          ShoppingList
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse
          className="justify-content-end me-5"
          isOpen={!collapsed}
          navbar
        >
          <Nav className="" navbar>
            {isAuthenticated ? (
              <>
                <NavItem>
                  <NavLink href="#">{`welcome ${user}`}</NavLink>{' '}
                </NavItem>{' '}
                <NavItem>
                  <Logout />
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <RegisterModal />
                </NavItem>
                <NavItem>
                  <LoginModal />
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
