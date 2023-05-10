const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const rtdb = admin.database();

// [TESTED OK]
exports.onCreateUser = functions.auth.user().onCreate(async (user) => {
  try {
    await db.doc(`users/${user.uid}`).set(
      {
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        uid: user.uid,
        // timestamp: "", --->TODO
      },
      { merge: true }
    );
    functions.logger.info("User Successfully Created");
  } catch (error) {
    functions.logger.error(error.message);
  }
});

// [TESTED OK]
exports.onAddTeam = functions.firestore
  .document(`users/{uid}/my_team/{teamId}`)
  .onWrite(async (change, context) => {
    const { teamId } = context.params;
    // create or update case.
    try {
      if (change.after.exists) {
        const newValue = change.after.data();
        await db.doc(`public_teams/${teamId}`).set(
          {
            ...newValue,
          },
          { merge: true }
        );
        functions.logger.info("Team added Successfully Created");
      } else {
        // delete case.
        await db.doc(`public_teams/${teamId}`).delete();
      }
    } catch (error) {
      functions.logger.error(error.message);
    }
  });

// Send and Accept team request.----------------------------------------------->>>>TODO
/* const data = {
    id,
    uid,
    opponentUid, [required]
    myTeamId, [required]
    opponentTeamId, [required]
    timestamp,
  }
  await setDoc(ref, data);
*/

// [TESTED OK]
exports.sendRequestToTeam = functions.firestore
  .document(`users/{uid}/send_request/{id}`)
  .onWrite(async (change, context) => {
    // create or update case.
    const { id } = context.params;
    try {
      if (change.after.exists) {
        const newValue = change.after.data();
        const { runFunction } = newValue;
        functions.logger.log(newValue);
        if (!runFunction) {
          return;
        }
        const { opponentUid, uid } = newValue;
        await db.doc(`users/${opponentUid}/recieved_request/${id}`).set(
          {
            ...newValue,
            uid: opponentUid,
            opponentUid: uid,
            isAccepted: false,
            runFunction: false,
          },
          { merge: true }
        );
        functions.logger.info("Request send Successfully.");
      } else {
        // delete case.
        const oldValue = change.before.data();
        const { opponentUid } = oldValue;
        await db.doc(`users/${opponentUid}/recieved_request/${id}`).delete();
      }
    } catch (error) {
      functions.logger.error(error.message);
    }
  });

// required parameters
/* 
    const data =  {
      isAccepted, 
      runFunction,
      opponentUid,
    }

    `user/${opponentUid}/recieved_request/${id}`

    */

// [TESTED OK]
exports.onWriteRecievedRequest = functions.firestore
  .document(`users/{uid}/recieved_request/{id}`)
  .onWrite(async (change, context) => {
    // create or update case.
    const { id } = context.params;
    try {
      if (change.after.exists) {
        const newValue = change.after.data();
        const { opponentUid, isAccepted, runFunction, uid } = newValue;
        if (!runFunction) {
          return;
        }
        await db.doc(`users/${opponentUid}/send_request/${id}`).set(
          {
            ...newValue,
            uid: opponentUid,
            opponentUid: uid,
            runFunction: false,
          },
          { merge: true }
        );
        functions.logger.info("Request recieve Successfully.");
        // Todo: CHAT
        if (isAccepted == true) {
          const newChatId = `chatId_${rtdb.ref(`/chat_rooms`).push().key}`;
          const memberData = {};
          memberData["chatId"] = newChatId;
          memberData["uid1"] = opponentUid;
          memberData["uid2"] = uid;
          const memberRef = rtdb.ref(`/chat_rooms/${newChatId}`);
          await memberRef.set(memberData);
          // send welcome message
          const newMessageId = `messageId_${
            rtdb.ref(`/messages/${newChatId}`).push().key
          }`;
          const memberMessageRef = rtdb.ref(
            `/messages/${newChatId}/${newMessageId}`
          );
          const newMessage = {
            timestamp: "Timestamp",
            messageId: newMessageId,
            message:
              "Thanks for using Tournament Organizer! Your can now chat!",
            uid: "superAdmin",
          };
          await memberMessageRef.set(newMessage);
        }
      } else {
        // return;
        const oldValue = change.before.data();
        const { opponentUid } = oldValue;
        await db.doc(`users/${opponentUid}/send_request/${id}`).delete();
      }
    } catch (error) {
      functions.logger.error(error.message);
      return;
    }
  });

  
exports.onCreateChatRoom = functions.database.ref(`/chat_rooms/{chatId}`)
.onWrite(async (change, context) => {
  const { chatId } = context.params;
  if (change.after.exists()) {
    const newValue = change.after.val();
    const { uid1, uid2 } = newValue;
    const user1ref = rtdb.ref(`/user_chatIds/${uid1}`)
    const user2ref = rtdb.ref(`/user_chatIds/${uid2}`)
    const user1Data = {}
    user1Data[chatId] = true;
    const user2Data = {}
    user2Data[chatId] = true;
    await user1ref.update(user1Data)
    await user2ref.update(user2Data)
  }
})