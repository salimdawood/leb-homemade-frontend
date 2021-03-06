import React,{useRef} from 'react'
import reactDom from 'react-dom'
//api
import { URL_PATH } from '../constantVariables/path'
import * as Axios from 'axios'
//email verification
import emailjs from 'emailjs-com'

const EmailFragment = (props) => {

  const {form,setForm,setPage,setLoading,setCodeSent} = props

  const formRef  = useRef()

  const sendVerification = async(e)=>{

    e.preventDefault()
    setLoading(true)

    try {
      const result_api = await Axios.get(URL_PATH+`Users/${form.name}`)
      console.log(result_api)
      if(result_api.data !== null){
        let form_copy = formRef.current.cloneNode(true)
        let form_input_email = React.createElement('input',{type:'email',name:'email',defaultValue:result_api.data})
        let form_input_message = React.createElement('input',{type:'text',name:'message',defaultValue:form.message})
        let form_input_container = React.createElement('div',{},form_input_email,form_input_message)
        reactDom.render(form_input_container,form_copy)
        console.log(form_copy)
        const result_email = await emailjs.sendForm('service_zce6oq2','template_5a3an0o',form_copy,'pREPpjkuU35zUe2vI')
        console.log(result_email)
        setPage(2)
        setCodeSent(true)
      }
    } catch (error) {
      console.log(error) 
    }

    setLoading(false)
  }


  return (
    <>
      <h1>Reset your password</h1>
      <p>We will send a verification code to your email</p>
      <form ref={formRef} className='email-form' onSubmit={sendVerification}>
        <label>Name *</label>
        <input type="text" name="name" value={form.name}
        onChange={(e)=>setForm({...form,[e.target.name]:e.target.value})}
        placeholder="Enter profile name"  required/>
        <input type="submit" value="Send"/>
      </form>
    </>
  )
}

export default EmailFragment