import React from 'react';
import '../../styles/collection-preview.styles.scss';
import CollectionItem from './collection-item.component';

const CollectionPreview = ({title, items}) => (
    <div className="collection-preview">
        <h1 className="title">{title.toUpperCase()}</h1>
        <div className="preview">
        {
            //in map() call we first deconstruct the object into id and then all other properties/parameters are caught in the ... operator and referenced
            //as otherItemProps which can then further be spread or just referenced to be passed (as many got passed) anywhere else in the code.
            items
            .filter((item, index) => index < 4)
            .map(({id, ...otherItemProps}) => 
            (
                <CollectionItem key={id} {...otherItemProps}/>
            ))
        }
        </div>
    </div>
)

export default CollectionPreview;
