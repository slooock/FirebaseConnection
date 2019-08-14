import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';


const SignUpPage = () => (
    <div>
        <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { INITIAL_STATE };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => {
        const { email, password } = this.state;
        event.preventDefault();
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push("/signin");
            })
            .catch(error => {
                this.setState({ error });
            }); 
    };

    render() {
        const {
            email,
            password,
        } = this.state;
        const isInvalid =
            password === '' ||
            email === '';

        return (
            <div className="Login text-center bd-placeholder-img">
                <form className="form-signin" onSubmit={this.onSubmit}>
                    <img className="mb-4" src="https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"></img>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input name="email" onChange={this.onChange} type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input name="password" onChange={this.onChange} type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                    <button disabled={isInvalid} className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
                </form>
            </div>
        );
    }
}
const SignUpForm = withRouter(withFirebase(SignUp));
export default SignUpPage;

export { SignUpForm};