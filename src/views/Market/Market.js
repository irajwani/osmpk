import React, { Component } from 'react'
import './Market.css'
import '../../designUtilities/styles.css';
import {Icon} from '../../visualComponents/Icons';
// import DragHandle from '@material-ui/icons/DragHandle'




export default class Market extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            name: '',
            uri: false,
            // 
            // 
            // 
            searchTerm: '',
        };
    }

    performSearch = () => {
        const {searchTerm} = this.state;
    }

    render() {
        const {loggedIn, name, uri} = this.state;
        return (
            <div className="container main">

                <header className="container header">

                    <div className="container drawer-icon-container fbcc">
                        <Icon name='menu' size={24} color={'black'}/>
                    </div>

                    <div className="container company-name-container fbcc">
                        <h2 className='h2'>One Stop Mall</h2>
                    </div>

                    

                    <form className="container form fbcc" onSubmit={this.performSearch}>
                        <input class="textbox" type="text" placeholder="Search" value={this.state.searchTerm} onChange={(event)=>this.setState({searchTerm: event.target.value })}/>
                        <input class="button" title="Search"  value="" type="submit" />
                    </form>
                        
                    
                    <div className="container account-info fbcc">
                        <p className="p account-text">{loggedIn ? name : 'My Account'}</p>
                        {loggedIn ?
                            <img src={uri} className="account-picture" />
                        :
                            <Icon name='account-picture' size={24} color={'black'}/>
                        }
                    </div>

                    <div className="container cart-icon-container fbcc">
                        <Icon name='cart' size={24} color={'black'}/>
                    </div>

                </header>

                <body className="container body">
                    <div className="container filter">

                    </div>

                    <div className="container market">

                    </div>
                </body>
            
            </div>
        )
    }
}
