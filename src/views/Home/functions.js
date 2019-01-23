import firebase from '../../cloud/firebase';

const updateFirebase = (data, url, uid) => {
    //TODO: size shouldn't be here
    var updates = {};
    var updateEmptyProducts = {};

    var postData = {
        name: data.name,
        uri: url,
        // name: data.firstName + " " + data.lastName, //data.firstName.concat(" ", data.lastName)
        // country: data.country,
        // size: data.size,
        // insta: data.insta ? data.insta : '',
        //TODO: Add user uid here to make navigation to their profile page easier. 
        //Occam's razor affirms the notion: To have it available to append to any branch later, it must exist for the first time at the source.
    }

    var emptyProductPostData = {
        products: '',
    }

    updates['/Users/' + uid + '/profile/'] = postData; //TODO: The above should be a constructor function that returns a value here

    updateEmptyProducts['/Users/' + uid + '/'] = emptyProductPostData;

    // let promiseToUploadGooglePhoto = new Promise((resolve, reject) => {
                
    //     console.log(`We already have a googlePhoto url: ${uri}, so need for interaction with cloud storage`)
    //     const uploadUri = uri;
    //     // const imageRef = firebase.storage().ref().child(`Users/${uid}/profile`);
    //     var profileUpdates = {};
    //     profileUpdates['/Users/' + uid + '/profile/' + 'uri/'] = uploadUri ;
    //     firebase.database().ref().update(profileUpdates);
    //     resolve(uploadUri);
        
        
    //     }
    // )

    // let promiseToUploadPhoto = new Promise((resolve, reject) => {

    //     let imageRef = firebase.storage().ref().child(`Users/${uid}/profile`);
    //     return

    //     // if(uri.includes('googleusercontent') || uri.includes('facebook')) {
    //     //     console.log(`We already have a googlePhoto url: ${uri}, so need for interaction with cloud storage`)
            
    //     //     // const imageRef = firebase.storage().ref().child(`Users/${uid}/profile`);
    //     //     resolve(uri);
    //     // }
    //     // else {
    //     //     console.log('user has chosen picture manually through photo lib or camera.')
    //     //     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    //     //     let uploadBlob = null
    //     //     const imageRef = firebase.storage().ref().child(`Users/${uid}/profile`);
    //     //     fs.readFile(uploadUri, 'base64')
    //     //     .then((data) => {
    //     //     return Blob.build(data, { type: `${mime};BASE64` })
    //     //     })
    //     //     .then((blob) => {
    //     //     console.log('got to blob')
    //     //     uploadBlob = blob
    //     //     return imageRef.put(blob, { contentType: mime })
    //     //     })
    //     //     .then(() => {
    //     //     uploadBlob.close()
    //     //     return imageRef.getDownloadURL()
    //     //     })
    //     //     .then((url) => {
    
    //     //         resolve(url)
                
    //     //     })
    //     //     .catch((error) => {
    //     //     reject(error)
    //     //     })
    //     // }
    
        
    
    // })
    
    

    return {
        databaseProducts: firebase.database().ref().update(updateEmptyProducts),
        databaseProfile: firebase.database().ref().update(updates), 
        // storage: promiseToUploadPhoto.then((url) => {
        //     //update db with profile picture url
        //     var profileUpdates = {};
        //     profileUpdates['/Users/' + uid + '/profile/' + 'uri/'] = url ;
        //     firebase.database().ref().update(profileUpdates);
        //     return url
                
        //     }).then( (url) => {
        //         if(url.includes('googleusercontent') || url.includes('facebook')) {
        //             this.setState({createProfileLoading: false, modalVisible: false}, 
        //                 () => {
        //                     // console.log('DONE DONE DONE');
        //                     this.props.navigation.navigate('SignIn'); 
        //                 })
        //         }
        //         else {
        //             this.successfulProfileCreationCallback(url);
        //         }
                
        //     })
            
        } 

  }

export {updateFirebase}