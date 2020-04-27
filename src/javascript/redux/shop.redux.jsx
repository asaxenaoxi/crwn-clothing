import { createSelector } from 'reselect';
import CONST_SHOP_DATA from '../data/shop.data';

/*Default values for the User Reducer State Object*/
const INITIAL_STATE = 
{
    collections : CONST_SHOP_DATA
}

const shopReducer = (prevState = INITIAL_STATE, action) =>
{
    switch(action.type)
    {
        default:
            return prevState;
    }
}

/*input selector*/
const selectShop = (reduxState) => reduxState.shop;

export const selectShopCollections = createSelector([selectShop], (shop) => shop.collections);

/*This selector converts the newly converted collections object from an array to hashmap back to array for easier iteration.
Here the selector is picking up all the collections from the shop
and for the collection, its picking up all the keys of this hashmap into a array of key string which is returned by Object.keys
on this returned key array, we iterate using map() and for each key we access the value in collections hashmap for that key
return is an array -> map() is doing the returning of the all values as a array*/  
export const selectShopCollectionsForPreview = createSelector([selectShopCollections], (collections) => Object.keys(collections).map((key) => collections[key]));

/*Here we return a selector which takes an input of collection ID which is basically the route parameter and then from the collections, 
finds the exact match and returns the collection item*/
/*export const selectShopCollectionsById = (collectionId) => 
    createSelector([selectShopCollections], (collections) => 
        collections.find((collection) => 
            collection.routeName === collectionId));*/

/*Instead of storing collections as an array, store it an an hashtable object and access data with key:value lookup were key will be the url param*/
export const selectShopCollectionsById = (collectionId) => 
    createSelector([selectShopCollections], (collections) => collections[collectionId]);

export default shopReducer;