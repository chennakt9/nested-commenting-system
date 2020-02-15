import React, { Component } from 'react'

import axios from 'axios';

export default class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
          name:"",
          email:"",
          password:"",
          password2:"",
          error:""
        };

        axios.defaults.withCredentials = true;
    
      }
      

        onChangeNameHandler = (e) => {
            this.setState({
            name: e.target.value
            })
            
            // console.log(this.state.curr_name);  
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

        onChangePassword2Handler = (e) => {
            this.setState({
                password2: e.target.value
              })
                
              // console.log(this.state.curr_name);
            }
        
        onSubmitHandler = (e) => {
            e.preventDefault();
            console.log(this.state);
    
            // For posting Data
            const registerData = {
                name:this.state.name,
                email: this.state.email,
                password: this.state.password,
                password2:this.state.password2
            }
      
            if(this.state.name!=="" && this.state.email!=="" && this.state.password!=="" && this.state.password2!==""){
                
               
    
                axios.post('http://localhost:4000/users/register', registerData)
                .then(res => {
                    console.log(res);
                    if(res.data["message"]){
                        this.props.history.push('/');
                        
                    }else{
                        this.setState({
                            error:"Error registering in..."
                        });
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
                    error:"All the fields are required"
                })
                
            }
        }

    render() {
        return (
            <div>
                <div className="row mt-5">
    <div className="col-md-6 m-auto">
      <div className="card card-body">
        <h1 className="text-center mb-3">
          <i className="fas fa-user-plus"></i> Register
        </h1>
        
        <div className="alert alert-danger" style={{display:this.state.error?"block":'none'}}>
              
              {this.state.error}
          </div>
          
       
        <form onSubmit={this.onSubmitHandler}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              onChange={this.onChangeNameHandler}
              value={this.state.name}
            />
          </div>
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
              placeholder="Create Password"
              onChange={this.onChangePasswordHandler}
              value={this.state.password}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              className="form-control"
              placeholder="Confirm Password"
              onChange={this.onChangePassword2Handler}
              value={this.state.password2}
            />
          </div>
          <button type="submit" className="btn btn-info btn-block">
            Register
          </button>
        </form>
        <p className="lead mt-4">Have An Account? <a href="/">Login</a></p>
      </div>
    </div>
  </div>
            </div>
        )
    }
}
