import ShopActionTypes from './shop.types';
import { firestore, GetCollectionSnapshot } from '../../firebase/firebase.utils';


export const updateCollections = collectionMap => ({
    type: ShopActionTypes.UPDATE_COLLECTION,
    payload: collectionMap
});

export const fetchCollectionStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionSuccess = collectionMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionMap
});

export const fetchCollectionFailure = errorCode => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorCode
})

export const fetchCollectionStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection("collections");
        dispatch(fetchCollectionStart());

        collectionRef.get().then(snapshot => {
            const collectData = GetCollectionSnapshot(snapshot);
            dispatch(fetchCollectionSuccess(collectData))
        }).catch(error => dispatch(fetchCollectionFailure(error.message)))
    }
};
