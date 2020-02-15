import React, { Component } from 'react'
import axios from 'axios';
// import {Link} from 'react-router-dom';



class CommentsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      parents:[],
      data:[],
      comments:{},
      curr_name:"",
      curr_comment:"",
      curr_parent:"0",
      error:""
    };

    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = `https://${document.location.hostname}/`; //https://nestedcommenting.herokuapp.com/

    if(process.env.NODE_ENV==="development"){
      axios.defaults.baseURL = "http://localhost:4000"
    }
  }


  onReplyClickHandler = (e) => {

    this.setState({
      curr_parent:e.target.id
    });
    this.form_inp.focus();
    this.setState({
      curr_name:"",
      curr_comment:""
    })

    console.log("I am clicked !",e.target.id);
  }

  recursiveFetch(pid,margin,ind){
    let found = 0;

    for (let i = 0; i < this.state.data.length; i++) {
      if(this.state.data[i].parent_comment_id===pid){
        found=1;

        let dd = (
    
          <div className="card card-default mb-4" key={this.state.data[i]._id} style={{marginLeft:margin}}>
              <div className="card-header">By <b>{this.state.data[i].comment_sender_name}</b> on <i>{this.state.data[i].date}</i></div>
              <div className="card-body">{this.state.data[i].comment}</div>
              <div className="card-footer" align="right"><button type="button" onClick={this.onReplyClickHandler} className="btn btn-secondary reply" id={this.state.data[i]._id}>Reply</button></div>
          </div>
        )

        this.setState(prevState => {
          // console.log(prevState.comments);
          let comments = {...prevState.comments}
          comments[ind].push(dd);
          
          return {comments}
        });

        this.recursiveFetch(this.state.data[i]._id,margin+48,ind);


      }
      
    }

    if(found===0){
      return;
    }
  }

  componentWillMount(){

      axios.get('/api/commentsapi').then(res => {
      
      if(res.data["error"]){
        this.setState({
          error:"Error Displaying Data.You might have been logged out."
      });
      }else{
        this.setState({
          data:res.data
        });
      }

      
    

    }).then(()=>{

      axios.get('/api/commentsapi/0').then(res => {
      // console.log(res.parents)

    this.setState({
      parents:res.data
    });
    

  }).then(()=>{
    for(let i=0;i<this.state.parents.length;i++){

      let comment1 = this.state.parents[i];
      
      let dd = (
    
        <div className="card card-default mb-4" key={comment1._id} style={{marginLeft:0}}>
            <div className="card-header">By <b>{comment1.comment_sender_name}</b> on <i>{comment1.date}</i></div>
            <div className="card-body">{comment1.comment}</div>
            <div className="card-footer" align="right"><button type="button" onClick={this.onReplyClickHandler} className="btn btn-secondary reply" id={comment1._id}>Reply</button></div>
	      </div>
      )

      this.setState(prevState => {
        let comments = {...prevState.comments}
        comments[i]=[dd];
        
        return {comments}
      });

    }
    // console.log(this.state.parents);
  }).then(()=>{

    let margin = 0;
    for (let i = 0; i < this.state.parents.length; i++) {
      this.recursiveFetch(this.state.parents[i]._id,margin+48,i);
      
    }

    console.log(this.state.parents);
    console.log(this.state.data);
    console.log(this.state.comments);

  })
      
    })

  }


  onChangeNameHandler = (e) => {
    this.setState({
      curr_name: e.target.value
    })
      
    // console.log(this.state.curr_name);  
  }

  onChangeCommentHandler = (e) => {

    this.setState({
      curr_comment: e.target.value
    })
      
    // console.log(this.state.curr_comment);

  }


  showComments = () => {

    return (Object.keys(this.state.comments).map( key => {
      return this.state.comments[key].map((comment) =>{
        return comment
      })

    }));

  }
  
  onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(this.state.curr_name);
    console.log(this.state.curr_comment);
    console.log(this.state.curr_parent);

    //For posting Data
    const newComment = {
      comment_sender_name: this.state.curr_name,
      comment: this.state.curr_comment,
      parent_comment_id: this.state.curr_parent,

    }

    if(this.state.curr_name!=="" && this.state.curr_comment!==""){

      axios.post('/api/commentsapi/add/', newComment)
      .then(res => {
        console.log(res.data);
        this.componentWillMount();
      });

      

      //After Adding into the database
      this.setState({
        curr_name:"",
        curr_comment:"",
        curr_parent:"0"
      });

    }
    
  }

  render() {
    
    return (
      <div className="p-4 m-4 border border-light">
        <br></br>
        <div className="alert alert-danger" style={{display:this.state.error?"block":'none'}}>
              
              {this.state.error}
          </div>
        <br></br>
       
        <div className="shadow p-3 mb-5 bg-white rounded">

        <form onSubmit={this.onSubmitHandler}>
          <div className="form-group" >
            <input type="text" className="form-control" placeholder="Enter Name" ref={(el)=>{this.form_inp = el}} onChange={this.onChangeNameHandler} value={this.state.curr_name}/>
          </div>
          <div className="form-group">
							<textarea name="comment_content"className="form-control" onChange={this.onChangeCommentHandler} value={this.state.curr_comment} placeholder="Enter Comment" rows="5"></textarea>
						</div>
          <input type="submit" className="btn btn-primary" value="submit"/>
        </form>

        </div> 
        

        <br/>
        {this.showComments()}
      </div>
    )
  }
}

export default CommentsList
