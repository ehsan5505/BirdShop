import { takeLatest, put, call, all } from 'redux-saga/effects';
import userActionTypes from './user.types';
import { googleProvider, auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { googleSignInSuccess, googleSignInFailure, emailSignInFailure } from './user.actions';

export function* googleSignInProcess() {

    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        console.log(user);
        const userRef = yield call(createUserProfileDocument, user);
        const snapShot = yield userRef.get();
        yield put(googleSignInSuccess(snapShot));

    } catch (error) {
        yield put(googleSignInFailure(error));
    }
}

export function* emailSignInProcess({ payload: { email, password } }) {
    yield console.log("Email:" + email + "\n Password:" + password);
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email,password);
        // const { user } = yield put(auth.signInWithEmailAndPassword(email, password));
        // console.log(user);
    } catch (error) {
        yield put(emailSignInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, googleSignInProcess);
}

export function* onEmailSignInStart() {
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, emailSignInProcess);
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart)])
}