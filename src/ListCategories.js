import React from 'react';
import './App.css';

class ListCategories extends React.Component {
    render() {
        return (
            <div className="title">
               <h2>BOOKS COLLECTION (Want to Read)</h2>
               <div className="wrapper">
                   {this.props.products.map((product) => (
                        <div key={product.id}>
                            <img className="img" src={product.images[0].src} alt={product.title}/>
                            <div>
                                <div className="button" onClick={() => this.props.onAddToReadingList(product)}>ADD TO READING LIST</div>
                                <div>{product.title}</div>
                            </div>
                        </div>
                   ))}
                </div>
            </div>
        );
    }
}

export default ListCategories;
