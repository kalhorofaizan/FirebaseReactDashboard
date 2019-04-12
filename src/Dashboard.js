import React, {Component} from 'react';
import Header from "./component/Header";
import Menu from "./component/Menu";
import Dashbord from "./component/dashbord";
import User from "./component/User";
import Items from "./component/Items";
import Orders from "./component/Orders";
import Footer from "./component/footer";
import firebase from "./component/Firebase";

class Dashboard extends Component {
    constructor(props){
        super(props);
        firebase.auth().onAuthStateChanged((user)=>{
            if (!user){
                this.props.history.push('/');
                console.log(user)
            }
            console.log(user)
        });
        this.changePage1 = this.changePage1.bind(this);
        this.changePage2 = this.changePage2.bind(this);
        this.changePage3 = this.changePage3.bind(this);
        this.changePaged = this.changePaged.bind(this);
        this.state={
            page1:true,
            page2:false,
            page3:false,
            page4:false
        }

    }
    changePage1(){
        this.setState({
            page1:false,
            page2:true,
            page3:false,
            page4:false
        })
    }
    changePage2(){
        this.setState({
            page1:false,
            page2:false,
            page3:true,
            page4:false
        })
    }
    changePaged(){
        this.setState({
            page1:true,
            page2:false,
            page3:false,
            page4:false
        })
    }
    changePage3(){
        this.setState({
            page1:false,
            page2:false,
            page3:false,
            page4:true
        })
    }
    render() {
        return (
            <div>
                <Header   />
                <Menu changePage1={this.changePage1}  changePage2={this.changePage2} changePage3={this.changePage3}   changePaged={this.changePaged}    />
                {this.state.page1 ? <Dashbord/>: ""}
                {this.state.page2 ? <User/>: ""}
                {this.state.page3 ? <Items/>: ""}
                {this.state.page4 ? <Orders/>: ""}
                <Footer/>
            </div>
        );
    }
}

export default Dashboard;