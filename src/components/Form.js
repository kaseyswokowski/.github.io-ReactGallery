import React from 'react';
import { Link } from 'react-router-dom';


class Form extends React.Component {
    constructor(){
        super();
        // Initialise state
        this.state = {
            inputValue: ''
        }
    }
    
    // Function to update state's inputValue
    updateInputValue (e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    // Function to fetch query using App's fetchDynamicData function
    performSearch (query) {
        // Make sure user has actually provided a search term
        if(this.state.inputValue !== ""){
        // Reset state which will also reset form input's value 
        this.setState({
            inputValue: ''
        })
        this.props.searchFunc(query)
        }
    }

    buttonData () {
        return (
        /* Perform search when form search button is clicked, passing in input value */
        <button onClick={() => this.performSearch(this.state.inputValue)} type="submit" className="search-button">
        <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    </button>
        )
    }

    render(){
        return (
            <React.Fragment>
                <form className="search-form">
                    {/* Update state's input value when value of input changes */}
                    <input value={this.state.inputValue} type="search" name="search" placeholder="Search" onChange={e => this.updateInputValue(e)}/>
                    {/* Link to dynamic search route 
                        Render disabled link if input is yet to be entered */}
                    {this.state.inputValue !== ""
                    ?
                    <Link to={`/search=${this.state.inputValue}`}>{this.buttonData()}</Link>
                    :
                    <Link to={`/search=${this.state.inputValue}`} className="disabled" onClick={ (e) => e.preventDefault() }>{this.buttonData()}</Link>
                    }
                </form>
            </React.Fragment>        
        );
    }
}

export default Form;