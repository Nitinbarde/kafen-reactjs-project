import React from 'react'
import classes from './hoc.module.css'

const hoc = (props)=>{
    return(
        props.order!=undefined && props.product!=undefined && props.user!=undefined?
        props.children
        :
        <div className={classes.hocDiv}>
            <p>Loading Data... </p>
        </div>
    )
}

export default hoc