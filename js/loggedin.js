window.onload = () => {
	unsubscribe();
};
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		console.log("user logged in");
		getUserInfoRealtime(user.uid);
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
			.collection("users")
			.doc(firebase.auth().currentUser.uid);

		console.log(editProfile["name"].value);
		await userDocRef.update({
			name: editProfile["name"].value,
			email: editProfile["profileEmail"].value,
			phoneno: editProfile["phoneno"].value,
			preferredDomain: editProfile["preferredDomain"].value,
			experience: editProfile["experience"].value,
			portfolioUrl: editProfile["portfolioUrl"].value,
			github: editProfile["github"].value,
			linedin: editProfile["linkedin"].value,
		});
	} catch (error) {
		console.log(error);
	}
	document.getElementById("editProfileBtn").classList.remove("d-none");
	document.getElementById("saveProfile").classList.add("d-none");
	document.getElementById("resumeUpload").classList.add("d-none");
	document.getElementById("resumeLink").classList.remove("d-none");
};
