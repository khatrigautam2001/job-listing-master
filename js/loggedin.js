window.onload = () => {
    unsubscribe()
    // getUserInfoRealtime(user.uid);
  
}
const editMyProfile=()=>{
  console.log("edit profile");
  const editables = document.querySelectorAll('.editableDetail');
  editables.forEach(element => {
    element.removeAttribute('disabled')
  })
  document.getElementById('editProfileBtn').classList.add('d-none')
  document.getElementById('saveProfile').classList.remove('d-none')
}

const saveProfile = ()=>{
    console.log("I'm saved.....")
  const editables = document.querySelectorAll('.editableDetail');
  editables.forEach(element => {
    element.setAttribute('disabled', '')
  })
  document.getElementById('editProfileBtn').classList.remove('d-none')
  document.getElementById('saveProfile').classList.add('d-none')
}
//   document.querySelector('.resumeFieldToggle').style.visibility = 'visible'
// To hide a button
//   var div = document.getElementById('resumeToggle');
//     if (div.style.visibility != 'hidden') {
//         div.style.visibility = 'hidden';
//     }
//     else {
//         div.style.visibility = 'visible';
//     }






