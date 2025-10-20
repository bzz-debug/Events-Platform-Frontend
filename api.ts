import {
  doc,
  collection,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import { db, auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

async function addEvent(
  eventName: string,
  startDateTime: Date,
  endDateTime: Date,
  description: string,
  eventPrice: string,
  attendees: Array<string>
) {
  try {
    const docRef = await addDoc(collection(db, "events"), {
      name: eventName,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      description: description,
      eventPrice: eventPrice,
      createdAt: new Date(),
      attendees: attendees,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getSingleEvent(eventId: string) {
  const docRef = doc(db, "events", eventId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
}

async function getEvents() {
  const eventsDocs = await getDocs(collection(db, "events"));
  const eventsArray = eventsDocs.docs.map((event) => {
    return { ...event.data(), id: event.id };
  });
  return eventsArray;
}

async function updateEventDescription(eventId: string, newDescription: string) {
  const eventRef = doc(db, "events", eventId);
  await updateDoc(eventRef, {
    description: newDescription,
    updatedAt: new Date(),
  });
  console.log("Event description updated!");
}

async function deleteEvent(eventId: string) {
  await deleteDoc(doc(db, "events", eventId));
  console.log("Event deleted!");
}

export function registerUser(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      return { success: true, user: user };
    })
    .catch((error) => {
      const errorMessage = error.message;
      return { success: false, error: errorMessage };
    });
}

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Sign-in result:", userCredential.user);
      const user = userCredential.user;
      console.log(user);
      return { success: true, user: user };
    })
    .catch((error) => {
      return { success: false, message: error.message };
    });
}

export async function signUserOut() {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
    return { success: true };
  } catch {
    return { success: false, error: "failed" };
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(`user ${uid} is logged in`);
  } else {
  }
});

const isAdmin = (email: string) => {
  const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(",") || [];
  return adminEmails.includes(email);
};

export async function googleSignIn() {
  console.log("googleSignIn function called");
  let token;
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/calendar");
  try {
    console.log("About to create user document");
    const result = await signInWithPopup(auth, provider);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential) {
      token = credential.accessToken;
    }

    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      createdAt: new Date(),
      accesstoken: token,
    });
    console.log("User document created successfully");

    return { success: true, user: user.uid, token: token };
  } catch (error) {
    console.error("Failed to create user document:", error);

    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }

    return { success: false, error: errorMessage };
  }
}

export async function addAttendee(eventId: string, newAttendeeEmail: string) {
  const eventRef = doc(db, "events", eventId);
  await updateDoc(eventRef, {
    attendees: arrayUnion(newAttendeeEmail),
  });
  const updatedDoc = (await getDoc(eventRef)).data();
  return updatedDoc?.attendees ?? [];
}

export {
  addEvent,
  deleteEvent,
  updateEventDescription,
  getSingleEvent,
  isAdmin,
  getEvents,
};

export function registerGoogleUser() {}
