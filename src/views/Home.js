import React, { Component } from 'react'
import { reactBlack } from '../designUtilities/colors';
import './Home.css';

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

    const {isShown} = this.state;


    return (
      <div onClick={() => this.setState({isShown: !this.state.isShown})} style={styles.mainContainer}>

            <header className="header">

                <form className='form' onSubmit={this.onLoginPress}>

                    <div className="two-text-inputs">
                        
                        <div className="input-container email">
                            <input className="input" type="text" placeholder={'Email'} value={this.state.email} onChange={this.handleEmailChange} />
                        </div>

                        <div className="input-container pass">
                            <input className="input" type="password" placeholder={'Password'} value={this.state.pass} onChange={this.handlePassChange} />
                        </div>
                        
                    </div>


                    <div className="button submit">
                        <input type="submit" value="Login" />
                    </div>
                    
                </form>

            </header>

            <body className="body">
                
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