import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// Your existing Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWhlvfzFVQciVWfgMU8T44jLgwYN5lRXI",
    authDomain: "trackyourtreat.firebaseapp.com",
    projectId: "trackyourtreat",
    storageBucket: "trackyourtreat.firebasestorage.app",
    messagingSenderId: "384533157822",
    appId: "1:384533157822:web:496344fb6debb56da38bef",
    measurementId: "G-GS20RCQR6F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Retrieve all saved houses
export async function getHouses() {
    const snapshot = await getDocs(collection(db, "houses"));

    return snapshot.docs.map(document => {
        const data = document.data();

        return {
            ...data,
            id: document.id,
            lat: data.lat ?? data.latitude,
            lng: data.lng ?? data.longitude,
            address: data.address ?? data.name ?? "",
            status: data.status ??
                (data.hasCandy
                    ? "Handing out candy"
                    : "Out of candy"),
            comments: data.comments ?? ""
        };
    }).filter(house =>
        typeof house.lat === "number" &&
        typeof house.lng === "number"
    );
}

// Save a new house or update an existing house
export async function saveHouse(house) {
    const data = {
        lat: house.lat,
        lng: house.lng,
        address: house.address,
        status: house.status,
        comments: house.comments
    };

    if (house.id) {
        await updateDoc(doc(db, "houses", house.id), {
            ...data,
            updatedAt: serverTimestamp()
        });

        return house.id;
    }

    const document = await addDoc(collection(db, "houses"), {
        ...data,
        createdAt: serverTimestamp()
    });

    return document.id;
}

export async function deleteHouse(id) {
    await deleteDoc(doc(db, "houses", id));
}