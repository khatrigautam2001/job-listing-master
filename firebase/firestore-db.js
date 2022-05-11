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
        preferredDomain:"",
        experience:""
    })
}


function createEmployeCollection(user){
    firebase.firestore().collection("employe")
    .doc(user.uid)
    .set({
        uid:user.uid,
        name:user.displayName,
        email:user.email,
        phoneno:""
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
            console.log("Get user Info Realtime")
            console.log(userDocRef)
            userDocRef.onSnapshot((doc) => {
                if(doc.exists){
                    const userInfo = doc.data();
                    if(userInfo){
                        editProfile["name"].value = userInfo.name
                        editProfile["profileEmail"].value = userInfo.email
                        editProfile["phoneno"].value = userInfo.phoneno
                        // editProfile["speciality"].value = userInfo.speciality
                        // editProfile["portfolioUrl"].value = userInfo.portfolioUrl
                        // editProfile["experience"].value = userInfo.experience

                        // console.log('users name is here:- ',userInfo.name)

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


async function getEmployeInfoRealtime(userID){
    if(userID){
        const userDocRef = await firebase.firestore()
            .collection('employe')
            .doc(userID)
            console.log("Get Employe Info Realtime")
            console.log(userDocRef)
            userDocRef.onSnapshot((doc) => {
                if(doc.exists){
                    const userInfo = doc.data();
                    if(userInfo){
                        editProfile["name"].value = userInfo.name
                        editProfile["profileEmail"].value = userInfo.email
                        editProfile["phoneno"].value = userInfo.phoneno
                        // editProfile["speciality"].value = userInfo.speciality
                        // editProfile["portfolioUrl"].value = userInfo.portfolioUrl
                        // editProfile["experience"].value = userInfo.experience

                        // console.log('users name is here:- ',userInfo.name)

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

    console.log(editProfile["name"].value);
    userDocRef.update({
        name:editProfile["name"].value,
        email:editProfile["profileEmail"].value,
        phoneno:editProfile["phoneno"].value,
        preferredDomain:editProfile["preferredDomain"].value,
        // portfolioUrl:editProfile["experience"].value,
        experience:editProfile["experience"].value
    })

    // M.Modal.getInstance(myModal[2]).close();    
}


function updateEmployeProfile(e){
    e.preventDefault()
    const userDocRef = firebase.firestore()
    .collection('employe')
    .doc(firebase.auth().currentUser.uid) 

    console.log('Name of Employee:- ',editProfile["name"].value);
    userDocRef.update({
        name:editProfile["name"].value,
        email:editProfile["profileEmail"].value,
        phoneno:editProfile["phoneno"].value,
    })

    // M.Modal.getInstance(myModal[2]).close();    
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


function uploadProfileImage(e){
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


function uploadEmployeProfileImage(e){
    console.log(e.target.files[0])
    const uid = firebase.auth().currentUser.uid
    const fileRef = firebase.storage().ref().child(`/employe/${uid}/profile`)
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
    // document.getElementById('table').style.display="table"
    const userRef = await firebase.firestore().collection('users').get()
    
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
        userRef.docs.map((doc, index)=>{
            const info = doc.data()
            console.log(info)
            document.getElementById('tbody').innerHTML +=  `
            <tr>
                <td>${index+1}</td>
                <td>${info.name}</td>
                <td>${info.email}</td>
                <td>${info.phoneno}</td>
                <td>${info.preferredDomain}</td>
                <td>${info.experience}</td>
                
            </tr>
            `
        })
}


// <td><a href ='${info.portfolioUrl}'>View</a></td>