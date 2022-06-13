import React,{createContext,useState} from 'react'


export const notificationContext = createContext(null)

export const NotificationContextProvider = ({children}) => {

  const[notification,setNotification] = useState({
    isShown:true,
    color:"red",
    message:"Something went wrong.",
    time:1000
  })

  return (
    <notificationContext.Provider value={{notification,setNotification}}>
      {children}
    </notificationContext.Provider>
  )
}