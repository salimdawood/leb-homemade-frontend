import React,{useState,useEffect,useContext} from 'react'
//components
import { Close } from './Svg'
//context
import { notificationContext } from '../context/notificationContext'
//path
import {IMAGE_PATH} from '../constantVariables/path'


const PhotoBox = (props) => {

  const{id,photo,photos,setPhotos} = props
  const {setNotification} = useContext(notificationContext)

  const [fileDataURL, setFileDataURL] = useState(null)
  const [file, setFile] = useState(photo);

  let newPhotos = [...photos]

  const imageTypeRegex = /image\/(png|jpg|jpeg)/gm

  //check if file is of proper image type
  //check if photo less than 2 mb
  //add it to photos that is passed from parent photo model
  //add it to file to preview it
  const handleFileChange = (e) =>{
    if (e.target.files[0].type.match(imageTypeRegex)) {
      //	2,097,152 b == 2mb
      if(e.target.files[0].size <= 2097152){
        newPhotos[id] = e.target.files[0]
        setPhotos([...newPhotos])
        setFile(e.target.files[0])
      }
      else{
        e.target.value = null
        setNotification({isShown:true,message:"You can't upload image bigger than 2MB",color:"red"})
      }
    }
    else{
      e.target.value = null
      setNotification({isShown:true,message:"You can't upload this image type",color:"red"})
    }
  }

  //remove photo if file or string
  const removePhoto = () =>{
    newPhotos[id]=null 
    setPhotos([...newPhotos])
    setFile(null)
  }


  //props passed to useState won't update the state
  //must update it using useeffect
  useEffect(() => {
    setFile(photo)
  }, [photo])


  //when passed all validation preview it in the placeholder
  useEffect(() => {
    let fileReader, isCancel = false;
    //check type if string or file
    //if string show it from server
    if( file != null && !('size' in file)){
      setFileDataURL(IMAGE_PATH+file.name)
      return
    }
    //if file then preview it
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }
  }, [file]);



  return (
    <div className="photo-box" key={id}>
      {
        file != null && <Close onClick={removePhoto}/>
      }
      <label className="photo-label">
        {
          file != null && <img src={fileDataURL}/>
        }
        <input type="file" onChange={handleFileChange} accept="image/png,image/jpeg"/>
      </label>
    </div>
  )
}

export default PhotoBox