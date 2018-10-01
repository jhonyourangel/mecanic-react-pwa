import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import css from './Auth.module.css'

import Button from '../../../components/Button/Button';
import * as actions from '../../../store/actions';

class Auth extends Component {
    state = {
        email: '',
        password: '',
        error: null,
        disableButtons: false
    }

    componentDidMount() {
        if (this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = e => this.setState({[e.target.name]: e.target.value})

    submitHandler = e => { 
        console.log(e.target.name === '')
        // e.target.name is routing the the call to login or register new user
        this.props.onAuth( 
            this.state.email, 
            this.state.password, 
            e.target.name === 'login');
        this.setState({disableButtons: true})
    }

    render () {

        let errorMessage = null;
        console.log(this.props.error);
        
        if (this.props.error) {
            this.setState({disableButtons: false})
            errorMessage = (<p>{this.props.error.message}</p>)
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={css.Auth}>
                {authRedirect}
                {errorMessage}
                <form>
                    <fieldset>
                        <label className={css.Label} htmlFor="email">Introdu Adresssa de email</label>
                        <input className={[css.InputElement].join(' ')} 
                            autoComplete="current-email" 
                            type="email" 
                            name="email" 
                            placeholder="demo@gmail.com" 
                            onChange={e => this.inputChangedHandler(e)} 
                            value={this.state.email} />
                    </fieldset>
                    <fieldset>
                        <label className={css.Label} htmlFor="password">Introdu Parola</label>
                        <input className={[css.InputElement].join(' ')} 
                            autoComplete="current-password" 
                            type="password" 
                            name="password" 
                            onChange={e => this.inputChangedHandler(e)} 
                            value={this.state.password} />                
                    </fieldset>
                </form>
                <Button 
                    disabled={this.state.disableButtons}
                    className={css.Login}
                    name="login"
                    btnType="SuccessRoundBorder" onClick={e => this.submitHandler(e)}>SIGIN</Button>
                <Button 
                    disabled={this.state.disableButtons}
                    name={null}
                    className={css.Login}
                    btnType="SuccessRound" onClick={e => this.submitHandler(e)}>SIGNUP</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );