import React, { Component } from 'react'

import axios from 'axios';
import '../index.css';
const axiosInstance = axios.create({
    baseURL: document.location.hostname || "http://localhost:4000"
    });

// import {Link} from 'react-router-dom';



export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
          email:"",
          password:"",
          error:""
        };

        axios.defaults.withCredentials = true;
    
      }

    onChangeEmailHandler = (e) => {
    this.setState({
      email: e.target.value
    })
      
    // console.log(this.state.curr_name);  
    }

    onChangePasswordHandler = (e) => {
    this.setState({
        password: e.target.value
      })
        
      // console.log(this.state.curr_name);
    }
    
    onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(this.state.password);
        console.log(this.state.email);

        //For posting Data
        const loginData = {
            email: this.state.email,
            password: this.state.password,
    
        }
  
        if(this.state.email!=="" && this.state.password!==""){
            
           
            console.log(document.location.hostname);
            console.log(process.env);
            axiosInstance.post('/api/users/login', loginData)
            .then(res => {
                console.log(res);
                if(res.data["error"]){
                    this.setState({
                        error:"Error logging in..."
                    });
                }else{
                    this.props.history.push('/comments');
                }
                
                
                }
            );
    
    
            //After Adding into the database
            // this.setState({
            // name:"",
            // password:""
            // });
    
        }else{
            this.setState({
                error:"All the fields are required."
            });
        }
    }
    render() {

        return (
            <div>

        <div className="row mt-5">
        <div className="col-md-6 m-auto">
            <div className="card card-body">
            <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i> Login</h1>
            <div className="alert alert-danger" style={{display:this.state.error?"block":'none'}}>
              
              {this.state.error}
          </div>
            <form onSubmit={this.onSubmitHandler}>
                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    onChange={this.onChangeEmailHandler} 
                    value={this.state.email}
                />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                    onChange={this.onChangePasswordHandler}
                    value={this.state.password}
                />
                </div>
                <button type="submit" className="btn btn-info btn-block">Login</button>
            </form>
            <p className="lead mt-4">
                No Account? <a href="/register">Register</a>
            </p>
            </div>
        </div>
        </div>
                
            </div>
        )
    }
}
