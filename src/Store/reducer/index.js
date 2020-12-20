const INITIAL_SATE = {
    hasUser:false,
    currentUsername:null,
    currentUseremail:null,
    selectedusername:null,
    selecteduseremail:null,
    selecteduserphotourl:null,
    selecteduseruid:null,
    photoURL:null,
    uid:null,
    users:[]
    
}

export default (state = INITIAL_SATE,action)=>{
    switch(action.type){
        case "SetUser":
            return({
                ...state,
                currentUsername:action.currentUsername,
                currentUseremail:action.currentUseremail,
                photoURL:action.photoURL,
                uid:action.uid,
                hasUser:action.hasUser
            })
        case "SignOut":
            return({
                    ...state,
                    currentUsername:action.currentUsername,
                    currentUseremail:action.currentUseremail,
                    photoURL:action.photoURL,
                    uid:action.uid,
                    hasUser:action.hasUser
            })
        case "SetMembers":
            return({
                ...state,
                users:action.users
            })
        case "ChatWith":
            return({
                ...state,
                selectedusername:action.selectedusername,
                selecteduseremail:action.selecteduseremail,
                selecteduserphotourl:action.selecteduserphotourl,
                selecteduseruid:action.selecteduseruid
            })    
        default:
            return state;
    }
}
