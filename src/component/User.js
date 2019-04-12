import React, {Component} from 'react';
import firebase from './Firebase';
class User extends Component {
    constructor(props){
        super(props);
        this.ref=firebase.firestore().collection('users');
        this.state={
            users:[],
        }
    }

    onCollectionUpdate=(querySnapShot)=>{
        const users=[];
        querySnapShot.forEach((doc)=>{
            const {name,email,phone,address}=doc.data();
            users.push({
                key:doc.id,
                name,
                email,
                phone,
                address
            });
        });
        this.setState({
            users
        });
    };
    componentDidMount() {
        this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate);
    }

    render() {
        return (
            <div>
                <div className="content-wrapper">

                    <section className="content-header">
                        <h1>
                            Data Tables
                            <small>advanced tables</small>
                        </h1>

                    </section>


                    <section className="content">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="box">
                                    <div className="box-header">
                                        <h3 className="box-title">User Data Table</h3>
                                    </div>

                                    <div className="box-body">
                                        <table id="example2" className="table table-bordered table-hover">
                                            <thead>
                                            <tr>
                                                <th>User Name</th>
                                                <th>Email</th>
                                                <th>Address</th>
                                                <th>phone</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.users.map((user)=>
                                                <tr key={user.key} >
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.address}</td>
                                                <td>{user.phone}</td>
                                                </tr>
                                              )
                                            }
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <th>User Name</th>
                                                <th>Email</th>
                                                <th>Address</th>
                                                <th>Phone</th>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </section>

                </div>
            </div>
        );
    }
}

export default User;