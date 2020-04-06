import React from 'react';
import './collection-item.styles.scss';

//(props) OR ({id, name, price, imageUrl})
const CollectionItem = ({id, name, price, imageUrl}) => (
//img (hover add Add to Cart button)
//name <> price
    <div className="collection-item">
        <div className="image"
            style={{backgroundImage: `url(${imageUrl})`}}/>
        {/*Ref: https://www.w3schools.com/react/react_css.asp
            style is a css property which accepts objects so the first {} is to specify that its javascript 
            and then next {} specify that its an object key:value pairs. Also backgrounImage is a js property
            not css and hence is in camel case and since that entire thing is a js object, the value side
            which needs another variable needs to be put in ticks which evaluate the dynamic part of the string
            and put all of it in a concatinated form as value. the reason you need ${} is because you need to tell js
            that while this is a string, anything with ${} needs to be expanded from js variable to string form*/}
        <div className="collection-footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>
    </div>
)

export default CollectionItem;