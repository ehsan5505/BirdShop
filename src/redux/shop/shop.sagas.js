import ShopActionTypes from './shop.types';
import { takeLatest, put, call,all } from 'redux-saga/effects';

import { firestore, GetCollectionSnapshot } from '../../firebase/firebase.utils';
import { fetchCollectionSuccess, fetchCollectionFailure } from './shop.actions';

export function* fetchCollectionAsync() {
    try {
        const CollectionRef = firestore.collection('collections');
        const snapShot = yield CollectionRef.get();
        const collectionMap = yield call(GetCollectionSnapshot, snapShot);
        yield put(fetchCollectionSuccess(collectionMap));
    } catch (error) {
        yield put(fetchCollectionFailure(error.message));
    }

}

export function* fetchCollectionStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionAsync)
}

export function* shopSagas() {
    yield all([call(fetchCollectionStart)]);
}
