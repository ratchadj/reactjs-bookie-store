import React from 'react';
import './App.css';

class Search extends React.Component {
    render() {
        return (
            <div className="">
                <input type="text" id="searchInput"
                    placeholder="Search Name.." 
                    value={this.props.query}
                    onChange={(event) => this.props.onUpdateQuery(event.target.value)}
                />
            </div>
        );
    }
}

export default Search;
