import axios from 'axios';

import React,{Component} from 'react';

class FileUpload extends Component {

	state = {

	// Initially, no file is selected
	selectedFile: null
	};
	
	// On file select (from the pop up)
	onFileChange = event => {
	
	// Update the state
	this.setState({ selectedFile: event.target.files[0] });
	
	};
	
	// On file upload (click the upload button)
	onFileUpload =async () => {

        let axiosInstance = axios.create();

delete axiosInstance.defaults.headers;
	
	// Create an object of formData
	const formData = new FormData();
	
	// Update the formData object
	formData.append("id",221)
    formData.append("image",this.state.selectedFile)
		
	
	
	// Details of the uploaded file
	console.log(this.state.selectedFile);
    const config={
        headers:{
            'Content-Type': 'multipart/form-data',
          'APPKEY' :'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        }
      }

  /*   const body={
        "id":"221",
        "image":formData
    } */
    console.log("formData=",formData)

	// Request made to the backend api
	const res=await axios.post("https://theneverendingwordgame.com/ne_game_api/api/user/update/profile/image", formData,config);

	console.log("Responce=",res.data)
};
	


	// File content to be displayed after
	// file upload is complete

	
	render() {
	
	return (
		<div>
			<div>
				<input type="file" onChange={this.onFileChange} />
				<button onClick={this.onFileUpload}>
				Upload!
				</button>
			</div>
		</div>
	);
	}
}

export default FileUpload;
