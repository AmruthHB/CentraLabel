import firebase from 'firebase'

//Sign existing user in
export const signIn = (email,password) => {
    
    firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
       alert('Sign in Successful!')
    }).catch(function(error) {
        alert(error.message)

    });
    
    
}

//register a brand new user

export const signUp = (email,password,role) => {
   
  //create user in firebase
  firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
     alert('Account Registered')
  }).catch(function(error) {
     alert(error.message)
  })


}