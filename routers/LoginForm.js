import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Buttom from './components/Button';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeMail = this.onChangeMail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onSubmit() {

    }

    onChangeMail(e) {
        const email = e.target.value
        this.setState({
            email
        });
    }

    onChangePassword(e) {
        const password = e.target.value
        this.setState({
            password
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <h1>Login</h1>
                </div>  {/* end row */}
                <div className="row justify-content-center">
                    <div className="form col-12">
                        <form>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.email}
                                    placeholder="e-mail"
                                    onChange={this.onChangeMail} />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.password}
                                    placeholder="mot de pass"
                                    onChange={this.onChangePassword} />
                            </div>
                        </form>
                    </div>  
                </div>  {/* end row */}
                <Buttom type="submit">
                    Submit
                </Buttom>
            </div>
        )
    }
}

export default LoginForm;