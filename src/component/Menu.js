import React, {Component} from 'react';

class Menu extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                <aside className="main-sidebar">

                    <section className="sidebar">

                        <ul className="sidebar-menu" data-widget="tree">
                            <li className="header">MAIN NAVIGATION</li>
                            <li className="active treeview menu-open">
                                <a onClick={this.props.changePaged} style={{cursor:'pointer'}} >
                                    <i className="fa fa-dashboard"></i> <span>Dashboard</span>
                                </a>
                            </li>

                            <li  >
                                    <a  onClick={this.props.changePage1}  style={{cursor:'pointer'}} >
                                        <i className="fa fa-users"></i> <span>User</span>
                                        <span className="pull-right-container">

                                    </span>
                                    </a>

                            </li>
                            <li>
                                <a  onClick={this.props.changePage2} style={{cursor:'pointer'}} >
                                    <i   className="fa fa-list"></i> <span>Items</span>
                                    <span className="pull-right-container">
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a  onClick={this.props.changePage3} style={{cursor:'pointer'}} >
                                    <i   className="fa fa-shopping-basket"></i> <span>Orders</span>
                                    <span className="pull-right-container">

                                    </span>
                                </a>
                            </li>
                        </ul>
                    </section>

                </aside>
            </div>
        );
    }
}

export default Menu;