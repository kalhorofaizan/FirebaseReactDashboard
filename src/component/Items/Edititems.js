import React, {Component} from 'react';
import firebase from '../Firebase';
class Edititems extends Component {
    constructor(props){
        super(props);
        this.ref= firebase.firestore().collection('items').doc(this.props.id);
        this.state={
            name:'',
            brand:'',
            cost:'',
            detail:'',
            color:'',
            categories:'',
            image:'null',
            comments:[],
            imageset:false
        }
    }
    componentDidMount() {
        this.ref.get().then((doc)=>{
            if (doc.exists){
                const data=doc.data();
                this.setState({
                    name:data.name,
                    brand:data.brand,
                    cost:data.cost,
                    detail:data.detail,
                    color:data.color,
                    categories:data.categories,
                    image:data.image,
                    comments:data.comments
                })
            }
        })

    }
    makeid(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    submit(){
        const upload="";
        if (this.state.imageset) {
            this.imageName=this.makeid(18)+'.'+this.state.image.name.split('.').pop();
            this.upload=firebase.storage().ref(`itemImage/${this.imageName}`).put(this.state.image);
        }

        this.ref.set({
            name:this.state.name,
            brand:this.state.brand,
            cost:this.state.cost,
            detail:this.state.detail,
            color:this.state.color,
            categories:this.state.categories,
            image:this.state.imageset ? this.imageName : this.state.image ,
            comments:this.state.comments
        }).then((refdoc)=>{console.log('success1');
            if (this.state.imageset) {
               this.upload.on('state_changed',(succ)=>{
                        console.log("success")
                    }
                );
            }
            this.props.close();
        }).catch((err)=>{console.log(err)});
    }

    handleChange=(e)=>{
        if (e.target.files[0]){
            this.setState({
                image:e.target.files[0],
                imageset:true
            })
        }
    };
    render() {
        return (
            <div className="box box-primary">
                <div className="box-header with-border">
                    <h3 className="box-title">Edit  Item</h3>
                </div>

                <div>
                    <div className="box-body">
                        <div className="form-group">
                            <label>Name</label>
                            <input value={this.state.name} type="text" className="form-control" id="name" placeholder="Name" onChange={(e)=>{this.setState({name:e.target.value})}}/>
                        </div>
                        <div className="form-group">
                            <label >Brand</label>
                            <input value={this.state.brand}  type="text" className="form-control" id="brand" placeholder="Brand" onChange={(e)=>{this.setState({brand:e.target.value})}}/>
                        </div>
                        <div className="form-group">
                            <label>Categories</label>
                            <select value={this.state.categories}  className="form-control" id={'color'} onChange={(e)=>{this.setState({categories:e.target.value})}} >
                                <option>cloth</option>
                                <option>phone</option>
                                <option>computer</option>
                                <option>appliance</option>
                                <option>food</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Cost</label>
                            <input value={this.state.cost}  type="text" className="form-control" id="Cost" placeholder="Cost" onChange={(e)=>{this.setState({cost:e.target.value})}}/>
                        </div>
                        <div className="form-group">
                            <label >Detail</label>
                            <textarea value={this.state.detail}  className="form-control" id="detail" placeholder="Detail" onChange={(e)=>{this.setState({detail:e.target.value})}}/>
                        </div>
                        <div className="form-group">
                            <label>Color</label>
                            <select value={this.state.color}  className="form-control" id={'color'} onChange={(e)=>{this.setState({color:e.target.value})}} >
                                <option>Red</option>
                                <option>Green</option>
                                <option>Yellow</option>
                                <option>Blue</option>
                                <option>Orange</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label >File input</label>
                            <input type="file" id="exampleInputFile" onChange={this.handleChange}/>
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

export default Edititems;