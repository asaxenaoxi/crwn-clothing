import React from 'react';
/*import SHOP_DATASTORE from '../data/shop.data';*/
import CollectionsOverview from '../components/collections-overview.component';
import '../../styles/shop.page.styles.scss';
import CollectionDetails from '../components/collection-details.component';

import {Route} from 'react-router-dom';

/*First we started with having the shop page with all the categories listing, now that we are building shop page to have the overview of all categories,
it will also hold components to display each category detailed component as well and to ensure we are able to render the correct component, we will use
the route component on the shop page. when its just /shop it will be overview, when its /shop/:category then it will render one of the categories and the
reason category is a property and not a fixed named route is because its a dynamic field.*/

/*When you route, the way you build your next path is by relatively adding to it and to do that you need to see what path exactly matched*/

const ShopPage = ({match}) => 
{
    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} component={CollectionsOverview}></Route>
            <Route path={`${match.path}/:collectionId`} component={CollectionDetails}></Route>
        </div>
    );
}

export default ShopPage;