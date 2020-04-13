import { takeLatest, put, call, all } from 'redux-saga/effects';
import userActionTypes from './user.types';
import { googleProvider, auth, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { signInSuccess, signInFailure, signOutFailure, signOutSuccess, signUpSuccess, signUpFailure } from './user.actions';



export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
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

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure());
    }
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const user = yield auth.createUserWithEmailAndPassword(
            email,
            password
        );
        yield put(signUpSuccess({ user, additionalData: { displayName } }));
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* signInSignOut({ payload: { user, additionalData } }) {
    try {
        yield getSnapshotFromUserAuth(user, additionalData);
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, googleSignInProcess);
}

export function* onEmailSignInStart() {
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, emailSignInProcess);
}

export function* onCheckCurrentUser() {
    yield takeLatest(userActionTypes.CHECK_THE_CURRENT_USER, isUserAuthenticated);
}

export function* onSignOutStart() {
    yield takeLatest(userActionTypes.SIGN_OUT_START, signOut);
}


export function* onSignUpStart() {
    yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInSignOut);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckCurrentUser),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}