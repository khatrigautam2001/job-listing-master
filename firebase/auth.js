const myModal = document.querySelectorAll('.modal');

async function signup(e){
    e.preventDefault();
    const email = document.querySelector("#signupEmail");
    const password = document.querySelector("#signupPassword");
    const username = document.querySelector("#signupusername");

    try{
        const result = await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
        await result.user.updateProfile({
            displayName:username.value
        })
        console.log(username.value)
        createUserCollection(result.user);
        //await result.user.sendEmailVerification();
        // M.toast({html:`Welcome ${result.user.email}`, classes:"green"});
        console.log(result);
    }
    catch(err){
        console.log(err);
        // M.toast({html: err.message, classes:"red"});
    }

    email.value = "";
    password.value = "";

    // M.Modal.getInstance(myModal[1]).close();
    // console.log(email.value, password.value);
}

async function login(e){
    e.preventDefault();
    const email = document.querySelector("#loginEmail");
    const password = document.querySelector("#loginPassword");

    try{
        const result = await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
        // M.toast({html:`Welcome ${result.user.email}`, classes:"green"});
        console.log(result);
    }
    catch(err){
        console.log(err);
        // M.toast({html: err.message, classes:"red"});
    }


    email.value = "";
    password.value = "";
 
    // M.Modal.getInstance(myModal[0]).close();
    // console.log(email.value, password.value);
}


function logout(){
    firebase.auth().signOut();
    // document.querySelector("#proimg").src = "./assets/no-image-icon-15.png"
}


const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    console.log("here");
    if (user) {
      console.log(user);
    //   getUserInfo(user.uid);
    document.getElementById('loginBtnModal').style.display = "none"
    document.getElementById('signupBtnModal').style.display = "none"
    document.getElementById('logoutBtnModal').style.display = "block" 
      
    getUserInfoRealtime(user.uid);
    if(user.uid == 'C22V5wAus6b77BFvG0qb4XCwAB93'){
        allUserDetails()
    }
    } else {
    //   getUserInfo(null)
    getUserInfoRealtime(null);
      console.log("Signout Successfully!!");
      document.getElementById('table').style.display="none"
      document.getElementById('logoutBtnModal').style.display = "none" 
      document.getElementById('loginBtnModal').style.display = "block"
      document.getElementById('signupBtnModal').style.display = "block"
    unsubscribeUser()
    //   M.toast({html:"Signout Successfully!! ", classes:"green"});
    }
  });

//   Code Cleanup :- unsubscribe()


async function loginWithGoogle(){
    try{
        var provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth()
        .signInWithPopup(provider)
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}