import React from 'react'
import '../Css/footer.css'
import '../Css/form.css'
import '../Css/nav.css'
import '../Css/style2.css'
import firebase from '../Config/firebase'
import more from '../Images/more.png'
import { connect } from 'react-redux'
import {set_user , signout , get_users , chat_with} from '../Store/action'
import { Redirect } from 'react-router-dom'

class Home extends React.Component{
    constructor(){
        super()
        this.state={
            users:[]

        }
    }
    componentDidMount() {

        this.props.get_users()
        

    }
    

    // static getDerivedStateFromProps(props){
    //     props.get_users()
    // }

    signout=()=>{

        firebase.auth().signOut().then(result=>{

            this.props.signout(null)


            localStorage.setItem("hireactchatname",null)
            localStorage.setItem("hireactchatemail",null)
            localStorage.setItem("hireactchatphotoURL",null)
            localStorage.setItem("hireactchatuid",null)

            
            const { history } = this.props;
            history.push("/signin")



        }).catch(function(error) {
            //var errorCode = error.code;
            var errorMessage = error.message;
            console.log("ERROR == > " + error);
            alert(errorMessage)
        });

    }
    chat = (displayName,email,photoURL,uid) =>{
        this.props.chat_with(displayName,email,photoURL,uid)
        
        const { history } = this.props;
        history.push("/chat")
    }
    render(){

        const name = localStorage.getItem("hireactchatname");
        const email = localStorage.getItem("hireactchatemail");
        const photoURL = localStorage.getItem("hireactchatphotoURL");
        const uid = localStorage.getItem("hireactchatuid");
        if(name === null || email === null || photoURL === null || uid === null ||name === 'null' || email === 'null' || photoURL === 'null' || uid === 'null'){
          console.log("No User IS Logged In")
          return <Redirect to="/signin" />

        }else{
          this.props.set_user(name,email,photoURL,uid)

          return(
            <div className="containers" id="users">
            <div className="chat">
                <div className="chat-header">
                    <div className="profile">
                        <div className="left">
                            <h2 id="signinname" style={{color: "rgb(255,255,255)", marginLeft: "auto", fontSize: "24px",fontWeight: "bolder"}}>
                                {this.props.currentUsername}
                            </h2>
                        </div>
                        <div className="right">

                            <i className="fas fa-search icon text-white mt-2"></i>

                            <img src={more} alt="img" className="dropdown-toggle icon mb-1" data-toggle="dropdown" aria-expanded="false"/>
                            <div className="dropdown-menu" role="menu">
                                <button onClick={this.signout} className="dropdown-item btn btn-light action-button">Sign Out</button>
                            </div>
                        </div>

                    </div>
                </div>
                
                <div className="chat-box">
                    

                    <div className="chat-l">
                        <div className="mess" id="userss">
                            {console.log(this.props.users)}
                            
                            {this.props.users.map((v,i)=>{
                                return v.uid !== this.props.currentuseruid && <ul key={i} onClick={()=>this.chat(v.displayName,v.email,v.photoURL,v.uid)}>
                                    <li style={{display:"inline"}}><img src={v.photoURL} alt="user pic" className="mr-3" width="50px" style={{marginTop:"-50px"}}/></li>
                                    <li style={{listStyleType: "none",display:"inline-block",fontSize:"24px",fontWeight:"bold"}}>{v.displayName}<br/>{v.email}</li>
                                    <hr/>
                                    <div className="sp"></div>
                                </ul>
                                                          
                            })}
                        
                        </div>
                    </div>


                </div>

            </div>
        </div>

        )
            
        }
        
    }
}


const mapStateToProps = (state) => ({
    name:state.name,
    hasUser:state.hasUser,
    currentUsername:state.currentUsername,
    currentuseruid:state.uid,
    users:state.users
})

const mapDispatchToProps = (dispatch) => ({
    set_user:(name,email,photoURL,uid)=> dispatch(set_user(name,email,photoURL,uid)),
    signout:(i)=> dispatch(signout(null)),
    get_users:()=> dispatch(get_users()),
    chat_with:(displayName,email,photoURL,uid)=> dispatch(chat_with(displayName,email,photoURL,uid))
})


export default connect(mapStateToProps,mapDispatchToProps)(Home);