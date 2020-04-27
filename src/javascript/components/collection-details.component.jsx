import React from 'react';
import '../../styles/collection-details.styles.scss';
import CollectionItem from './collection-item.component';
import {connect} from 'react-redux';
/*Made a major error, was importing without {} which made selectShopCollectionsById = default export from shop.redux which was the shopReducer function*/
import {selectShopCollectionsById} from '../redux/shop.redux';

/*this components holds top 4 items of a specific category in the store*/
/*each item is in CollectionItem component*/

const CollectionDetails = ({match, collection}) => 
{
    console.log('CollectionDetails:', collection);
    return(
        <div className="collection-details">
            <h2 className="title">{ collection.title }</h2>
            <div className="items">
            {
                collection.items
                .map((item) =>
                (
                    <CollectionItem key={item.id} item={item}/>
                ))
            }
            </div>
        </div>
    );
}

/*selectShopCollectionsById is a call to createSelector so it will return a function where we need to pass the state, 
in default case reduxState is automatically passed to selector call*/
const mapStateToProps = (reduxState, ownProps) => ({collection: selectShopCollectionsById(ownProps.match.params.collectionId)(reduxState)});

export default connect(mapStateToProps, null)(CollectionDetails);