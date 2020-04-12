import { takeLatest, put, call, all } from 'redux-saga/effects';
import userActionTypes from './user.types';
import { googleProvider, auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { signInSuccess, signInFailure } from './user.actions';



export function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const snapShot = yield userRef.get();
        yield put(signInSuccess({ id: snapShot.id, ...snapShot.data() }));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* googleSignInProcess() {

    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* emailSignInProcess({ payload: { email, password } }) {
    try {
        const user = yield auth.signInWithEmailAndPassword(email, password);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailure(error));
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