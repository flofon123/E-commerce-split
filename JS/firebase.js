import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, deleteDoc  } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyCSqjnTDZoNWJvQvAZmHLve_a_wpQlngls",
  authDomain: "split-web.firebaseapp.com",
  projectId: "split-web",
  storageBucket: "split-web.appspot.com",
  messagingSenderId: "26268874960",
  appId: "1:26268874960:web:06c869c3dd099f131e06d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initial firestore
const db = getFirestore(app);


export const getProducts = async () => { 

  const querySnapshot = await getDocs(collection(db, "products"));

  const products = []

querySnapshot.forEach((doc) => {

  products.push(doc);

});
 
return products;

}

export const getProduct = async (id) => {

  const docRef = doc(db, "products", id);

  const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  
  return docSnap;

} else {
 
  console.log("No such document!");
}

}

