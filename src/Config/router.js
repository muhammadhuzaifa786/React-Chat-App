import React from 'react'
import Home from '../Components/Home.js'
import Chat from '../Components/Chat.js'
import SignIn from '../Components/SignIn.js'
import SignUp from '../Components/SignUp.js'
import { connect } from 'react-redux'
import {BrowserRouter as Router,Route} from "react-router-dom";

class AppRouter extends React.Component{
    componentDidMount(){
        
      }
    render(){
        return(
            <>
            <Router>
                <Route exact path='/' component={Home}></Route>
                {/* <Route exact path='/chat/:user' component={Chat}></Route> */}
                <Route exact path='/chat' component={Chat}></Route>

                <Route exact path='/signin' component={SignIn}></Route>
                <Route exact path='/signUp' component={SignUp}></Route>

            </Router>
            </>
        )
    }
}



const mapStateToProps = (state) => ({
    hasUser:state.hasUser,
    currentUser:state.currentUser
})
  
const mapDispatchToProps = (dispatch) => ({
})
  
  
export default connect(mapStateToProps,mapDispatchToProps)(AppRouter);