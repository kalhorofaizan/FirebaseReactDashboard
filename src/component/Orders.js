import React, {Component} from 'react';
import firebase from './Firebase';
class Orders extends Component {
    constructor(props){
        super(props);
        this.ref=firebase.firestore().collection('orders');
        this.state={
            orders:[],
            showItems:false,
            items:[],
            orderby:'',
            orderid:''
        }
    }

    onCollectionUpdate=(querySnapShot)=>{
        const orders=[];
        querySnapShot.forEach((doc)=>{
            const {name,items,total,time,status}=doc.data();
            orders.push({
                key:doc.id,
                name,
                items,
                total,
                time,
                status
            });
        });
        this.setState({
            orders
        });
    };
    componentDidMount() {
        this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate);
    }

    sec2time(timeInSeconds) {
        var pad = function(num, size) { return ('000' + num).slice(size * -1); },
            time = parseFloat(timeInSeconds).toFixed(3),
            hours = Math.floor(time / 60 / 60),
            minutes = Math.floor(time / 60) % 60,
            seconds = Math.floor(time - minutes * 60);
        return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) ;
    }
sendItems(id){
        firebase.firestore().collection('orders').doc(id).update({
            status:'send'
        }).then((r)=>{
            console.log('succ');
            this.setState({
                showItems:false
            })
        }).catch((e)=>{
            console.log('err');
        })
}

    showitems=(items,orderby,orderid)=>{
        return(
            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">
                            <div className="box-header">
                                <h3 className="box-title">Items Data Table</h3>
                                <h4 className="box-title">{orderby}</h4>
                                <button className={'btn btn-success pull-right'} onClick={()=>{
                                    this.sendItems(orderid);
                                }} ><i
                                    className="fas fa-check-circle"></i> Send</button>
                            </div>

                            <div className="box-body">
                                <table id="example2" className="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>Item name</th>
                                        <th>price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {items.map((item)=>
                                        <tr  key={item.id} >
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                        </tr>
                                    )}
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Price</th>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>

                        </div>
                    </div>

                </div>

            </section>
        );
    };

    render() {
        return (
            <div>
                <div className="content-wrapper">

                    {this.state.showItems ? this.showitems(this.state.items,this.state.orderby,this.state.orderid): ''}

                    <section className="content-header">
                        <h1>
                            Data Tables
                        </h1>

                    </section>


                    <section className="content">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="box">
                                    <div className="box-header">
                                        <h3 className="box-title">Order Data Table</h3>
                                    </div>

                                    <div className="box-body">
                                        <table id="example2" className="table table-bordered table-hover">
                                            <thead>
                                            <tr>
                                                <th>Order By</th>
                                                <th>Items</th>
                                                <th>Total</th>
                                                <th>Time</th>
                                                <th>Status</th>
                                                <th>Show</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.orders.map((order)=>
                                                <tr key={order.key} >
                                                    <td>{order.name}</td>
                                                    <td>{order.items.length}
                                                    </td>
                                                    <td>{order.total}</td>
                                                    <td>{ this.sec2time(order.time.seconds) }</td>
                                                    {console.log(order.time)}
                                                    <td>{order.status}</td>
                                                    <td><button className={'btn btn-info'} onClick={()=>{this.setState({
                                                        showItems:true,
                                                        items:order.items,
                                                        orderby:order.name,
                                                        orderid:order.key
                                                    });
                                                    console.log(order.key);
                                                    }} ><i className={'fa fa-arrow-down'}  /></button></td>
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

export default Orders;