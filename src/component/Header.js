import React, {Component} from 'react';
import firebase from './Firebase'
class Header extends Component {
    render() {
        return (
            <div>
                <header className="main-header">

                    <a href="index2.html" className="logo">

                        <span className="logo-mini"><b>A</b>LT</span>

                        <span className="logo-lg"><b>Admin</b>LTE</span>
                    </a>


                    <nav className="navbar navbar-static-top">

                        <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                            <span className="sr-only">Toggle navigation</span>
                        </a>

                        <div className="navbar-custom-menu">
                            <ul className="nav navbar-nav">
                                        <li>
                                            <div className="pull-right">
                                                <button onClick={()=>{
                                                    console.log('logout');
                                                    firebase.auth().signOut().then((e)=>{
                                                        console.log(e);
                                                    }).then((e)=>{
                                                        console.log(e);
                                                    });
                                                }} className="btn btn-primary"><i className={'fas fa-sign-out-alt'}   /> Sign out</button>
                                            </div>
                                        </li>

                            </ul>
                        </div>

                    </nav>
                </header>
            </div>
        );
    }
}

export default Header;