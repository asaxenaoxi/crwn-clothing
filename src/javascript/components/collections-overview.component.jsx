import React from 'react';
/*import SHOP_DATASTORE from '../data/shop.data';*/
import CollectionPreview from './collection-preview.component';
import '../../styles/collections-overview.styles.scss';

import {selectShopCollectionsForPreview} from '../redux/shop.redux';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

/*Render CollectionPreview for each category in the Collections list*/

const CollectionsOverview = ({collections}) => 
{
    return (
        <div className="collections-overview">
        {
            collections.map(({id, ...otherCollectionProps}) => (
                <CollectionPreview key={id} {...otherCollectionProps}/>
            ))
        }
        </div>
    );
}

const mapStateToProps = createStructuredSelector(
    { 
        collections: selectShopCollectionsForPreview
    }
);

export default connect(mapStateToProps, null)(CollectionsOverview);