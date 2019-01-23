import React, { Component } from 'react'
import { reactBlack } from '../../designUtilities/colors';
import './Home.css';
import logo from '../../logo.svg'
import firebase from '../../cloud/firebase';
import Modal from '../../visualComponents/Modal';
import { updateFirebase } from './functions';
// import {browserHistory} from 'react-router-dom'

const {innerHeight} = window;

const inputFieldHeight = 30;
const inputFieldWidth= 150;

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',

            //createProfile stuff
            newEmail: '',
            newPass: '',
            name: '',
            image: null,
            uri: '',
            //
            isShown: false,


            signUpModalVisible: false,
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
        console.log('logged in')
        this.props.history.push('/market')
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

    // onSignUpPress = () => {
    //     const {email, pass} = this.state;
    //     firebase.auth().createUserWithEmailAndPassword(email, pass)
        
    // }

    createProfile = () => {
        const {newEmail, newPass, name, uri} = this.state;
        this.setState({createProfileLoading: true});
        firebase.auth().createUserWithEmailAndPassword(newEmail, newPass)
          .then(() => {
                          
            var unsubscribe = firebase.auth().onAuthStateChanged( ( user ) => {
                unsubscribe();
                if(user) {
                    const {uid} = user;
                    // updateFirebase(this.state, uid);
                    this.handleAvatarUpload(uid);
                    // alert('Your account has been created.\nPlease use your credentials to Sign In.');
                    // this.props.navigation.navigate('SignIn'); 
                }
                else {
                alert('Oops, there was an error with account registration!');
                }
            })
            }
                )
          .catch(() => {
              this.setState({ error: 'You already have a NottMyStyle account. Please use your credentials to Sign In', createProfileLoading: false, email: '', pass: '', pass2: '' });
              alert(this.state.error)
          });
    }

    toggleModal = () => {
        this.setState({signUpModalVisible: !this.state.signUpModalVisible})
    }

    handleAvatarChange = (e) => {

        if(e.target.files[0]) {
            // console.log( e.target.files, Object.keys(e.target), Object.keys(e.currentTarget) )
            // console.log()
            const image = e.target.value;
            // console.log(image, typeof image);
            this.setState(() => ({image}))
        }
    }

    handleImageChosen = () => {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            this.setState({uri: fileReader.result})
        }
        fileReader.readAsDataURL(this.state.image);

        // fs.readFile
    }

    // handleLoadCompletion = (e) => {
    //     console.log(fileReader.result)
    //     // this.setState({uri: })
    // }

    handleAvatarUpload = (uid) => {
        let imageRef = firebase.storage().ref().child(`Users/${uid}/profile`);
        // uploadTask.on('state_changed', progress, error, complete)
        // console.log(this.state.image);
        const uploadTask = imageRef.put(this.state.image);
        uploadTask.on('state_changed', 
        //progress
        (snapshot) => {
            console.log(snapshot)
        },
        //error
        (error) => {
            console.log(error);
        },
        //complete
        () => {
            imageRef.getDownloadURL()
            .then( url => {
                updateFirebase(this.state, url, uid);
            })    
            
        })

    }

    

  render() {

    const {signUpModalVisible, isShown, email, pass, newEmail, newPass, name, uri} = this.state;


    return (
      <div onClick={() => this.setState({isShown: !this.state.isShown})} className="container main">

        

        <header className="container header">
            <div className="first">
               <h1 className="h1">OneStopMall.pk</h1>
            </div>
            <div className="second">
                <form className="container credentials-form">
                    <input className='credential-input' type='email' value={email} onChange={(event) => this.setState({email: event.target.value})}/>
                    <input className='credential-input' type='password' value={pass} onChange={(event) => this.setState({pass: event.target.value})}/>
                    <input className="submit" type='button' value='Log In' onClick={this.onSignInPress}/>
                    
                </form>
            </div>
        </header>

        <div className='container body'>
            
            <form className="sign-up-form" onSubmit={this.handleSubmit}>

                {/* textual information */}

                <input className='credential-input' type="email" value={newEmail} onChange={(event) => this.setState({newEmail: event.target.value})}/>
                <input className='credential-input' type="password" value={newPass} onChange={(event) => this.setState({newPass: event.target.value})}/>
                <input className='credential-input' type="text" value={name} onChange={(event) => this.setState({name: event.target.value})}/>

                {/* image upload stuff */}
                <input 
                name="avatar" type="file" className="avatar" accept="image/png, image/jpeg" 
                onChange={(e) => {
                    // console.log(e, e.target.files, e.target.files[0]);
                    if(e.target.files[0]) {
                        // console.log( e.target.files, Object.keys(e.target), Object.keys(e.currentTarget) )
                        const image = e.target.files[0];
                        // console.log(e.target,image, typeof image);
                        this.setState(() => ({image}))
                    }
                }}
                />
                {this.state.image ? <input type='button' onClick={this.handleImageChosen} value='Confirm Image' /> : null}
                <img src={uri ? uri : "https://via.placeholder.com/350x150"} alt="avatar" className="avatar-image"/>

                <input className="sign-up-button" type='button' value='Sign Up' onClick={this.createProfile}/>
                <p>{name}</p>
            </form>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
            
        
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