import React, { Component } from 'react'
import UserService from "../../service/UserService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from "../Navbar";

class ListClientComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null
        }

        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() {
        UserService.fetchUsers()
            .then((res) => {
                this.setState({users: res.data.result})
            });
    }

    deleteUser(userId) {
        UserService.deleteUser(userId)
           .then(res => {
               this.setState({message : 'Client record deleted successfully.'});
               this.setState({users: this.state.users.filter(user => user.id !== userId)});
           })
    }

    editUser(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/edit-client');
    }

    addUser() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-client');
    }

    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <Container>
                    <Typography variant="h4" style={style}>Client Details</Typography>
                    <Button variant="contained" color="primary" onClick={() => this.addUser()}>
                        Add Client
                    </Button>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Full Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Mobile</TableCell>
                                <TableCell align="right">Country</TableCell>
                                <TableCell align="right">Province</TableCell>
								<TableCell align="right">Notes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.users.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="right">{row.fullName}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.mobileNumber}</TableCell>
                                    <TableCell align="right">{row.country}</TableCell>
                                    <TableCell align="right">{row.province}</TableCell>
									<TableCell align="right">{row.notes}</TableCell>
                                    <TableCell align="right" onClick={() => this.editUser(row.id)}><CreateIcon /></TableCell>
                                    <TableCell align="right" onClick={() => this.deleteUser(row.id)}><DeleteIcon /></TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Container>
            </React.Fragment>
        );
    }

}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default ListClientComponent;