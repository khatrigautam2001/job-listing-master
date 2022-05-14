const userDetails = document.querySelector(".userDetails");
const editProfile = document.querySelector("#editProfile");

async function createUserCollection(user) {
	try {
		const res = await firebase.firestore().collection("users").doc(user.uid).set({
			uid: user.uid,
			name: user.displayName,
			email: user.email,
			phoneno: "",
			preferredDomain: "",
			experience: "",
		});
	} catch (error) {
		log(error);
	}
}

async function createEmployeCollection(user) {
	await firebase.firestore().collection("employe").doc(user.uid).set({
		uid: user.uid,
		name: user.displayName,
		email: user.email,
		phoneno: "",
	});
}

async function getUserInfoRealtime(userID) {
	console.log("Get User Info Realtime");
	if (userID) {
		const userDocRef = await firebase.firestore().collection("users").doc(userID);
		console.log("Get user Info Realtime");
		console.log(userDocRef);
		userDocRef.onSnapshot((doc) => {
			if (doc.exists) {
				const userInfo = doc.data();
				if (userInfo) {
					console.log("userInfo");
					console.log(userInfo);
					editProfile["name"].value = userInfo.name;
					editProfile["profileEmail"].value = userInfo.email;
					editProfile["phoneno"].value = userInfo.phoneno;
					editProfile["preferredDomain"].value = userInfo.preferredDomain;
					editProfile["experience"].value = userInfo.experience;
					editProfile["portfolioUrl"].value = userInfo.portfolioUrl;
					editProfile["github"].value = userInfo.github;
					editProfile["linkedin"].value = userInfo.linkedin;
					document.getElementById("resumeLink").setAttribute("href", userInfo.resumeUrl);
					// console.log('users name is here:- ',userInfo.name)

					if (firebase.auth().currentUser.photoURL) {
						document.querySelector("#proimg").src = firebase.auth().currentUser.photoURL;
					} else {
						console.log("User Not Logged in....");
					}
				}
			}
		});
	} else {
		userDetails.innerHTML = `
        <h3>Please Login First</h3>
        `;
	}
}

async function getEmployeInfoRealtime(userID) {
	if (userID) {
		const userDocRef = await firebase.firestore().collection("employe").doc(userID);
		console.log("Get Employe Info Realtime");
		console.log(userDocRef);
		userDocRef.onSnapshot((doc) => {
			if (doc.exists) {
				const userInfo = doc.data();
				console.log(userInfo);
				if (userInfo) {
					editProfile["name"].value = userInfo.name;
					editProfile["profileEmail"].value = userInfo.email;
					editProfile["phoneno"].value = userInfo.phoneno;
					if (firebase.auth().currentUser.photoURL) {
						document.querySelector("#proimg").src = firebase.auth().currentUser.photoURL;
					} else {
						console.log("User Not Logged in....");
					}
				}
			}
		});
	} else {
		userDetails.innerHTML = `
        <h3>Please Login First</h3>
        `;
	}
}

function updateEmployeProfile(e) {
	e.preventDefault();
	console.log("called here");
	const userDocRef = firebase
		.firestore()
		.collection("employe")
		.doc(firebase.auth().currentUser.uid);

	console.log("Name of Employee:- ", editProfile["name"].value);
	userDocRef.update({
		name: editProfile["name"].value,
		email: editProfile["profileEmail"].value,
		phoneno: editProfile["phoneno"].value,
	});

	// M.Modal.getInstance(myModal[2]).close();
}

function uploadImage(e) {
	console.log(e.target.files[0]);
	const uid = firebase.auth().currentUser.uid;
	const fileRef = firebase.storage().ref().child(`/users/${uid}/profile`);
	const uploadTask = fileRef.put(e.target.files[0]);

	uploadTask.on(
		"state_changed",
		(snapshot) => {
			// Observe state change events such as progress, pause, and resume
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			if (progress == "100") alert("Profile Picture Uploaded Successfully!!");
		},
		(error) => {
			console.log(error);
		},
		() => {
			// Handle successful uploads on complete
			// For instance, get the download URL: https://firebasestorage.googleapis.com/...
			uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
				console.log("File available at", downloadURL);
				document.querySelector("#proimg").src = downloadURL;
				firebase.auth().currentUser.updateProfile({
					photoURL: downloadURL,
				});
			});
		}
	);
}
function uploadProfileImage(e, userType, file = "image") {
	console.log(e.target.files[0]);
	const uid = firebase.auth().currentUser.uid;
	const fileRef = firebase.storage().ref().child(`/${userType}/${uid}/profile`);
	const uploadTask = fileRef.put(e.target.files[0]);

	uploadTask.on(
		"state_changed",
		(snapshot) => {
			// Observe state change events such as progress, pause, and resume
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			if (progress == "100") alert("Profile Picture Uploaded Successfully!!");
		},
		(error) => {
			console.log(error);
		},
		() => {
			// Handle successful uploads on complete
			// For instance, get the download URL: https://firebasestorage.googleapis.com/...
			if (file == "image") {
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					console.log("File available at", downloadURL);
					document.querySelector("#proimg").src = downloadURL;
					firebase.auth().currentUser.updateProfile({
						photoURL: downloadURL,
					});
				});
			} else {
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					const userDocRef = firebase
						.firestore()
						.collection("users")
						.doc(firebase.auth().currentUser.uid);
					userDocRef.update({
						resumeUrl: downloadURL,
					});
				});
			}
		}
	);
}

function uploadEmployeProfileImage(e) {
	console.log(e.target.files[0]);
	const uid = firebase.auth().currentUser.uid;
	const fileRef = firebase.storage().ref().child(`/employe/${uid}/profile`);
	const uploadTask = fileRef.put(e.target.files[0]);

	uploadTask.on(
		"state_changed",
		(snapshot) => {
			// Observe state change events such as progress, pause, and resume
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			if (progress == "100") alert("Profile Picture Uploaded Successfully!!");
		},
		(error) => {
			console.log(error);
		},
		() => {
			// Handle successful uploads on complete
			// For instance, get the download URL: https://firebasestorage.googleapis.com/...
			uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
				console.log("File available at", downloadURL);
				document.querySelector("#proimg").src = downloadURL;
				firebase.auth().currentUser.updateProfile({
					photoURL: downloadURL,
				});
			});
		}
	);
}

async function allUserDetails() {
	// document.getElementById('table').style.display="table"
	const userRef = await firebase.firestore().collection("users").get();

	// userRef.docs.forEach(doc => {
	//     const info = doc.data()
	//     console.log(info)
	//     document.getElementById('tbody').innerHTML +=  `
	//     <tr>
	//         <td>${info.name}</td>
	//         <td>${info.email}</td>
	//         <td>${info.phoneno}</td>
	//         <td>${info.preferredDomain}</td>
	//         <td>${info.experience}</td>

	//     </tr>
	//     `
	// })
	userRef.docs.map((doc, index) => {
		const info = doc.data();
		console.log(info);
		document.getElementById("tbody").innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${info.name}</td>
                <td>${info.email}</td>
                <td>${info.phoneno}</td>
                <td>${info.preferredDomain}</td>
                <td>${info.experience}</td>
				${info.resumeUrl ? `<td><a href="${info.resumeUrl}" target="_blank">View Resume</a></td>` : `<td> Not Uploaded</td>`}
                <td><button onclick="handleSendEmail('${info.name}', '${info.email}')" type="button">Send email</button></td>                
            </tr>
            `;
			// <td><a href='${info.resumeUrl}'>Open Resume</a> </td>
			// href="mailto:${info.email}?subject=MailfromJobPortal&body=Body-goes-here"
	});
}

// <td><a href ='${info.portfolioUrl}'>View</a></td>
