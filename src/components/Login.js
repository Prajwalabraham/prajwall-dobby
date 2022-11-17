import React from 'react'
import './Login.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import {useAuth} from './auth'

function Login() {
    const [state, setState] = React.useState({
        username: '',
        password: '',
        email: '',
    })
    const auth = useAuth()
    const [comment, setComment] = React.useState();
    const navigate = useNavigate();

    function handleChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        })
    }

    const handleSignupSubmit = (e) => {
        e.preventDefault()
        console.log(state);
        setState({
            username:'',
            password:'',
            email:''
        })
        axios({
            method:'post',
            url: 'http://localhost:4000/app/signup',
            data: state
        })
    }

    
    const handleLoginSubmit = async(e) => {
        e.preventDefault();
        console.log(state);
        setState({
            username:'',
            password:'',
            email:''
        })
        const response = await axios({
            method:'post',
            url: 'http://localhost:4000/app/login',
            data: state
        })
        setComment(response.data.email)
        if(comment==state.email){
            auth.login(comment)
            navigate('/Upload', {replace:true})
        }
        else{
            alert('Incorrect username and password')
            console.log(comment);
        }
        
        
        //console.log(comment);

    }
    React.useEffect(() => {
        console.log(comment)
    }, [comment])
    
  return (
    <div className="main">  	
		<input type="checkbox" id="chk" aria-hidden="true" />

			<div className="signup">
				<form onSubmit = {handleSignupSubmit}>
					<label for="chk" aria-hidden="true">Sign up</label>
					<input type="text" name="username" placeholder="User name" required="" onChange={handleChange} value={state.username} />
					<input type="email" name="email" placeholder="Email" required="" onChange={handleChange} value={state.email} />
					<input type="password" name="password" placeholder="Password" required="" onChange={handleChange} value={state.password} />
					<button>Sign up</button>
				</form>
			</div>

			<div className="login">
				<form onSubmit = {handleLoginSubmit}>
					<label for="chk" aria-hidden="true">Login</label>
					<input type="email" name="email" placeholder="Email" required="" onChange={handleChange} value={state.email} />
					<input type="password" name="password" placeholder="Password" required="" onChange={handleChange} value={state.password} />
					<button>Login</button>
				</form>
			</div>
	</div>
  )
}

export default Login