import React from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from './NavbarElement';

const Navbar = () => {
    return (
        <>
        <Nav> 
            <NavLink to="/">
                <h1>Online Banking</h1>
            </NavLink>
            <Bars />
            <NavMenu>
                <NavLink to="/home" activestyle>
                    Home
                </NavLink>
                <NavLink to="/transfer" activestyle>
                    Transfer
                </NavLink>
                <NavLink to="/transaction" activestyle>
                     Transaction
                </NavLink>
                <NavLink to="/accounts" activestyle>
                    Accounts
                </NavLink>
                <NavLink to="/billPayment" activestyle>
                    Bill Payment
                </NavLink>
                <NavLink to="/add-DeletePayee" activestyle>
                    Add/Delete Payee
                </NavLink>
            </NavMenu>
            <NavBtn>
                <NavBtnLink to='signin'>Sign In</NavBtnLink>
            </NavBtn>
        </Nav>
        </>
    )
}

export default Navbar
