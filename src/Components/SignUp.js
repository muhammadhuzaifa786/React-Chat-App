import React from 'react'
import '../Css/form.css'
import '../Css/style2.css'
import firebase from '../Config/firebase'

class SignUp extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            email:'',
            password:'',
            image:[],
            profilepic:'https://firebasestorage.googleapis.com/v0/b/reactchatapps.appspot.com/o/Images%2Fuser.png?alt=media&token=e21697ec-c9c5-4391-bb2e-7955604506cd'
        }
    }
    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    };
    signUp=()=>{
        let email = this.state.email;
        let password = this.state.password
        let username = this.state.username
        let photoURLs = 'https://firebasestorage.googleapis.com/v0/b/reactchatapps.appspot.com/o/Images%2Fuser.png?alt=media&token=e21697ec-c9c5-4391-bb2e-7955604506cd'
        console.log(username,email,password)
        alert("Please Wait ....")
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(result=>{

            var user = result.user;
            // ...
            console.log("USER ==>  ", user)
            console.log(user.email)
            console.log(username)

            var users = {
                name: username,
                email: user.email,
                photoURL: photoURLs,
                uid:user.uid,
                password: password
            }

            var flag = false;
            firebase.database().ref('users').on("value", function(snapshot) {
                //var data = snapshot.val();

                snapshot.forEach(function(data) {
                    var userdata = data.val();
    
                    if (userdata.email === users.email) {
                        flag = true
                    }
                });
    
                if (flag === false) {
                    firebase.database().ref('/').child('users/'+user.uid).set({
                        displayName: users.name,
                        email: user.email,
                        photoURL:'https://firebasestorage.googleapis.com/v0/b/reactchatapps.appspot.com/o/Images%2Fuser.png?alt=media&token=e21697ec-c9c5-4391-bb2e-7955604506cd',
                        uid:user.uid,
                        password: users.password
                    })

    
                } else {
                }
                alert("SignUp Success")
    
            })  
            const { history } = this.props;
            history.push("/signin")

            

        })
        .catch(function(error) {
            // Handle Errors here.
            //var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ...
        });

    

    }
    
    render(){
        return(
            <>
            <div id="signup_container">
        <div className="login-dark">
            <div className="signup">
                <h2 className="sr-only">Login Form</h2>
                <div className="illustration"><i className="icon ion-ios-locked-outline" style={{color: "rgb(43,201,146)"}}></i></div>
                <div className="form-group">
                    <input className="form-control" type="text" name="username" onChange={this.handleChange} id="name" style={{marginBottom: "12px"}} placeholder="Name" required/>
                    <input className="form-control" type="email" name="email" onChange={this.handleChange} id="emailaddress" placeholder="Email" required/></div>
                <div className="form-group">
                    <input className="form-control" name="password" onChange={this.handleChange} id="pass" type="password" placeholder="Password" required=""/>
                </div>
                <div className="form-group"></div><button className="btn btn-primary btn-block" onClick={this.signUp} style={{backgroundColor: "rgb(44,204,147);"}}>Sign Up</button>
                {/* <div className="text-center mb-3"><i>or</i></div>
                <p className="text-center">Login with your social media account</p>
                <div className="row text-center social-btn">
                    <div className="col-md-6">
                        <button className="btn btn-secondary" onlick="fblogin()"><i className="fab fa-facebook-f"></i>&nbsp; Facebook</button>

                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-danger" onclick="googlelogin()"><i className="fab fa-google"></i>&nbsp; Google</button>

                    </div>
                </div> */}
            </div>
        </div>
    </div>
            </>
        )
    }
}

export default SignUp