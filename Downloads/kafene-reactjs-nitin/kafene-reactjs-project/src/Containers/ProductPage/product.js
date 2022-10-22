import React from 'react'
import classes from './product.module.css' 

class Product extends React.Component{

    state={
        statusArray: ['isExpired', 'lowstock'],
        displayCount: 0
    }

    inputClick(e){
        let event = e.target
        if(event.checked == true){ 
            let newArr = [...this.state.statusArray]
            newArr.push(event.value)
            this.setState({statusArray: [...newArr], displayCount: 0})
        }
        else {
            let newArr = [...this.state.statusArray]
            for(let i=0; i<newArr.length; i++){
                if(newArr[i] == event.value){
                    newArr.splice(i,1)
                    break;
                }
            }
            this.setState({statusArray: [...newArr], displayCount: 0})
        }
    }

    redToProdPage(his, id){
        his.push(`/products/${id}`)
    }

    display(length, data){
        if(length === 2){
            return data.map(item=>{
                return ( 
                    <tr>
                        <td className={classes.lightGrey}>{item.id}</td>
                        <td onClick={()=>this.redToProdPage(this.props.his, item.id)}>{item.medicineName}</td>
                        <td className={classes.lightGrey}>{item.medicineBrand}</td>
                        <td>{item.expiryDate}</td>
                        <td className={classes.lightGrey}>${item.unitPrice}</td>
                        <td className={classes.lightGrey}>{item.stock}</td>
                    </tr>
                )
            })
        }
        else if(length === 1){
            if(this.state.statusArray[0] === 'lowstock'){
                return data.map(item=>{
                    if(item.isExpired!=true){
                        return ( 
                            <tr>
                                <td className={`${classes.lightGrey} ${classes.firstData}`}>{item.id}</td>
                                <td onClick={()=>this.redToProdPage(this.props.his, item.id)}>{item.medicineName}</td>
                                <td className={`${classes.lightGrey} ${classes.thirdData}`}>{item.medicineBrand}</td>
                                <td>{item.expiryDate}</td>
                                <td className={`${classes.lightGrey} ${classes.fiftData}`}>${item.unitPrice}</td>
                                <td className={classes.lightGrey}>{item.stock}</td>
                            </tr>
                        )
                    }
                })
            }
            else if(this.state.statusArray[0] === 'isExpired'){
                return data.map(item=>{
                    if(item.lowstock!=true){
                        return ( 
                            <tr>
                                <td className={classes.lightGrey}>{item.id}</td>
                                <td onClick={()=>this.redToProdPage(this.props.his, item.id)}>{item.medicineName}</td>
                                <td className={classes.lightGrey}>{item.medicineBrand}</td>
                                <td>{item.expiryDate}</td>
                                <td className={classes.lightGrey}>${item.unitPrice}</td>
                                <td className={classes.lightGrey}>{item.stock}</td>
                            </tr>
                        )
                    }
                })
            }
        }
        else if(length === 0){
            return data.map(item=>{
                if(item.lowstock!=true && item.isExpired!=true){
                    return ( 
                        <tr>
                            <td className={`${classes.lightGrey} ${classes.firstData}`}>{item.id}</td>
                            <td onClick={()=>this.redToProdPage(this.props.his, item.id)} className={classes.secondData}>{item.medicineName}</td>
                            <td className={`${classes.lightGrey} ${classes.thirdData}`}>{item.medicineBrand}</td>
                            <td>{item.expiryDate}</td>
                            <td className={`${classes.lightGrey} ${classes.fiftData}`}>${item.unitPrice}</td>
                            <td className={classes.lightGrey}>{item.stock}</td>
                        </tr>
                    )
                }
            })
        }
    }

    render(){
        let renderData = [<tr></tr>]
        if(this.props.productData!=undefined){
            renderData = this.display(this.state.statusArray.length, this.props.productData)
        }
        let upCount = renderData.filter(item=>{
            return item!=undefined
        })
        if(this.state.displayCount!=upCount.length){
            this.setState({displayCount: upCount.length})
        }
        return(
            <main>
                <h1 className={classes.heading}>Products</h1>
                <section className={classes.mainSectionWrapper}>
                    <div className={classes.leftSectionWrapper}>
                        <h2 className={classes.leftHeading}>Filters</h2>
                        <p className={classes.leftPara}>Count: <span>{this.state.displayCount}</span></p>
                        <label><input onClick={(e)=>this.inputClick(e)} className={classes.inputCheckBox} type='checkbox' defaultChecked name='order-category' value='isExpired'/>{"Expired"}</label>
                        <label><input onClick={(e)=>this.inputClick(e)} className={classes.inputCheckBox} type='checkbox' defaultChecked name='order-category' value='lowstock'/>{"Low Stock"}</label>
                    </div>
                    <div className={classes.rightSectionWrapper}>
                        <table cellSpacing='0'>
                            <thead>
                                <tr className={classes.firstRow}>
                                    <th>ID</th>
                                    <th>Product Name</th>
                                    <th>Product Brand</th>
                                    <th>Expiry Date</th>
                                    <th>Unit Price</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>
                            <tbody className={classes.productTbody}>
                                {renderData}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        );
    }
};

export default Product