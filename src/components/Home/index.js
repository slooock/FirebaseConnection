import React from 'react';
import './Home.css';

import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';


const HomePage = () => (
    <div>
        <HomeForm />
    </div>
);

const INITIAL_STATE = {
    name: '',
    email: '',
    phone: '',
    error: null,
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { INITIAL_STATE };
        this.props.firebase.arroz()
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => {
        const { name,email, phone} = this.state;
        event.preventDefault();
        this.props.firebase
            .registerEmployee(name,email,phone)
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
            name,
            phone,
        } = this.state;
        const isInvalid =
            name === '' ||
            email === '' ||
            phone === '';
        return (
            <div className="container">
                <div className="col-md-6 mx-auto text-center">
                    <div className="header-title">
                        <h1 className="wv-heading--title">
                            Cadastro
            </h1>
                        <h2 className="wv-heading--subtitle">
                            Adicione um novo funcionário
            </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <div className="myform form ">
                            <form className="form-signin" onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" onChange={this.onChange} name="name" className="form-control my-input" id="name" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <input type="email" onChange={this.onChange} name="email" className="form-control my-input" id="email" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <input type="number" min="0" onChange={this.onChange} name="phone" id="phone" className="form-control my-input" placeholder="Phone" />
                                </div>
                                
                                    <button disabled={isInvalid} className="btn btn-lg btn-primary btn-block" type="submit">Cadastrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const HomeForm = withRouter(withFirebase(Home));

export default HomePage;
export { HomeForm };