import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import axios from 'axios'

function App() {
  const InitialState = {
    fullname:"",
    email:"",
    password:"",
    confirmpassword:''
  }
  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword:''
  });
  const handlechange = (e)=>{
    const{name,value} = e.target;
    setUser({...user,[name]:value});
    validateForm(name,value)
  }
  const validateForm = (name,value)=>{
    let error = formErrors;
    switch(name){
      case 'fullname':
          error.username = value.length <= 0?'Fullname is required':'';
      break;
      case 'email':
        error.email = value.length <=0 ?'Email is required':'' || /\S+@\S+\.\S+/.test(value) ? '' : 'Email is invalid';
      break;
      case 'password':
        error.password = value.length <=0 ? 'Password is required':'' || value.length<6? 'Password length must be above 6 lettert':'';
      break;
      case 'confirmpassword':
        error.confirmpassword = value.length <=0 ? 'Confirm password is required':'' || value !== user.password?'Confirm password is not match with password':'';
      break; 
      default:
        return error;
     }
     setFormErrors(error);
  }
  let [user,setUser] = useState(InitialState);
  let [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();

    Object.keys(user).forEach(key => {
      const value = user[key];
      validateForm(key, value);
    });
    console.log(formErrors);
    setIsSubmitted(true);
    const valid = Object.values(formErrors).every(error => error === '') && 
                  Object.values(user).every(value => value !== '');

    if (valid) {
      try{
        const response = await axios.post('http://localhost:8080/api/signup',user);
        setUser(InitialState);
        console.log(response.data);
      }catch(error){
        console.log(error);
      }
    } else {
      console.log('Form is invalid');
    }
  };
 
  
  return (
    <>
    <div className="App">
    <Form className='form' onSubmit={handleSubmit}>
    <div className="heading">
        <h2>Registration Form</h2>
    </div>
    <div className="inputBox">
        <input type="text" name='fullname' value={user.fullname} onChange={handlechange}/>
      <label>Full name</label>
      {isSubmitted && formErrors.username && <small style={{color:"red"}}>{formErrors.username}</small>}
    </div>
    <div className="inputBox">
      <input type="text" name='email'value={user.email} onChange={handlechange}/>
      <label>Email address</label>
      {isSubmitted && formErrors.email && <small style={{color:"red"}}>{formErrors.email}</small>}
    </div>        
    <div className="inputBox">
      <input type="password" name='password' value={user.password} onChange={handlechange}/>
      <label>Password</label>
      {isSubmitted && formErrors.password && <small style={{color:"red"}}>{formErrors.password}</small>}
    </div>        
    <div className="inputBox">
      <input type="password" name='confirmpassword' value={user.confirmpassword} onChange={handlechange}/>
      <label>Confirm password</label>
      {isSubmitted && formErrors.confirmpassword && <small style={{color:"red"}}>{formErrors.confirmpassword}</small>}
    </div>
      <button type='submit' >Submit</button>
    </Form>
    </div>
    </>
  );
}

export default App;
