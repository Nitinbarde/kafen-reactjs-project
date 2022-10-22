import React from 'react'
import classes from './orderDetails.module.css'
import { connect } from 'react-redux'

class orderDetail extends React.Component{
    render(){
        let resultDiv = <div></div>
        if(this.props.orderData!=undefined){
            resultDiv = this.props.orderData.map(item=>{
                if(this.props.prop!=undefined){
                    if(this.props.prop.match.params.id == item.id){
                        console.log(item)
                        return (
                            <div className={classes.boxDiv}>
                                <h1>Order</h1>
                                <div className={classes.flexDiv}><h4>OrderId: </h4><p>{item.id}</p></div>
                                <div className={classes.flexDiv}><h4>Customer Name: </h4><p>{item.customerName}</p></div>
                                <div className={classes.flexDiv}><h4>Date Of Order: </h4><p>{item.orderDate}</p></div>
                                <div className={classes.flexDiv}><h4>Amount: </h4><p>{item.amount}</p></div>
                                <div className={classes.flexDiv}><h4>Status: </h4><p>{item.orderStatus}</p></div>
                            </div>
                        )
                    }
                }
            })
        }

        return(
            <div className={classes.mainWrapper}>
                {/* <div className={classes.boxDiv}>
                    <h1>Order</h1>
                    <div className={classes.flexDiv}><h4>OrderId: </h4><p>1241421</p></div>
                    <div className={classes.flexDiv}><h4>Customer Name: </h4><p>1241421</p></div>
                    <div className={classes.flexDiv}><h4>Date Of Order: </h4><p>1241421</p></div>
                    <div className={classes.flexDiv}><h4>Amount: </h4><p>1241421</p></div>
                    <div className={classes.flexDiv}><h4>Status: </h4><p>1241421</p></div>
                </div> */}
                {resultDiv}
            </div>
        )
    }
}
const getProjectData = (globalStore)=>{
    return{
        orderData: globalStore.mainReducer.orderPage,
    }
  }
  
export default connect(getProjectData)(orderDetail);