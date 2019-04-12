import React, {Component} from 'react';
import firebase,{userSession,logout} from './component/Firebase'
class Signin extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        }
    }

    login(){

       // firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((result)=>{
       //     console.log(result);
       // }).catch((err)=>{
       //     console.log(err);
       // });
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((result)=>{
            console.log(result);
            this.props.history.push('/home');
        }).catch((err)=>{
            console.log(err);
        });
    }


    render() {
        return (
            <div>
                <div className="login-box">
                    <div className="login-box-body">
                        <p className="login-box-msg">Sign in to start your session</p>

                        <div  style={{shadow:"6px",}}  >
                            <div className="form-group has-feedback">
                                <input type="email" className="form-control" placeholder="Email" onChange={(e)=>{this.setState({
                                    email:e.target.value
                                })}} />
                                    <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                            </div>
                            <div className="form-group has-feedback">
                                <input type="password" className="form-control" placeholder="Password" onChange={(e)=>{this.setState({
                                    password:e.target.value
                                })}} />
                                    <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                            </div>
                            <div className="row">
                                <div className="col-xs-8">
                                    <div className="checkbox icheck">
                                        <label>
                                            <div className="icheckbox_square-blue" aria-checked="false"
                                                 aria-disabled="false" style={{position: "relative"}}><input
                                                type="checkbox"
                                                style={{position: 'absolute', top: '-20%', left: '-20%', display: 'block', width: '140%', height: '140%' ,margin: '0px', padding: '0px', background: 'rgb(255,255,255)', border: '0px', opacity: 0}}/>
                                                <ins className="iCheck-helper"
                                                     style={{position: 'absolute', top: '-20%', left: '-20%', display: 'block' ,width: '140%' ,height: '140%' ,margin: '0px', padding: '0px' ,background: 'rgb(255, 255, 255)', border: '0px', opacity: "0;"}}></ins>
                                            </div>
                                            Remember Me
                                        </label>
                                    </div>
                                </div>

                                <div className="col-xs-4">
                                    <button  className="btn btn-primary btn-block btn-flat"  onClick={()=>{
                                       this.login()
                                    }} >Sign In
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signin;