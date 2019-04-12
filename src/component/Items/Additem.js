import React, {Component} from 'react';
import firebase from '../Firebase';
class Additem extends Component {
    constructor(props){
        super(props);
       this.ref= firebase.firestore().collection('items');
        this.state={
            name:'',
            brand:'',
            cost:'',
            detail:'',
            color:'red',
            categories:'cloth',
            image:'null',
            setimage:false
        }
    }
    makeid(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    submit(){
        
        if (this.state.name===""){
            alert('fill name');
        }else if (this.state.brand===""){
            alert('fill brand');
        }else if (this.state.cost===""){
            alert('fill cost');
        }else if (this.state.detail===""){
            alert('fill detail');
        }else if (this.state.color===""){
            alert('fill color');
        }else if (this.state.categories===""){
            alert('fill category');
        }else if ( !this.state.setimage ){
            alert('fill image');
        }else {
            this.imageName=this.makeid(18)+'.'+this.state.image.name.split('.').pop();

            const upload=firebase.storage().ref(`itemImage/${this.imageName}`).put(this.state.image);
            this.ref.add({
                name:this.state.name,
                brand:this.state.brand,
                cost:this.state.cost,
                detail:this.state.detail,
                color:this.state.color,
                categories:this.state.categories,
                image:this.imageName,
                comments:[],
            }).then((refdoc)=>{console.log('success1');
                upload.on('state_changed',(succ)=>{
                        console.log("success")
                    }
                );
                this.props.close();
            }).catch((err)=>{console.log(err)});
        }

    }

    handleChange=(e)=>{
        if (e.target.files[0]){
            this.setState({
                image:e.target.files[0],
                setimage:true
            })
        }
    };
    render() {
        return (
            <div className="box box-primary">
                <div className="box-header with-border">
                    <h3 className="box-title">Add  Item</h3>
                </div>

                <div>
                    <div className="box-body">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Name" onChange={(e)=>{this.setState({name:e.target.value})}}/>
                        </div>
                        <div className="form-group">
                            <label >Brand</label>
                            <input type="text" className="form-control" id="brand" placeholder="Brand" onChange={(e)=>{this.setState({brand:e.target.value})}}/>
                        </div>
                        <div className="form-group">
                            <label>Categories</label>
                            <select  className="form-control" id={'color'} onChange={(e)=>{this.setState({categories:e.target.value})}} >
                                <option>cloth</option>
                                <option>phone</option>
                                <option>computer</option>
                                <option>appliance</option>
                                <option>food</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Cost</label>
                            <input type="text" className="form-control" id="Cost" placeholder="Cost" onChange={(e)=>{this.setState({cost:e.target.value})}}/>
                        </div>
                        <div className="form-group">
                            <label >Detail</label>
                            <textarea className="form-control" id="detail" placeholder="Detail" onChange={(e)=>{this.setState({detail:e.target.value})}}/>
                        </div>
                        <div className="form-group">
                            <label>Color</label>
                            <select className="form-control" id={'color'} onChange={(e)=>{this.setState({color:e.target.value})}} >
                                <option>Red</option>
                                <option>Green</option>
                                <option>Yellow</option>
                                <option>Blue</option>
                                <option>Orange</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label >File input</label>
                            <input  type="file" id="exampleInputFile" accept="image/*"  onChange={this.handleChange}/>
                        </div>

                    </div>
                    <div className="box-footer">
                        <button  className="btn btn-primary " onClick={()=>{this.submit()}} >Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Additem;