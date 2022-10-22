import React from 'react';
import classes from './login.module.css';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.loginRef = React.createRef()
        this.submitButtonRef = React.createRef()
        this.titleRef = React.createRef();
        this.formRef = React.createRef();
    }

    formSubmit(e){
        e.preventDefault();
        const event = e.target
        if(event.submit.value == 'Login'){
            let localName = window.localStorage.getItem('KafeneUserName')
            let localPass = window.localStorage.getItem('KafenefinalPassword')
            if(event.username.value == localName && event.password.value==localPass){
                alert('Login Successful')
                window.localStorage.setItem('KafeneLogout', false)
                this.props.props.history.push('/orders')
            }
            else {
                alert('Please enter valid credentials!')
            }
        }
        else {
            if(event.username.value === event.password.value){
                window.localStorage.setItem('KafeneUserName', event.username.value)
                window.localStorage.setItem('KafenefinalPassword', event.password.value)
                alert('Please Remember Your Credentials')
                window.localStorage.setItem('KafeneLogout', false)
                this.props.props.history.push('/orders')
            }
            else {
                alert('Please enter same username and password (Case Sensitive)')
            }
            
        }
    }

    changeForm(){
        if(this.loginRef.current.innerText == 'Sign Up ?.'){
            this.titleRef.current.innerText = 'Sign Up'
            this.loginRef.current.innerText = 'Login .'
            console.log(this.submitButtonRef.current)
            this.submitButtonRef.current.value = 'Sign Up'
        }
        else {
            this.titleRef.current.innerText = 'Sign In'
            this.loginRef.current.innerText = 'Sign Up ?.'
            this.submitButtonRef.current.value = 'Login'
        }
    }

    render(){
        if(window.localStorage.getItem('KafeneUserName')!=undefined && window.localStorage.getItem('KafeneLogout') == false){
            this.props.props.history.push('/orders')
        }

        return (
            <main>
                <div className={classes.mainWrapper}>
                    <form onSubmit={(e)=>this.formSubmit(e)} ref={this.formRef} className={classes.form}>
                        <h1 ref={this.titleRef} className={classes.formTitle}>Sign Up</h1>
                        <input className={classes.inputField} type='text' name='username' placeholder='Enter Username' required/>
                        <input className={classes.inputField} type='password' name='password' placeholder='Enter Password' required/>
                        <span ref={this.loginRef} onClick={()=>this.changeForm()} className={classes.signup}>Login .</span>
                        <input ref={this.submitButtonRef} className={classes.loginButton} type='submit' name='submit' value='Sign Up'/>
                    </form>
                </div>
            </main>
        )
    }
}

export default Login