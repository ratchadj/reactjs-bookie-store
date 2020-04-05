import React from 'react';
import './App.css';

class ListRead extends React.Component {
    render() {
        return (
            <div className="title">
               <h2>READ LIST</h2>
               <div className="wrapper">
                   {this.props.read.map((product) => (
                        <div key={product.id}>
                            <img className="readimg" src={product.images[0].src} alt={product.title} />
                            <div>{product.title}</div>
                        </div>
                   ))}
                </div>
            </div>
        );
    }
}

export default ListRead;
