import React, { useState } from 'react'
import './Upload.scss'
import Image from '../images/image.svg';
import axios from './axios';
import {MdDone} from 'react-icons/md';
import Dropzone from 'react-dropzone';
import {useNavigate} from 'react-router-dom';
import  { useAuth } from './auth'

function Upload() {
  const [image,setImage]=useState(null);
    const [progress,setProgress]=useState(null);
    const [currentlyUpload,setCurrentlyUpload]=useState(false);
    const [error,setError]=useState({
        found:false,
        message: ''
    });
    const auth = useAuth()
    const maxSize=5000000 ;

    const onDrop=(acceptedFiles)=>{
        console.log(acceptedFiles)
    }
    
    const navigate = useNavigate();
   
    const handleOnSubmit=  ({target:{files}})=>{
                console.log('Heloo !');
                let formData=new FormData();
                formData.append('image',files[0]);
                const options={
                    onUploadProgress: (progressEvent)=>{
                       const {loaded,total} = progressEvent;
                       let percent =Math.floor((loaded*100)/total);
                       console.log(`${loaded}kb of ${total} kb | ${percent} % `);
                       if(percent>0 && percent<100){
                            setProgress(percent);
                            setCurrentlyUpload(true);
                       }

                      }

                }
                console.log(formData);
                const url = 'https://imageuploader90.herokuapp.com/images/'
                axios.post(url,formData,options).then(res=>
                { 
                        setTimeout(()=>{
                            setImage(res.data);
                            setProgress(0);
                            setCurrentlyUpload(false);
                        },100)
                        console.log(auth.user);

                }
                ).catch((err)=>{
                    console.log(err);
                    if(err.response.status === 400){
                        const errMsg=err.response.data;
                        console.log(err.response.data.errors)
                        setError({
                            found:true,
                            message:err.response.data.errors
                        })
                        if(errMsg){ 
                            console.log(errMsg)
                        }
                    }else{
                        console.log('Another error %s',err)
                    }
                });
                axios({
                    method: 'post',
                    url: 'http://localhost:4000/app/imageUpload',
                    data: {
                      user: auth.user,
                      image: image._id
                    }
                  });

    }
    React.useEffect(() => {
        console.log(image)
    }, [image])

    const handleLogout=(e)=>{
        auth.logout()
    }
    const handleViewChange=(e)=>{
        navigate('/View')
    }

  return (
    <>
    {
        currentlyUpload ?(
            <div className="progress-container">
                <p>Uploading...</p>
                <progress value={progress} max="100" min="0" className="progress-bar"/>
             </div>  
        ):(
            <div className="container">
            {
                image ? 
                (    
                 <>
                 
                  {
                    error.found && (
                        <div className="error-container">
                            {error.message}
                        </div>
                    )
                 }
                 { 
                    <>
                        <div className="icon-container">
                        <div className="success-icon">
                             <MdDone/>
                        </div>
                    </div>
                        <h3 className="success-text">Uploaded Successfully!</h3>
                        <div className="image-container">
                            <img className="full-image" src={`https://imageuploader90.herokuapp.com/images/${image._id}`} alt="name" />

                        </div>
    
                        
                          <button type="button" onClick={handleViewChange}>View?</button>
                        </>     
                 }    
                 </>

                ):
                (
                <>
                    <h3>Upload Image</h3>
                    <p>File should be Jpeg,Png,..</p>
                    <Dropzone onDrop={onDrop} multiple={false} minSize={0} maxSize={maxSize}>
                        {
                            ({ getRootProps,getInputProps })=>(
                                <div {...getRootProps({ className: "file-container" })} onChange={handleOnSubmit}>
                                    <input {...getInputProps()} />
                                    <img src={Image} alt="example"/>
                                    <p>Drag &amp; Drop your image here </p>
                                </div>
                            )
                        }
                       
                    </Dropzone>
                    <p className="trans">Or</p>
            
                    <div class="btn-container">
                         <input type="file"  onChange={handleOnSubmit} name="upfile"/>
                         <button type="submit"  className="btn-upload">Choose a file</button>
                    </div>

                 </>  
                )
            }

         </div>
        )
    }
    
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    </>
    )
}

export default Upload