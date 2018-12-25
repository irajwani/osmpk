import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DivWithTable from './testReactBasics/DivWithTable';
import Home from './views/Home';

class App extends Component {
  render() {
    console.log('Initializing Application');
    return (
      <Home/>
    )
  }
}


// class App extends Component {
//   render() {
//     return(
      
//         <DivWithTable/>
      
//     ) 
//   }
// }

// class App extends Component {
//   render() {
//     return (
//       <div style={styles.mainContainer}>
//         <header style={styles.header}>
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>

//         <body style={styles.body}>
//           <p>hi</p>
//         </body>
        
//       </div>
//     );
//   }
// }

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header:{
    flex: 0.5,
    backgroundColor: 'black'
  },
  body:{
    flex: 0.5,
  }
}

export default App;
