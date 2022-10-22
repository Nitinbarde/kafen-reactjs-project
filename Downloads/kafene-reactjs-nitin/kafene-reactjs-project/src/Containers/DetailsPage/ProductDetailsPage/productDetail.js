import React from 'react'
import classes from './productDetails.module.css'
import  { connect } from 'react-redux'

class ProductDetail extends React.Component{

    state = {
        item: undefined
    }

    render(){
        let resultDiv = <div></div>
        if(this.props.productData!=undefined){
            resultDiv = this.props.productData.map(item=>{
                if(this.props.prop!=undefined){
                    if(this.props.prop.match.params.id == item.id){
                        return (
                            <div className={classes.boxDiv}>
                                <h1>Product</h1>
                                <div className={classes.flexDiv}><h4>ProductId: </h4><p>{item.id}</p></div>
                                <div className={classes.flexDiv}><h4>Product Name: </h4><p>{item.medicineName}</p></div>
                                <div className={classes.flexDiv}><h4>Product Brand: </h4><p>{item.medicineBrand}</p></div>
                                <div className={classes.flexDiv}><h4>Expiry Date: </h4><p>{item.expiryDate}</p></div>
                                <div className={classes.flexDiv}><h4>Unit Price: </h4><p>{item.unitPrice}</p></div>
                                <div className={classes.flexDiv}><h4>Stock: </h4><p>{item.stock}</p></div>
                            </div> 
                        )
                    }
                }
            })
        }

        return(
            <div className={classes.mainWrapper}>
                {resultDiv}
            </div>
        )
    }
}


const getProjectData = (globalStore)=>{
    return{
        productData: globalStore.mainReducer.productPage,
    }
  }
  
export default connect(getProjectData)(ProductDetail);