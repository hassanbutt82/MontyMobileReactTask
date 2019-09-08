import React, { Component, Fragment } from 'react'
import UserService from "../../service/UserService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from "../Navbar";

class AddClientComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            fullName: '',
            mobileNumber: '',
            email: '',
            province: '',
            country: '',
            notes: '',
            message: null
        }
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {fullName: this.state.fullName, mobileNumber: this.state.mobileNumber, email: this.state.email, province: this.state.province, country: this.state.country, notes: this.state.notes};
        UserService.addUser(user)
            .then(res => {
                this.setState({message : 'Client added successfully.'});
                this.props.history.push('/list-client');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <Fragment>
                <NavBar/>
                <Container>
                    <Typography variant="h4" style={style}>Add Client Record</Typography>
                    <form style={formContainer}>

                        <TextField label="Full Name" fullWidth margin="normal" name="fullName" value={this.state.fullName} onChange={this.onChange}/>

                        <TextField label="Mobile Number" type="number" pattern="[0-9]*" inputmode="numeric" fullWidth margin="normal" name="mobileNumber" value={this.state.mobileNumber} onChange={this.onChange}/>

                        <TextField label="Email" fullWidth margin="normal" name="email" value={this.state.email} onChange={this.onChange}/>

                        <TextField label="Province" fullWidth margin="normal" name="province" value={this.state.province} onChange={this.onChange}/>

                        <TextField label="country" fullWidth margin="normal" name="country" value={this.state.country} onChange={this.onChange}/>

                        <TextField label="Notes" fullWidth margin="normal" name="notes" value={this.state.notes} onChange={this.onChange}/>

                        <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>
                    </form>
                </Container>
            </Fragment>
        );
    }
}
const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style ={
    display: 'flex',
    justifyContent: 'center'

}

export default AddClientComponent;