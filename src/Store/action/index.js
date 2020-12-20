import firebase from '../../Config/firebase'
const set_user = (name,email,photoURL,uid)=>{
    return (dispatch) =>{
        dispatch({
            type:"SetUser",
            currentUsername:name,
            currentUseremail:email,
            photoURL:photoURL,
            uid:uid,
            hasUser:true
        })
    }
}

const signout = ()=>{
    return (dispatch) =>{
        dispatch({
            type:"SignOut",
            currentUsername:null,
            currentUseremail:null,
            photoURL:null,
            uid:null,
            hasUser:false
        })
    }
}

const get_users = () =>{
    return(dispatch)=>{
        let users = []
        firebase.database().ref('/').child('users').on('child_added',(data)=>{
            users.push(data.val())
            dispatch({
                type:"SetMembers",
                users:users
            })
        })
    }
}

const chat_with = (selectedusername,selecteduseremail,selecteduserphotourl,selecteduseruid)=>{
    return(dispatch)=>{
        dispatch({
            type:"ChatWith",
            selectedusername:selectedusername,
            selecteduseremail:selecteduseremail,
            selecteduserphotourl:selecteduserphotourl,
            selecteduseruid:selecteduseruid
        })
    }
}

export {
    set_user,
    signout,
    get_users,
    chat_with
}