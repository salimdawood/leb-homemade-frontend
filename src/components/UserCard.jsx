import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../context/userContext'
import { cardContext } from '../context/cardContext'
import * as Axios from 'axios'
import {URL_PATH} from '../path'

const UserCard = (props) => {

  const {userProfile:{id}} = useContext(userContext)
  const {cardProfile,dispatch} = useContext(cardContext)
  const navigate = useNavigate()

  
  const updateCard = () =>{
    Axios.get(URL_PATH+`Cards/${props.id}`)
    .then((result)=>{
      console.log(result)
      
      //dispatch({type:'UPDATE_CARD_PROFILE',cardProfile:{...result.data}})
      sessionStorage.setItem("card",JSON.stringify(result.data))
      navigate(`/user/${id}/cards?card=${props.id}`)
    },(error)=>{
      console.log(error)
    });
  }

  const addCard = () =>{
    navigate(`/user/${id}/add-card`)
  }
  
  return (
    props.id != null ?
    <div onClick={updateCard} className="card-space">
      <h3>{props.title}</h3>
      <h4>{props.type}</h4>
      <h6>{props.dateCreated}</h6>
    </div>
    :
    <div onClick={addCard} className="card-space card-add">
    </div>

  )
}

export default UserCard