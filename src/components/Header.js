import React from 'react';
import Form from './Form';
import Nav from './Nav';

const Header = (props) => {
    return (
        <div>
            <Form searchFunc={props.searchFunc}></Form>
            <Nav searchFunc={props.searchFunc}></Nav>
        </div>
    )
}

export default Header;
