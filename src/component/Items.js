import React, {Component} from 'react';
import firebase from './Firebase';
import Additem from "./Items/Additem";
import Edititems from "./Items/Edititems";
class Items extends Component {

constructor(props){
    super(props);
    this.ref=firebase.firestore().collection('items');
    this.unsubscribe=null;
    this.state={
        items:[],
        additems:false,
        id:'',
        edititems:false
    }
}

onCollectionUpdate=(querySnapShot)=>{
const items=[];
    querySnapShot.forEach((doc)=>{
        const {brand,categories,name,cost}=doc.data();
        items.push({
            key:doc.id,
            brand,
            cost,
            categories,
            name
        });
    });
    this.setState({
        items
    });
    console.log(this.state.items);
};

componentDidMount() {
    this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate);
}
closeform=()=>{
    this.setState({
        additems:false,
        id:'',
        edititems:false
    })
};
deleteItem(id){
    firebase.firestore().collection('items').doc(id).delete().then(()=>{
        console.log('success');
        this.componentDidMount();
    })
}
    render() {
        return (
            <div>
                <div className="content-wrapper">
                    { this.state.additems ? <Additem  close={this.closeform}/> :''}
                    { this.state.edititems ? <Edititems id={this.state.id}  close={this.closeform}/> :''}
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
                                        <h3 className="box-title">Items Data Table</h3>
                                        <button onClick={()=>this.setState({ additems:true,
                                            id:'',
                                            edititems:false})} className={'btn btn-success pull-right'} ><i className={'fa fa-add'}/> Add Item</button>
                                    </div>

                                    <div className="box-body">
                                        <table id="example2" className="table table-bordered table-hover">
                                            <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Brand</th>
                                                <th>Categories</th>
                                                <th>Price</th>
                                                <th>delete</th>
                                                <th>Edit</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.items.map(item=>
                                                <tr key={item.key}  >
                                                    <td>{item.name}</td>
                                                    <td>{item.brand}
                                                    </td>
                                                    <td>{item.categories}</td>
                                                    <td>{item.cost}</td>
                                                    <td> <button className={'btn btn-danger'} onClick={()=>{
                                                        this.deleteItem(item.key);
                                                    }} >
                                                        <i className={'fa fa-trash'}  />
                                                    </button></td>
                                                    <td><button className={'btn btn-success'} onClick={()=>{this.setState({
                                                        id:item.key,
                                                        additems:false,
                                                        edititems:true
                                                    })}}>
                                                        <i className={'fa fa-edit'} />
                                                    </button></td>
                                                </tr>
                                            )}
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <th>Rendering engine</th>
                                                <th>Browser</th>
                                                <th>Platform(s)</th>
                                                <th>Engine version</th>
                                                <th>CSS grade</th>
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

export default Items;