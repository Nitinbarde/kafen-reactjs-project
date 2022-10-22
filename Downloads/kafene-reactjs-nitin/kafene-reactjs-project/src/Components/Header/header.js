import React from 'react';
import classes from './header.module.css'
import { Link } from 'react-router-dom'

class header extends React.Component{
    state={
        active: 'orders'
    }

    changeActive(value){
        this.setState({active: value})
    }

    logoutClick(props){
        window.localStorage.setItem('KafeneLogout', true)
        props.history.push('/')
    }   

    render(){
        return(
            <header>
                <div className={classes.mainWrapper}> 
                    <div className={classes.leftWrapper}>
                        <div className={classes.companyLogoWrapper}>
                            <img className={classes.logo} src='https://edu-web-fundamentals.web.app/static/media/logo.58169365.png' alt='Kafene'/>
                            <p className={classes.websiteName}>Kafene</p>
                        </div>
                        <div className={classes.menuItemsWrapper}>
                            <Link to={this.props.props.location.pathname=='/'?'/':'/orders'} onClick={()=>this.changeActive("orders")}><span className={`${classes.menuItem} ${this.state.active==='orders'?classes.highlight:null}`}>Orders</span></Link>
                            <Link to={this.props.props.location.pathname=='/'?'/':'/products'} onClick={()=>this.changeActive("products")}><span className={`${classes.menuItem} ${this.state.active==='products'?classes.highlight:null}`}>Products</span></Link>
                            <Link to={this.props.props.location.pathname=='/'?'/':'/users'} onClick={()=>this.changeActive("users")}><span className={`${classes.menuItem} ${this.state.active==='users'?classes.highlight:null}`}>Users</span></Link>
                        </div>
                    </div>
                    {
                        this.props.props.location.pathname === '/'?
                        <p></p>
                        :
                        <p onClick={()=>this.logoutClick(this.props.props)} className={classes.logout}>Logout</p>
                    }
                </div>
            </header>
        );
    }
};

export default header