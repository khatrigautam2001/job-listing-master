const myModal = document.querySelectorAll(".modal");

async function signup(e) {
	e.preventDefault();
	const email = document.querySelector("#signupEmail");
	const password = document.querySelector("#signupPassword");
	const username = document.querySelector("#signupusername");

	try {
		const result = await firebase
			.auth()
			.createUserWithEmailAndPassword(email.value, password.value);
		await result.user.updateProfile({
			displayName: username.value,
		});
		console.log(username.value);
		await createUserCollection(result.user);
		//await result.user.sendEmailVerification();
		// M.toast({html:`Welcome ${result.user.email}`, classes:"green"});
		console.log(result);
		document.querySelector("#modal1 button.close").click();
		email.value = "";
		password.value = "";
		window.location.href = "loggedin.html";
	} catch (err) {
		console.log(err);
		// M.toast({html: err.message, classes:"red"});
	}

	// M.Modal.getInstance(myModal[1]).close();
	// console.log(email.value, password.value);
}
const editMyProfile = () => {
	console.log("edit profile");
	const editables = document.querySelectorAll(".editableDetail");
	editables.forEach((element) => {
		element.removeAttribute("disabled");
	});
	document.getElementById("editProfileBtn").classList.add("d-none");
	document.getElementById("saveProfile").classList.remove("d-none");
	try {
		document.getElementById("resumeUpload").classList.remove("d-none");
		document.getElementById("resumeLink").classList.add("d-none");
	} catch (err) {
		// work only for users
	}
};

async function login(e) {
	e.preventDefault();
	const email = document.querySelector("#loginEmail");
	const password = document.querySelector("#loginPassword");

	try {
		const result = await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
		// M.toast({html:`Welcome ${result.user.email}`, classes:"green"});
		console.log(result);
		document.querySelector("#modal2 button.close").click();
	} catch (err) {
		console.log(err);
		// M.toast({html: err.message, classes:"red"});
	}

	email.value = "";
	password.value = "";

	window.location.href = "loggedin.html";
	// M.Modal.getInstance(myModal[0]).close();
	// console.log(email.value, password.value);
}

// Employer Login / Signup
async function employeSignup(e) {
	e.preventDefault();
	const email = document.querySelector("#signupEmployeEmail");
	const password = document.querySelector("#signupEmployePassword");
	const username = document.querySelector("#signupEmployeusername");

	try {
		const result = await firebase
			.auth()
			.createUserWithEmailAndPassword(email.value, password.value);
		await result.user.updateProfile({
			displayName: username.value,
		});
		console.log("email:- ", email.value, " username ", username.value);
		console.log("Employee Signup username:- ", username.value);
		await createEmployeCollection(result.user);
		//await result.user.sendEmailVerification();
		// M.toast({html:`Welcome ${result.user.email}`, classes:"green"});
		console.log(result);
		document.querySelector("#modal1 button.close").click();
		email.value = "";
		password.value = "";

		window.location.href = "employeLoggedin.html";
	} catch (err) {
		console.log(err);
		// M.toast({html: err.message, classes:"red"});
	}

	// M.Modal.getInstance(myModal[1]).close();
	// console.log(email.value, password.value);
}

async function employerLogin(e) {
	e.preventDefault();
	const email = document.querySelector("#loginEmployeEmail");
	const password = document.querySelector("#loginEmployePassword");

	try {
		const result = await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
		// M.toast({html:`Welcome ${result.user.email}`, classes:"green"});
		console.log(result);
		document.querySelector("#modal2 button.close").click();
		window.location.href = "employeLoggedin.html";
	} catch (err) {
		console.log(err);
		// M.toast({html: err.message, classes:"red"});
	}

	email.value = "";
	password.value = "";

	// M.Modal.getInstance(myModal[0]).close();
	// console.log(email.value, password.value);
}

function logout() {
	firebase.auth().signOut();
	window.location.href = "index.html";
	// document.querySelector("#proimg").src = "./assets/no-image-icon-15.png"
}

const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		document.getElementById("loginBtnModal").classList.add("d-none");
		document.getElementById("signupBtnModal").classList.add("d-none");
		document.getElementById("logoutBtnModal").classList.remove("d-none");
	} else {
		console.log("Signout Successfully!!");
		//   document.getElementById('table').style.display="none"
		document.getElementById("logoutBtnModal").classList.add("d-none");
		document.getElementById("loginBtnModal").classList.remove("d-none");
		document.getElementById("signupBtnModal").classList.remove("d-none");
		// unsubscribeUser()
	}
});

//   Code Cleanup :- unsubscribe()

async function loginWithGoogle() {
	try {
		var provider = new firebase.auth.GoogleAuthProvider();
		const result = await firebase.auth().signInWithPopup(provider);
		console.log(result);
	} catch (err) {
		console.log(err);
	}
}
