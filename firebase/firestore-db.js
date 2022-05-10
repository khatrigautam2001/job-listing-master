const userDetails = document.querySelector('.userDetails');
const editProfile = document.querySelector('#editProfile');  

function createUserCollection(user){
    firebase.firestore().collection("users")
    .doc(user.uid)
    .set({
        uid:user.uid,
        name:user.displayName,
        email:user.email,
        phoneno:"",
        speciality:"",
        portfolioUrl:"",
        experience:""
    })
}


async function getUserInfo(userID){
    if(userID){
        const userInfoSnap = await firebase.firestore()
        .collection('users')
        .doc(userID)
        .get()

        const userInfo = userInfoSnap.data();

        if(userInfo){
            userDetails.innerHTML = `
            <h3>${userInfo.name}</h3>
            <h3>${userInfo.email}</h3>
            <h3>${userInfo.phone}</h3>
            `
        }
    }
    
    else{
        userDetails.innerHTML = `
        <h3>Please Login First</h3>
        `
    }
}



async function getUserInfoRealtime(userID){
    if(userID){
        const userDocRef = await firebase.firestore()
            .collection('users')
            .doc(userID)
            userDocRef.onSnapshot((doc) => {
                if(doc.exists){
                    const userInfo = doc.data();
                    if(userInfo){
                        userDetails.innerHTML = `
                        <ul class="collection" >
                            <li class="collection-item"><h5><b>Name:- </b>${userInfo.name}</h5></li>
                            <li class="collection-item"><b>Email:- </b>${userInfo.email}</li>
                            <li class="collection-item"><b>Phone:- </b>${userInfo.phoneno}</li>
                            <li class="collection-item"><b>Speciality:- </b>${userInfo.speciality}</li>
                            <li class="collection-item"><b>Experience:- </b>${userInfo.experience}</li>
                            <li class="collection-item"><b>Portfolio URL:- </b><a href="${userInfo.portfolioUrl} ">Portfolio Link</a></li>                            
                        </ul>
                        
                        <button class="btn waves-effect modal-trigger" href="#modal3">Edit Details</button>
                        `

                        editProfile["name"].value = userInfo.name
                        editProfile["profileEmail"].value = userInfo.email
                        editProfile["phoneno"].value = userInfo.phoneno
                        editProfile["speciality"].value = userInfo.speciality
                        editProfile["portfolioUrl"].value = userInfo.portfolioUrl
                        editProfile["experience"].value = userInfo.experience

                        if(firebase.auth().currentUser.photoURL){
                            document.querySelector("#proimg").src = firebase.auth().currentUser.photoURL
                        }           
                        else{
                            console.log("User Not Logged in....")
                        }             
                    }
                }
            })        
    }
    else{
        userDetails.innerHTML = `
        <h3>Please Login First</h3>
        `
    }
}



function updateUserProfile(e){
    e.preventDefault()
    const userDocRef = firebase.firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid) 

    userDocRef.update({
        name:editProfile["name"].value,
        email:editProfile["profileEmail"].value,
        phoneno:editProfile["phoneno"].value,
        speciality:editProfile["speciality"].value,
        portfolioUrl:editProfile["portfolioUrl"].value,
        experience:editProfile["experience"].value
    })

    M.Modal.getInstance(myModal[2]).close();    
}



function uploadImage(e){
    console.log(e.target.files[0])
    const uid = firebase.auth().currentUser.uid
    const fileRef = firebase.storage().ref().child(`/users/${uid}/profile`)
    const uploadTask =  fileRef.put(e.target.files[0])

    uploadTask.on('state_changed', 
    (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if(progress == '100') alert("Profile Picture Uploaded Successfully!!")
    }, 
    (error) => {
        console.log(error)
    }, 
    () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            document.querySelector("#proimg").src = downloadURL
            firebase.auth().currentUser.updateProfile({
                photoURL:downloadURL
            })
        });
    }
    );
}



async function allUserDetails(){
    document.getElementById('table').style.display="table"
    const userRef = await firebase.firestore().collection('users').get()
    
        userRef.docs.forEach(doc => {
            const info = doc.data()
            console.log(info)
            document.getElementById('tbody').innerHTML +=  `
            <tr>
                <td>${info.name}</td>
                <td>${info.email}</td>
                <td>${info.phoneno}</td>
                <td>${info.speciality}</td>
                <td>${info.experience}</td>
                <td><a href ='${info.portfolioUrl}'>View</a></td>
            </tr>
            `
        })
}