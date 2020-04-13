import userActionTypes from '../user/user.types';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import { clearItem } from './cart.actions';

export function* clearCartItem() {
    yield put(clearItem());
}

export function* onSignOutClearCart() {
    yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartItem);
}

export function* cartSagas() {
    yield all([call(onSignOutClearCart)]);
} 