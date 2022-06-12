import React,{useState,useContext} from 'react'
import FormInput from '../components/FormInput'
import * as Axios from 'axios'
import {URL_PATH} from '../path'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { cardContext } from '../context/cardContext'

const AddCardPage = () => {
  
  const navigate = useNavigate()
  const {userProfile,dispatch} = useAuth()
  const {typesArray,setMenuModel,setPhotoModel,cardProfile} = useContext(cardContext)

  const[cardInfo,setCardInfo] = useState({
    title:"",
    facebookLink:"",
    instagramLink:"",
    whatsappLink:"",
    typeId:"",
    userId:userProfile.id
  })

  const cardInfoInput = [
    {
      id:1,
      name:"title",
      type:"text",
      placeholder:"Enter your card title",
      errorMessage:"Title should be between 5-30 characters, and should include only letters and numbers.",
      required:true,
      label:"Title *",
      pattern:"^[a-zA-Z0-9 ]{5,30}$"
    },
    {
      id:2,
      name:"facebookLink",
      type:"text",
      placeholder:"Link to your shop's facebook page",
      label:"Facebook link"
    },
    {
      id:3,
      name:"instagramLink",
      type:"text",
      placeholder:"Link to your shop's instagram page",
      label:"Instagram link"
    },
    {
      id:4,
      name:"whatsappLink",
      type:"text",
      placeholder:"Link to your shop's whatsapp page",
      label:"Whatsapp link"
    }
  ]
    
  const addCard = (e)=>{
    e.preventDefault()

    let formData = new FormData()

    //search for better solution,way of send and recieve
    //card basic info
    for ( var info in cardInfo ) {
      formData.append(info, cardInfo[info]);
    }
    //card photos
    for(let i=0;i<cardProfile.photoList.length;i++){
      if(cardProfile.photoList[i] !== null){
        formData.append('photoList', cardProfile.photoList[i])
      }
    }
    for(let i=0;i<cardProfile.itemList.length;i++){
      formData.append('itemList', JSON.stringify(cardProfile.itemList[i]))
    }
    //print the form
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    
    Axios({
      method: "post",
      url: URL_PATH+'Cards',
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((result)=>{
      console.log(result)
      switch (result.data) {
        case -1:
          console.log("something went wrong")
          break;
        default:
          console.log("card added successfully")
          dispatch({type:'UPDATE_USER_PROFILE',userProfile:{
            ...userProfile,
            cardList:[...userProfile.cardList,{
              id:result.data,
              title:cardInfo.title,
              //better way???better solution
              type:typesArray.filter(type=>type.id == cardInfo.typeId)[0].name,
              //better date format
              dateCreated: Date()
            }]}
          })
          navigate(`/user/${userProfile.id}`)
          break;
        }
    },(error)=>{
      console.log(error)
    }); 
  }

  const handleChange =(e)=>{
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  }

  const openMenuModel = () =>{
    setMenuModel(true)
  }

  const openPhotoModel = () =>{
    setPhotoModel(true)
  }

  return (
      <div className="sign-up-form">
        <h1>Create your card</h1>
        <form onSubmit={addCard} className="form-container">
          {
            cardInfoInput.map((input)=>(
              <FormInput
              key={input.id}
              {...input}
              value={cardInfo[input.name]}
              onChange={handleChange} />
            ))
          }
          <select
            defaultValue=""
            name="typeId"
            onChange={handleChange}
            required
          >
            <option value="" disabled >Card Type</option>
            {
              typesArray.map((type)=>(
                <option key={type.id} value={type.id}>{type.name}</option>
              ))
            }
          </select>
          <input type="submit" value="Create" />
        </form>
        <input type="submit" onClick={openMenuModel} value="Manage menu" />
        <input type="submit" onClick={openPhotoModel} value="Add photos" />
      </div>
  )
}

export default AddCardPage