window.onload = () => {
	console.log("window onload called");
	unsubscribe();
	// getUserInfoRealtime(user.uid);
};
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		console.log("employe logged in");
		getEmployeInfoRealtime(user.uid);
		allUserDetails();
	}
});

const handleSaveProfile = async () => {
	console.log("I'm saved.....");
	const editables = document.querySelectorAll(".editableDetail");
	editables.forEach((element) => {
		element.setAttribute("disabled", "");
	});

	try {
		const userDocRef = await firebase
			.firestore()
			.collection("employe")
			.doc(firebase.auth().currentUser.uid);

		console.log(editProfile["name"].value);
		await userDocRef.update({
			name: editProfile["name"].value,
			email: editProfile["profileEmail"].value,
			phoneno: editProfile["phoneno"].value,
		});
	} catch (error) {
		console.log(error);
	}
	document.getElementById("editProfileBtn").classList.remove("d-none");
	document.getElementById("saveProfile").classList.add("d-none");
};
