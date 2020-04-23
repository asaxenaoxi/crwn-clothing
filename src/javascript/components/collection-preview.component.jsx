import React from 'react';
import '../../styles/collection-preview.styles.scss';
import CollectionItem from './collection-item.component';

const CollectionPreview = ({title, items}) => (
    <div className="collection-preview">
        <h1 className="title">{title.toUpperCase()}</h1>
        <div className="preview">
        {
            /*in map() call we first deconstruct the object into id and then all other properties/parameters are caught in the ... operator and referenced
            as otherItemProps which can then further be spread or just referenced to be passed (as many got passed) anywhere else in the code*/
            /*.map(({id, ...otherItemProps}) => //We were first not needing the item in CollectionItem but now that we have got the Add Item to Cart button
            and we need to store the item in the cart and pass it to cart redux state, we need to make following changes where only item is being passed 
            rather than spreading the item properites*/

            items
            .filter((item, index) => index < 4)
            .map((item) =>
            (
                <CollectionItem key={item.id} item={item}/>
                /*<div key={item.id}>{item.id} {item.name}</div>*/
            ))
        }
        </div>
    </div>
)

export default CollectionPreview;
