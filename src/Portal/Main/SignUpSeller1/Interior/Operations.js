import { auth, firestore } from '../../../../Provider/Firebase';

export const createUser = (email, password) => auth.createUserWithEmailAndPassword(email, password)
  .then(userCred => {
    const userID = userCred.user.uid;
    return firestore
      .doc(`users/${userID}`)
      .set({
        email,
        role: 'seller',
        ID: userID,
      });
  });

export const abc = '';
