(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,a){},23:function(e,t,a){e.exports=a(49)},49:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(21),o=a.n(s),l=(a(11),a(4)),c=a(5),m=a(7),i=a(6),d=a(8),u=a(52),h=a(53),p=a(13),f=a(3),g=a.n(f),E=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(i.a)(t).call(this,e))).onReplyClickHandler=function(e){a.setState({curr_parent:e.target.id}),a.form_inp.focus(),a.setState({curr_name:"",curr_comment:""}),console.log("I am clicked !",e.target.id)},a.onChangeNameHandler=function(e){a.setState({curr_name:e.target.value})},a.onChangeCommentHandler=function(e){a.setState({curr_comment:e.target.value})},a.showComments=function(){return Object.keys(a.state.comments).map(function(e){return a.state.comments[e].map(function(e){return e})})},a.onSubmitHandler=function(e){e.preventDefault(),console.log(a.state.curr_name),console.log(a.state.curr_comment),console.log(a.state.curr_parent);var t={comment_sender_name:a.state.curr_name,comment:a.state.curr_comment,parent_comment_id:a.state.curr_parent};""!==a.state.curr_name&&""!==a.state.curr_comment&&(g.a.post("http://localhost:4000/comments/add/",t).then(function(e){return console.log(e.data)}),a.componentWillMount(),a.setState({curr_name:"",curr_comment:"",curr_parent:"0"}))},a.state={parents:[],data:[],comments:{},curr_name:"",curr_comment:"",curr_parent:"0"},g.a.defaults.withCredentials=!0,a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"recursiveFetch",value:function(e,t,a){for(var n=this,s=0;s<this.state.data.length;s++)this.state.data[s].parent_comment_id===e&&function(){1;var e=r.a.createElement("div",{className:"card card-default mb-4",key:n.state.data[s]._id,style:{marginLeft:t}},r.a.createElement("div",{className:"card-header"},"By ",r.a.createElement("b",null,n.state.data[s].comment_sender_name)," on ",r.a.createElement("i",null,n.state.data[s].date)),r.a.createElement("div",{className:"card-body"},n.state.data[s].comment),r.a.createElement("div",{className:"card-footer",align:"right"},r.a.createElement("button",{type:"button",onClick:n.onReplyClickHandler,className:"btn btn-secondary reply",id:n.state.data[s]._id},"Reply")));n.setState(function(t){var n=Object(p.a)({},t.comments);return n[a].push(e),{comments:n}}),n.recursiveFetch(n.state.data[s]._id,t+48,a)}()}},{key:"componentWillMount",value:function(){var e=this;g.a.get("http://localhost:4000/comments").then(function(t){e.setState({data:t.data})}).then(function(){g.a.get("http://localhost:4000/comments/0").then(function(t){e.setState({parents:t.data})}).then(function(){for(var t=function(t){var a=e.state.parents[t],n=r.a.createElement("div",{className:"card card-default mb-4",key:a._id,style:{marginLeft:0}},r.a.createElement("div",{className:"card-header"},"By ",r.a.createElement("b",null,a.comment_sender_name)," on ",r.a.createElement("i",null,a.date)),r.a.createElement("div",{className:"card-body"},a.comment),r.a.createElement("div",{className:"card-footer",align:"right"},r.a.createElement("button",{type:"button",onClick:e.onReplyClickHandler,className:"btn btn-secondary reply",id:a._id},"Reply")));e.setState(function(e){var a=Object(p.a)({},e.comments);return a[t]=[n],{comments:a}})},a=0;a<e.state.parents.length;a++)t(a)}).then(function(){for(var t=0;t<e.state.parents.length;t++)e.recursiveFetch(e.state.parents[t]._id,48,t);console.log(e.state.parents),console.log(e.state.data),console.log(e.state.comments)})})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"p-4 m-4 border border-light"},r.a.createElement("br",null),r.a.createElement("div",{className:"shadow p-3 mb-5 bg-white rounded"},r.a.createElement("form",{onSubmit:this.onSubmitHandler},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Enter Name",ref:function(t){e.form_inp=t},onChange:this.onChangeNameHandler,value:this.state.curr_name})),r.a.createElement("div",{className:"form-group"},r.a.createElement("textarea",{name:"comment_content",className:"form-control",onChange:this.onChangeCommentHandler,value:this.state.curr_comment,placeholder:"Enter Comment",rows:"5"})),r.a.createElement("input",{type:"submit",className:"btn btn-primary",value:"submit"}))),r.a.createElement("br",null),this.showComments())}}]),t}(n.Component),b=(a(20),function(e){function t(){return Object(l.a)(this,t),Object(m.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"About Page"))}}]),t}(n.Component)),v=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(i.a)(t).call(this,e))).onChangeEmailHandler=function(e){a.setState({email:e.target.value})},a.onChangePasswordHandler=function(e){a.setState({password:e.target.value})},a.onSubmitHandler=function(e){e.preventDefault(),console.log(a.state.password),console.log(a.state.email);var t={email:a.state.email,password:a.state.password};""!==a.state.email&&""!==a.state.password?g.a.post("http://localhost:4000/users/login",t).then(function(e){console.log(e),e.data.error?a.setState({error:"Error logging in..."}):a.props.history.push("/")}):a.setState({error:"All the fields are required."})},a.state={email:"",password:"",error:""},g.a.defaults.withCredentials=!0,a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"row mt-5"},r.a.createElement("div",{className:"col-md-6 m-auto"},r.a.createElement("div",{className:"card card-body"},r.a.createElement("h1",{className:"text-center mb-3"},r.a.createElement("i",{className:"fas fa-sign-in-alt"})," Login"),r.a.createElement("div",{className:"alert alert-danger",style:{display:this.state.error?"block":"none"}},this.state.error),r.a.createElement("form",{onSubmit:this.onSubmitHandler},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement("input",{type:"email",id:"email",name:"email",className:"form-control",placeholder:"Enter Email",onChange:this.onChangeEmailHandler,value:this.state.email})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{type:"password",id:"password",name:"password",className:"form-control",placeholder:"Enter Password",onChange:this.onChangePasswordHandler,value:this.state.password})),r.a.createElement("button",{type:"submit",className:"btn btn-info btn-block"},"Login")),r.a.createElement("p",{className:"lead mt-4"},"No Account? ",r.a.createElement("a",{href:"/users/register"},"Register"))))))}}]),t}(n.Component),w=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(i.a)(t).call(this,e))).onChangeNameHandler=function(e){a.setState({name:e.target.value})},a.onChangeEmailHandler=function(e){a.setState({email:e.target.value})},a.onChangePasswordHandler=function(e){a.setState({password:e.target.value})},a.onChangePassword2Handler=function(e){a.setState({password2:e.target.value})},a.onSubmitHandler=function(e){e.preventDefault(),console.log(a.state);var t={name:a.state.name,email:a.state.email,password:a.state.password,password2:a.state.password2};""!==a.state.name&&""!==a.state.email&&""!==a.state.password&&""!==a.state.password2?g.a.post("http://localhost:4000/users/register",t).then(function(e){console.log(e),e.data.message?a.props.history.push("/login"):a.setState({error:"Error registering in..."})}):a.setState({error:"All the fields are required"})},a.state={name:"",email:"",password:"",password2:"",error:""},g.a.defaults.withCredentials=!0,a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"row mt-5"},r.a.createElement("div",{className:"col-md-6 m-auto"},r.a.createElement("div",{className:"card card-body"},r.a.createElement("h1",{className:"text-center mb-3"},r.a.createElement("i",{className:"fas fa-user-plus"})," Register"),r.a.createElement("div",{className:"alert alert-danger",style:{display:this.state.error?"block":"none"}},this.state.error),r.a.createElement("form",{onSubmit:this.onSubmitHandler},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"name"},"Name"),r.a.createElement("input",{type:"name",id:"name",name:"name",className:"form-control",placeholder:"Enter Name",onChange:this.onChangeNameHandler,value:this.state.name})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement("input",{type:"email",id:"email",name:"email",className:"form-control",placeholder:"Enter Email",onChange:this.onChangeEmailHandler,value:this.state.email})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{type:"password",id:"password",name:"password",className:"form-control",placeholder:"Create Password",onChange:this.onChangePasswordHandler,value:this.state.password})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"password2"},"Confirm Password"),r.a.createElement("input",{type:"password",id:"password2",name:"password2",className:"form-control",placeholder:"Confirm Password",onChange:this.onChangePassword2Handler,value:this.state.password2})),r.a.createElement("button",{type:"submit",className:"btn btn-info btn-block"},"Register")),r.a.createElement("p",{className:"lead mt-4"},"Have An Account? ",r.a.createElement("a",{href:"/users/login"},"Login"))))))}}]),t}(n.Component),N=function(e){function t(){return Object(l.a)(this,t),Object(m.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(u.a,null,r.a.createElement("div",{className:"container"},r.a.createElement("nav",{className:"navbar navbar-expand-sm bg-light"},r.a.createElement("ul",{className:"navbar-nav"},r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"/"},"Home")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"/about"},"About")))),r.a.createElement(h.a,{path:"/",exact:!0,component:E}),r.a.createElement(h.a,{path:"/about",component:b}),r.a.createElement(h.a,{path:"/login",component:v}),r.a.createElement(h.a,{path:"/register",component:w})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[23,1,2]]]);
//# sourceMappingURL=main.e60c5a92.chunk.js.map