import {createSelector} from 'reselect';

const COLLECTION_ID_MAP = {
    medicines:1,
    feeds:2,
    cages:3,
    birds:4,
    pets:5
}

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollection = collectionUrlParam => createSelector (
    [selectShopCollections],
    collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
);