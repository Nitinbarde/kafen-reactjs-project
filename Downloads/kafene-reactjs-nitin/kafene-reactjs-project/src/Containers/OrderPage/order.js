import React from 'react'
import classes from './order.module.css' 
import { logger } from '../../Utils/CommonMethods/logger' 

class Order extends React.Component{

    state = {
        statusArray: ['new', 'packed', 'intransit', 'delivered'],
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
    
    redOrdDetPage(his,id){
        his.push(`/orders/${id}`)
    }

    render(){
        let renderData = [<tr></tr>]
        if(this.props.orderData !=undefined){
            renderData = this.props.orderData.map(item=>{
                let arr = [...this.state.statusArray]
                if(arr.includes(item.orderStatus.toLowerCase())){
                    return (
                        <tr>
                            <td className={classes.lightGrey}>{item.id}</td>
                            <td onClick={()=>this.redOrdDetPage(this.props.his, item.id)} >{item.customerName}</td>
                            <td>{item.orderDate}<br /><span className={classes.lightGrey}>{item.orderTime}</span></td>
                            <td className={classes.lightGrey}>${item.amount}</td>
                            <td>{item.orderStatus}</td>
                        </tr> 
                    )
                }
            })
        }
        let upCount = renderData.filter(item=>{
            return item!=undefined
        })
            
        if(this.state.displayCount!=upCount.length){
            console.log('yes')
            this.setState({displayCount: upCount.length})
        }

        return(
            <main>
                <h1 className={classes.heading}>Orders</h1>
                <section className={classes.mainSectionWrapper}>
                    <div className={classes.leftSectionWrapper}>
                        <h2 className={classes.leftHeading}>Filters</h2>
                        <p className={classes.leftPara}>Count: <span className={classes.count}>{this.state.displayCount}</span></p>
                        <label><input onClick={(e)=>this.inputClick(e)} className={classes.inputCheckBox} type='checkbox' defaultChecked name='order-category' value='new'/>{"New"}</label>
                        <label><input onClick={(e)=>this.inputClick(e)} className={classes.inputCheckBox} type='checkbox' defaultChecked name='order-category' value='packed'/>{"Packed"}</label>
                        <label><input onClick={(e)=>this.inputClick(e)} className={classes.inputCheckBox} type='checkbox' defaultChecked name='order-category' value='intransit'/>{"InTransit"}</label>
                        <label><input onClick={(e)=>this.inputClick(e)} className={classes.inputCheckBox} type='checkbox' defaultChecked name='order-category' value='delivered'/>{"Delivered"}</label>
                    </div>
                    <div className={classes.rightSectionWrapper}>
                        <table cellSpacing='0'>
                            <thead>
                                <tr className={classes.firstRow}>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                { renderData }
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        );
    }
};

export default Order






























    // $('input').click((e)=>{
    //     let event = e.target;
        
    //     if(event.checked == true){ 
    //         let localCount = 0;
    //         statusArray.push(event.value) 
    //         tableBody.get(0).innerHTML = ''
    //         dataFromBackened.map(item=>{
    //             if(statusArray.includes(item.orderStatus.toLowerCase())){
    //                 tableBody.append(createRow(item))
    //                 localCount++
    //             }
    //         })
    //         count.text(localCount)
    //     }
    //     else {
    //         let localCount = 0;
    //         for(let i=0; i<statusArray.length; i++){ 
    //             if(event.value == statusArray[i]){ statusArray.splice(i,1) } 
    //         }
    //         tableBody.get(0).innerHTML = ''
    //         dataFromBackened.map(item=>{
    //             if(statusArray.includes(item.orderStatus.toLowerCase())){
    //                 tableBody.append(createRow(item))
    //                 localCount++
    //             }
    //         })
    //         count.text(localCount)
    //     }
    // })
