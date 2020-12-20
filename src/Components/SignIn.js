import React from 'react'
import '../Css/form.css'
import '../Css/style2.css'
import firebase from '../Config/firebase'
import { connect } from 'react-redux'
import {set_user} from '../Store/action'

class SignIn extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            hasUser:false,
            user:null

        }
    }
    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    };
    login_user=()=>{
        var nulls = "null";
        localStorage.setItem("hireactchatemail", nulls);
        localStorage.setItem("hireactchatname", nulls);


        alert("Please Wait ....")
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((result) => {
            console.log("SignIn Success", result)
            let useremail = this.state.email;
            firebase.database().ref("users").on("child_added", function(snapshot) {

                if (snapshot.val().email === useremail) {
                    
                    var name = snapshot.val().displayName;
                    var photoURL = snapshot.val().photoURL;
                    var uid = snapshot.val().uid;
                    var email = snapshot.val().email;
                    console.log(name,email,uid,photoURL)
                    localStorage.setItem("hireactchatname", name)
                    localStorage.setItem("hireactchatphotoURL", photoURL)
                    localStorage.setItem("hireactchatuid", uid)
                    localStorage.setItem("hireactchatemail", email);

                    console.log(localStorage.getItem("hireactchatname"))

                }


            })
            let names = localStorage.getItem("hireactchatname");
            let emailss = localStorage.getItem("hireactchatemail")
            let photoURLs = localStorage.getItem("hireactchatphotoURL")
            let uids = localStorage.getItem("hireactchatuid")

            console.log(emailss)
            console.log(names)
            console.log(photoURLs)
            console.log(uids)
            
            this.props.set_user(names,emailss,photoURLs,uids)

            const { history } = this.props;
            history.push("/")



        })
        .catch(function(error) {
            // Handle Errors here.
            //var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
    }
    createAccount=()=>{
        this.props.history.push('/signup');
    }
    facebookLogin = () =>{
        const provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider).then(result=> {
            var user = result.user;
            // ...
            console.log("USER ==>  ", user)
            console.log(user.email)
            console.log(user.displayName)
            console.log(user.photoURL)

            this.props.set_user(user.displayName,user.email,user.photoURL,user.uid)
    
            var users = {
                name: user.displayName,
                email: user.email,
                photoURL:user.photoURL,
                uid:user.uid,
                password: "null"
            }

            
            var flag = false;
            firebase.database().ref('users').on("value", function(snapshot) {
                //var data = snapshot.val();

                snapshot.forEach(function(data) {
                    var user = data.val();
    
                    if (user.email === users.email) {
                        flag = true
                    }
                });
    
                if (flag === false) {
                    firebase.database().ref('/').child('users/'+user.uid).set({
                        displayName: user.displayName,
                        email: user.email,
                        photoURL:user.photoURL,
                        uid:user.uid,
                        password: "null"
                    })

                    localStorage.setItem("hireactchatname", user.displayName)
                    localStorage.setItem("hireactchatemail", user.email)
                    localStorage.setItem("hireactchatphotoURL", user.photoURL)
                    localStorage.setItem("hireactchatuid", user.uid)

                            
                    const { history } = this.props;
                    history.push("/")
    
                } else {
    
                    localStorage.setItem("hireactchatname", user.displayName)
                    localStorage.setItem("hireactchatemail", user.email)
                    localStorage.setItem("hireactchatphotoURL", user.photoURL)
                    localStorage.setItem("hireactchatuid", user.uid)

                            
                    const { history } = this.props;
                    history.push("/")
                }
    
            })  


            
        })
        .catch(function(error) {
            //var errorCode = error.code;
            var errorMessage = error.message;
            console.log("ERROR == > " + error);
            alert(errorMessage)
        });

    }


    googleLogin = ()=>{

        console.log(this.props)
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(result=> {
            var user = result.user;
            // ...
            console.log("USER ==>  ", user)
            console.log(user.email)
            console.log(user.displayName)
            console.log(user.photoURL)

            this.props.set_user(user.displayName,user.email,user.photoURL,user.uid)
    
            var users = {
                name: user.displayName,
                email: user.email,
                photoURL:user.photoURL,
                uid:user.uid,
                password: "null"
            }

            
            var flag = false;
            firebase.database().ref('users').on("value", function(snapshot) {
                //var data = snapshot.val();

                snapshot.forEach(function(data) {
                    var user = data.val();
    
                    if (user.email === users.email) {
                        flag = true
                    }
                });
    
                if (flag === false) {
                    firebase.database().ref('/').child('users/'+user.uid).set({
                        displayName: user.displayName,
                        email: user.email,
                        photoURL:user.photoURL,
                        uid:user.uid,
                        password: "null"
                    })

                    localStorage.setItem("hireactchatname", user.displayName)
                    localStorage.setItem("hireactchatemail", user.email)
                    localStorage.setItem("hireactchatphotoURL", user.photoURL)
                    localStorage.setItem("hireactchatuid", user.uid)

                            
                    const { history } = this.props;
                    history.push("/")
    
                } else {
    
                    localStorage.setItem("hireactchatname", user.displayName)
                    localStorage.setItem("hireactchatemail", user.email)
                    localStorage.setItem("hireactchatphotoURL", user.photoURL)
                    localStorage.setItem("hireactchatuid", user.uid)

                            
                    const { history } = this.props;
                    history.push("/")
                }
    
            })  


            
        })
        .catch(function(error) {
            //var errorCode = error.code;
            var errorMessage = error.message;
            console.log("ERROR == > " + error);
            alert(errorMessage)
        });

    }
    render(){
        return(
            
            <div id="login_container">
                <div className="login-dark" style={{}}>
                    <form style={{marginBottom: "0px",marginLeft: "0px"}}>
                        <h2 className="sr-only">Login Form</h2>
                        <div className="illustration"><i className="icon ion-ios-locked-outline" style={{color: "rgb(43,199,144)"}}></i></div>
                        <div className="form-group">
                            <input className="form-control" type="email" name="email" onChange={this.handleChange} id="email" placeholder="Email" required/></div>
                        <div className="form-group">
                            <input className="form-control" type="password" name="password" onChange={this.handleChange} id="password" placeholder="Password" required/>
                        </div>
                        <br/>
                        <button type="button" id="login" onClick={this.login_user} className="btnblue" value="Login">Login</button>
                        <button type="button" id="sign_up" onClick={this.createAccount} className="btngrey" value="Sign Up">Create New Account</button>
{/*                         
                        <div className="text-center mb-3"><i>or</i></div>
                        <p className="text-center">Login with your social media account</p>
                        <div className="row text-center social-btn">
                            <div className="col-md-6">
                                <button className="btn btn-secondary" onClick={this.facebookLogin}><i className="fab fa-facebook-f"></i>&nbsp; Facebook</button>

                            </div>
                            <div className="col-md-6">
                                <button className="btn btn-danger" onClick={this.googleLogin}><i className="fab fa-google"></i>&nbsp; Google</button>

                            </div>
                        </div> */}
                    </form>

                </div>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => ({
    name:state.name,
    hasUser:state.hasUser,
    currentUser:state.currentUser
})

const mapDispatchToProps = (dispatch) => ({
    set_user:(name,email,photoURL,uid)=> dispatch(set_user(name,email,photoURL,uid))
})


export default connect(mapStateToProps,mapDispatchToProps)(SignIn);