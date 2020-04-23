import React from 'react';
import '../../styles/collection-item.styles.scss';
import CustomButton from './custom-button.components';

import { connect } from 'react-redux';
import { addItemToCart } from '../redux/cart.redux';

/*(props) OR ({id, name, price, imageUrl})*/
const CollectionItem = ({item, addItemToCart}) => 
{
    /*img (hover add Add to Cart button)
    name <> price*/
    /*Ref: https://www.w3schools.com/react/react_css.asp
        style is a css property which accepts objects so the first {} is to specify that its javascript 
        and then next {} specify that its an object key:value pairs. Also backgrounImage is a js property
        not css and hence is in camel case and since that entire thing is a js object, the value side
        which needs another variable needs to be put in ticks which evaluate the dynamic part of the string
        and put all of it in a concatinated form as value. the reason you need ${} is because you need to tell js
        that while this is a string, anything with ${} needs to be expanded from js variable to string form*/

    const {name, price, imageUrl} = item;

    return (
        <div className="collection-item">
            <div className="image"
                style={{backgroundImage: `url(${imageUrl})`}}/>
            <div className="collection-footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <CustomButton buttonStyle='invesrted' onClick={() => addItemToCart(item)}> Add to Cart </CustomButton>            
        </div>
    )
};


/*this returns an object of properties that will be spread into the component with function values and hence when 
you use the properties by name, those functions are called with the parameter*/
const mapDispatchToProps = (dispatch) =>
(
    {
        addItemToCart: (item) => dispatch(addItemToCart(item))
    }
)

export default connect(null, mapDispatchToProps)(CollectionItem);