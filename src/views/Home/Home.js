import React, { Component } from 'react'
import { reactBlack } from '../../designUtilities/colors';
import './Home.css';
import logo from '../../logo.svg'
import firebase from '../../cloud/firebase';

const {innerHeight} = window;

const inputFieldHeight = 30;
const inputFieldWidth= 150;

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',


            isShown: false
        }
    }

    handleEmailChange = (event) => {
        // this.state[`${key}`] = event.target.value;
        // this.setState({})
        this.setState({email: event.target.value});
      }

    handlePassChange = (event) => {
        this.setState({pass: event.target.value})
    }

    successfulLoginCallback = (user) => {
        
    }

    onSignInPress = () => {
        const {email, pass} = this.state;
        //TODO: activity indicator
        if (!email || !pass) {
            alert("You cannot Sign In if your email and/or password fields are blank.")
        }
        else if (!pass.length >= 6) {
            alert("Your password's length must be greater or equal to 6 characters.")
        }
        else {
//now that person has input text, their email and password are here
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(() => {
                //This function behaves as an authentication listener for user. 
                //If user signs in, we only use properties about the user to:
                //1. notifications update on cloud & local push notification scheduled notifications 4 days from now for each product that deserves a price reduction.
                firebase.auth().onAuthStateChanged( (user) => {
                    if(user) {
                        console.log(`User's Particular Identification: ${user.uid}`);
                        //could potentially navigate with user properties like uid, name, etc.
                        //TODO: once you sign out and nav back to this page, last entered
                        //password and email are still there

                        // this.saveEmailForFuture(email);

                        //TODO: remember me
                        // AsyncStorage.setItem('previousEmail', email);

                        this.successfulLoginCallback(user);
                        
                        // this.setState({loading: false, loggedIn: true})
                        
                    }
                })
                          //this.authChangeListener();
                          //cant do these things:
                          //firebase.database().ref('Users/7j2AnQgioWTXP7vhiJzjwXPOdLC3/').set({name: 'Imad Rajwani', attended: 1});
            })
            .catch( () => {
                let err = 'Authentication failed, please sign up or enter correct credentials.';
                this.setState( { loading: false } );
                alert(err);
            })

            //TODO:unmute
            // .catch( () => {
            //     //if user fails to sign in with email, try to sign them in with google?
            //     this.signInWithGoogle();
            // })

        }
    }

    

  render() {

    const {isShown, email, pass} = this.state;


    return (
      <div onClick={() => this.setState({isShown: !this.state.isShown})} className="container main">

        <header className="container header">
            <div className="first">
               <h1 className="h1">OneStopMall.pk</h1>
            </div>
            <div className="second">
                <form className="container form" onSubmit={this.onSignInPress}>
                    <input className='input' type='email' value={email} onChange={(event) => this.setState({email: event.target.value})}/>
                    <input className='input' type='password' value={pass} onChange={(event) => this.setState({pass: event.target.value})}/>
                    <input className="button submit" type='submit' value='Log In'/>
                </form>
            </div>
        </header>

        <body className='container body'>
            <img src={logo} className="App-logo" alt="logo" />
        </body>
            
        
      </div>
    )
  }
}

{/* <label style={styles.emailField}>
                Password:
                    <input type="text" value={this.state.pass} onChange={this.handlePassChange} />
                </label> */}

                // <ul>
                //     <li onClick={() => this.setState({isShown: !this.state.isShown})}>All Categories
                //     {isShown ? 
                //         <ul>
                //             <li>1</li>
                //             <li>2</li>
                //         </ul>
                //         :
                //         null
                        
                //     }    
                //     </li>
                        
                // </ul>

const styles = {

    headerTab: {
        flex: 0.15,
        backgroundColor: reactBlack,
    },

    body: {
        flex: 0.9
    },
    mainContainer: {
        height: innerHeight,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center'
    },

    twoTextInputs: {
        // flexDirection: '',
        padding: 20,
        alignItems: 'center',
        // backgroundColor: 'red'
    },

    input: {
        backgroundColor: reactBlack,
        padding: 10,
        borderRadius: 5,
        width: inputFieldWidth,
        height: inputFieldHeight,

    },

    emailContainer: {
        flexDirection: 'column',
        paddingHorizontal: 5,
        paddingVertical: 3,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue'
    },

    emailLabel: {

    },

    emailField: {
        flexDirection: 'column',
        // backgroundColor: 'yellow'
        // paddingHorizontal:
    },
}