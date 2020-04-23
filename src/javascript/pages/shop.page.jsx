import React from 'react';
import SHOP_DATASTORE from '../data/shop.data';
import CollectionPreview from '../components/collection-preview.component';

class ShopPage extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {
            collections: SHOP_DATASTORE
        }
    }

    render() {
        const {collections} = this.state;
        /*deconstructing collections out of state so you dont have to refer to collections with this.state.collections all the time.*/

        return (
            <div>
            {
                collections.map(({id, ...otherCollectionProps}) => (
                    <CollectionPreview key={id} {...otherCollectionProps}/>
                ))
            }
            </div>
        );
    }
}

export default ShopPage;