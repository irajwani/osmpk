import React, { Component } from 'react'
import { reactBlack } from '../../designUtilities/colors';
import './Home.css';
import logo from '../../logo.svg'

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

    onLoginPress = () => {

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
                <form className="container form" onSubmit={this.onLoginPress}>
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