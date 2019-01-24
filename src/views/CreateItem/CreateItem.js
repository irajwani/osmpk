import React, { Component } from 'react'
import '../../assets/stylesheets/Main.css'
import './CreateItem.css';
import { uploadItem } from './functions';
import firebase from '../../cloud/firebase';

// const information = [{"picture"},{"name"}, {"price"}]
const maxImages = 4;



export default class CreateItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: firebase.auth().currentUser ? firebase.auth().currentUser.uid : false,
            pictureFiles: [],
            pictureUris: [],
            price: '',
            name: '',

            //item upload stuff
            isUploading: false,

        }
    }

    handlePicturesChange = (e) => {
        if(e.target.files) {
            if(e.target.files.length > maxImages ) {
                console.log(`cannot upload more than ${maxImages} images`) 
            }
            else {
                const files = Object.values(e.target.files);
                // console.log(Object.values(files));
                var state = {...this.state};
                
                
                files.forEach(file => {
                    let fileReader = new FileReader();
                    fileReader.onload = () => {
                        state.pictureUris.push(fileReader.result);
                        if(state.pictureUris.length === files.length) {
                            this.setState(state);
                        }
                        // this.setState({uri: fileReader.result})
                    }
                    fileReader.readAsDataURL(file);
                });
                // this.setState({pictureFiles: e.target.files}, 
                //     () => console.log(this.state.pictureFiles)
                // ); 
            }
            
        }
    }

    handleInputChange = (e, key) => {
        const state = {...this.state};
        state[key] = e.target.value;
        this.setState(state);
    }

    uploadItem = (itemData) => {
        this.setState({isUploading: true});
        //Locally stored in this component:
        var {uid,name,price, description, pictureUris} = itemData;

        
        // : if request.auth != null;
        // switch(gender) {
        //     case 0:
        //         gender = 'Men'
        //         break; 
        //     case 1:
        //         gender = 'Women'
        //         break;
        //     case 2:
        //         gender = 'Accessories'
        //         break;
        //     default:
        //         gender = 'Men'
        //         console.log('no gender was specified')
        // }

        var postData = {
            name: name,
            // brand: brand,
            price: price,
            // original_price: original_price ? original_price : 'Seller did not list original price',
            // type: type,
            // size: size,
            description: description ? description : 'Seller did not specify a description',
            // gender: gender,
            // condition: condition,
            sold: false,
            likes: 0,
            comments: '',
            time: Date.now()
            // time: oldItemPostKey ? oldItemUploadDate : Date.now(), //for now, do ot override initial upload Date
            // dateSold: '',
            // post_price: post_price ? post_price : false,
            };
        
        var updates = {};  

        var actualPostKey;
        actualPostKey = firebase.database().ref().child(`Users/${uid}/products`).push().key;
        // if(oldItemPostKey) {
        //     actualPostKey = oldItemPostKey
        // }

        // else {
        //     
        // }

        updates['/Users/' + uid + '/products/' + actualPostKey + '/'] = postData;
        
        
        //this.createRoom(newPostKey);

        
        

        return {
            database: firebase.database().ref().update(updates),
            storage: this.uploadToStore(pictureUris, uid, actualPostKey)
        }
        
    }


    render() {
        const {name, price} = this.state;
        return (
        <div className="fb col center">
            
            <input type="file" multiple name="product-pictures" accept="image/png, image/jpeg" onChange={(e) => {
                this.handlePicturesChange(e)
            }}/>

            {this.state.pictureUris.length > 1 ?
                this.state.pictureUris.map( (uri, index) => (
                    <img key={index} src={uri} alt={`pictures.${uri}`} className="product-picture"/>
                ))
                :
                null
            }

            <input type="name" onChange={(e) => this.handleInputChange(e, 'name')}/>
            
            <input type="number" onChange={(e) => this.handleInputChange(e, 'price')}/>

            <input type="button" value="create item" onClick={uploadItem}/>

            

            <p>{name + price + this.state.uid}</p>
            
        </div>
        )
    }
}
