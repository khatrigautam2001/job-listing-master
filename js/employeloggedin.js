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

function handleSendEmail(name, email) {

	console.log("email clicked");
	var formattedBody = `Hi ${name},
	I came across your profile on JobPortal and wanted to reach out regarding a unique opportunity.		
I Work for [Company Name], and we are looking to hire a [Job Title]. I think your experience in [Field/Skill] is a great fit for this role.		
If you're interested in learning more, I'd love to connect. Would you be available for a quick phone call on [Date/Time]?		
I hope you have a great day.		
		
Thanks and Regards,		
[Your name]`;
var mailToLink = `mailto:${email}?subject=MailfromJobPortal&body=` + encodeURIComponent(formattedBody);
window.location.href = mailToLink;
}