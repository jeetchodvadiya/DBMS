// Firebase Config (replace with your project config)
const firebaseConfig = {
  apiKey: "AIzaSyDtr9vyzkS9uuWP2sDUtkFs20lfmnvUcO8",
  authDomain: "dbms-10414.firebaseapp.com",
  projectId: "dbms-10414",
  storageBucket: "dbms-10414.firebasestorage.app",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

// Tab switching
function showTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// Student Form
document.getElementById("studentForm").addEventListener("submit", async (e)=>{
  e.preventDefault();
  const data = {
    std: document.getElementById("std").value,
    group: document.getElementById("group").value,
    rollNo: document.getElementById("rollNo").value,
    grNo: document.getElementById("grNo").value,
    gender: document.getElementById("gender").value,
    fullName: document.getElementById("fullName").value,
    c1: document.getElementById("c1").value,
    c2: document.getElementById("c2").value,
    percent: document.getElementById("percent").value
  };
  await db.collection("students").add(data);
  alert("Student added!");
});

// Folder creation
document.getElementById("folderForm").addEventListener("submit", async (e)=>{
  e.preventDefault();
  const fname=document.getElementById("folderName").value;
  await db.collection("folders").doc(fname).set({created:new Date()});
  alert("Folder created!");
});

// Change Passwords
async function changePass(role){
  let newPass=role==="admin"?document.getElementById("newAdminPass").value:document.getElementById("newStudentPass").value;
  if(!newPass) return alert("Enter password");
  await db.collection("users").doc(role).set({password:newPass});
  alert(role+" password updated!");
}
