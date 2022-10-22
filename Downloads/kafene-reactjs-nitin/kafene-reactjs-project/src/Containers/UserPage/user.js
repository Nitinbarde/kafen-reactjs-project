import React from 'react'
import classes from './user.module.css' 

class User extends React.Component{

    constructor(props){
        super(props);
        this.state={
            checkString: ''
        }
        this.searchRef = React.createRef();
    }

    search(e){
        if(e.keyCode === 13 && e.target.value.length>=2){
            console.log(e.target.value)
            this.setState({checkString: e.target.value})
        }
        else if(e.keyCode === 13 && e.target.value.length<2){
            alert('Please enter at least 2 characters')
            this.setState({checkString: ''})
        }
    }

    resetClick(){
        this.setState({checkString: ''})
        this.searchRef.current.value = ''
    }

    render(){
        let renderData = this.props.userData.map(item=>{
            let name = item.fullName.toLowerCase() 
            if(name.includes(this.state.checkString)){
                return (
                    <tr>
                        <td className={classes.lightGrey}>{item.id}</td>
                        <td ><img src={item.profilePic} alt='logo'/></td>
                        <td className={classes.lightGrey}>{item.fullName}</td>
                        <td>{item.dob}</td>
                        <td className={classes.lightGrey}>{item.gender}</td>
                        <td className={classes.lightGrey}>{item.currentCity}, {item.currentCountry}</td>
                    </tr> 
                )
            }
        })


        return(
            <main>
                <h1 className={classes.heading}>Users</h1>
                <div>
                    <input ref={this.searchRef} onKeyDown={(e)=>this.search(e)} className={classes.search} type='text' name='user-search-name' placeholder='Search by Name'/>
                    <input onClick={()=>this.resetClick()} className={classes.reset} type='submit' name='reset' value='Reset'/>
                </div>
                <section className={classes.mainSectionWrapper}>
                    <div className={classes.rightSectionWrapper}>
                        <table cellSpacing='0'>
                            <thead>
                                <tr className={classes.firstRow}>
                                    <th>ID</th>
                                    <th>User Avatar</th>
                                    <th>Full Name</th>
                                    <th>DoB</th>
                                    <th>Gender</th>
                                    <th>Current Location</th>
                                </tr>
                            </thead>
                            <tbody className={classes.userPage}> 
                                { renderData }
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        );
    }
};

export default User