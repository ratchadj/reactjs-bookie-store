import React from 'react';
import './App.css';

class ListCurrently extends React.Component {
    render() {
        // console.log("props", this.props);
        return (
            <div className="title">
               <h2>READING LIST (Currently Reading)</h2>
               <div className="wrapper">
                   {this.props.readings.map((product) => (
                        <div key={product.id}>
                            <img className="img" src={product.images[0].src} alt={product.title} />
                            <div className="button" onClick={() => this.props.onAddToReadList(product)}>END READ</div>
                            <div className="button" onClick={() => this.props.onAddToCategoriesList(product)}>CANCEL READ</div>
                            <div>{product.title}</div>
                        </div>
                   ))}
                </div>
            </div>
        );
    }
}

export default ListCurrently;
