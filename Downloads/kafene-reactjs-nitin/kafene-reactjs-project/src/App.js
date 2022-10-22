import React from 'react';
// import Axios from 'axios'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import classes from './App.module.css'

import HOC from './Components/HOC/hoc'
import Header from './Components/Header/header'
import Order from './Containers/OrderPage/order'
import Product from './Containers/ProductPage/product'
import User from './Containers/UserPage/user'
import Login from './Containers/LoginPage/login'

import OrderDetail from './Containers/DetailsPage/OrderDetailPage/orderDetails'
import ProductDetail from './Containers/DetailsPage/ProductDetailsPage/productDetail' 

import { getData, getProductData} from './Utils/CommonMethods/mockApi'
import { logger } from './Utils/CommonMethods/logger';

class App extends React.Component{

  state={
    active: false,
    loginStatus: false
  }

  checkLoginStatus(){
    if(window.localStorage.getItem('KafeneUserName')!=undefined && window.localStorage.getItem('KafeneLogout')){
      return true
    } 
    else return false
  }


  componentDidMount(){
    getData("orders").then(response=>{
      this.props.updateOrderData(response)
    }).catch(error=>{
      logger(error)
    })

    getProductData().then(response=>{
      this.props.updateProductData(response)
      logger(response)
    }).catch(error=>{
      logger(error)
    })

    getData("users").then(response=>{
      this.props.updateUserData(response)
    }).catch(error=>{
      logger(error)
    })
  }

  render(){
    return (
      <HOC order= {this.props.orderData} product= {this.props.productData} user= {this.props.userData} > 
        <div>
          <BrowserRouter >
            <Route path='/' render={(renProps)=>{
              return( <Header props={renProps}/> )
            }}/>
              <Switch>
                <Route exact path="/" render={(renProps)=>{
                  console.log(window.localStorage.getItem('KafeneUserName'), window.localStorage.getItem('KafeneLogout'))
                  return (
                    window.localStorage.getItem('KafeneUserName')!=undefined && window.localStorage.getItem('KafeneLogout') == 'false'?<Redirect to='/orders'/>: <Login props={renProps}/>
                  )
                }} />
                <Route exact path="/orders" render={(renProps)=>{
                  return( <Order orderData={this.props.orderData} his={renProps.history}/> )
                }} />
                <Route exact path="/orders/:id" render={(renProps)=>{
                  return( <OrderDetail prop={renProps}/> )
                }} />
                <Route exact path="/products" render={(renProps)=>{
                  return( <Product productData={this.props.productData} his={renProps.history}/> )
                }} />
                <Route exact path="/products/:id" render={(renProps)=>{
                  return( <ProductDetail prop={renProps}/> )
                }} />
                <Route exact path="/users" render={(renProps)=>{
                  return( <User userData={this.props.userData}/> )
                }} />
              </Switch>
          </BrowserRouter>
        </div>
      </HOC>

    );
  }
};

const makeDispatches = (dispatch)=>{
  return{
      updateOrderData : (e)=> {
         return dispatch({type: "order-data", data: e})
      },
      updateProductData : (e)=> {
        return dispatch({type: "product-data", data: e})
      },
      updateUserData : (e)=> {
        return dispatch({type: "user-data", data: e})
      }
  }
}

const getProjectData = (globalStore)=>{
  return{
      orderData: globalStore.mainReducer.orderPage,
      productData: globalStore.mainReducer.productPage,
      userData: globalStore.mainReducer.userPage
  }
}

export default connect(getProjectData,makeDispatches)(App);

