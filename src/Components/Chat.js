import React from 'react'
import '../Css/footer.css'
import '../Css/form.css'
import '../Css/nav.css'
import '../Css/style2.css'
import arrow from '../Images/arrow.png'
import video from '../Images/video.png'
import audio from '../Images/phone.png'
import more from '../Images/more.png'
import emo from '../Images/emo.png'
import file from '../Images/attachfile.png'
import camera from '../Images/camera.png'
import mic from '../Images/mic.png'
import { connect } from 'react-redux'
import {set_user , signout} from '../Store/action'
import firebase from '../Config/firebase'
import { Redirect } from 'react-router-dom'

class Chat extends React.Component{
    constructor(){
        super()
        this.state={
            message:'',
            messages:[]

        }
    }
    uid_merge(uid1,uid2){
        if(uid1<uid2){
            return uid1 + uid2
        }else{
            return uid2 + uid1
        }
    }
    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    };
    back=()=>{
        this.props.history.push('/')
    }
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
    componentDidMount(){
        let merge_uid = this.uid_merge(this.props.currentuseruid,this.props.selecteduseruid)   
        console.log(merge_uid)
        const mesgRef = firebase.database().ref('/').child("messages/"+merge_uid);
        mesgRef.on('child_added', (messages) => {
            console.log(messages.val())
            this.state.messages.push(messages.val())

            this.setState({
                messages:this.state.messages
            })
                  
        })
    }
    sendMessage=()=>{
        let obj = {
            recievername: this.props.selectedusername,
            recieveremail:this.props.selecteduseremail,
            message:this.state.message,
            sendername:this.props.currentUsername,
            senderemail:this.props.currentUseremail
        } 
        this.setState({
            messages:[...this.state.messages,obj],
            message:''
        })     
        let merge_uid = this.uid_merge(this.props.currentuseruid,this.props.selecteduseruid)   
        firebase.database().ref('/').child('messages/'+merge_uid).push(obj)
        
    }
    render(){
        const selectedusername = this.props.selectedusername;
        if(selectedusername === null ||selectedusername === 'null'){
          return <Redirect to="/" />

        }else{
        return(
            
        <div className="containers" id="chat">
            <div className="chat">
                <div className="chat-header">
                    <div className="profile">
                        <div className="left">
                            <img src={arrow} alt="img" className="arrow mt-1 mr-5" onClick={this.back}/>&nbsp;
                            <img src={this.props.selecteduserphotourl} alt="img" className="pp mb-2"/>
                            <span className="margin-user">
                                <h2 id="selectedUser">
                                    {this.props.selectedusername}
                                </h2>
                            </span>
                            <span className="remove-user">
                                <h5 id="selectedUser_email" style={{marginLeft: "1px"}}>
                                    {this.props.selecteduseremail}
                                </h5>
                            </span>


                        </div>
                        
                        <div className="right">
                            <img src={video} alt="img" className="icon"/>
                            <img src={audio} alt="img" className="icon"/>
                            <img src={more} alt="img" className="dropdown-toggle icon" data-toggle="dropdown" aria-expanded="false"/>
                            <div className="dropdown-menu" role="menu">
                                <button onClick={this.signout} className="dropdown-item btn btn-light action-button">Sign Out</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="chat-box" id="chat-box">
                {this.state.messages.map((v,i) => {
                        if(v.senderemail === this.props.currentUseremail && v.recieveremail === this.props.selecteduseremail){
                            return <div key={i}>
                                <div className="chat-r">
                                <div className="sp"></div>
                                    <div className="mess mess-r">
                                        <ul id="sender_messages">{v.message}</ul>
                                        <div className="check">
                                            <span>4:00 PM</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        else{
                            return <div key={i}>
                                <div className="chat-l">
                                    <div className="mess  mess-l">
                                        <div className="sp"></div>
                                        <ul id="reciever-messages">{v.message}</ul>
                                        <div className="check">
                                            <span>4:00 PM</span>
                                        </div>
                                    </div>
                                    <div className="sp"></div>
                                </div> 

                            </div>
                        }
                        
                        
                               
                    })} 
                </div>

                <div className="chat-footer">
                    <img src={emo} alt="img" className="emo"/>
                    <textarea id="message" alt="img" name="message" onChange={this.handleChange} value={this.state.message} placeholder="Type a message" style={{fontSize: "small"}}></textarea>
                    <div className="icons">
                        <img src={file} alt="img"/>
                        <img src={camera} alt="img"/>
                    </div>
                    <img src={mic} alt="img" className="mic" onClick={this.sendMessage}/>
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
    currentUseremail:state.currentUseremail,
    currentuseruid:state.uid,
    selectedusername:state.selectedusername,
    selecteduseremail:state.selecteduseremail,
    selecteduserphotourl:state.selecteduserphotourl,
    selecteduseruid:state.selecteduseruid

})

const mapDispatchToProps = (dispatch) => ({
    set_user:(name,email,photoURL,uid)=> dispatch(set_user(name,email,photoURL,uid)),
    signout:(i)=> dispatch(signout(null))

})


export default connect(mapStateToProps,mapDispatchToProps)(Chat);