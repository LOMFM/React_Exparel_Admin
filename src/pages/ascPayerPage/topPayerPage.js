import React, { Component } from 'react';
import { Grid, Button } from "@material-ui/core";
import Widget from "../../components/Widget";
import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@material-ui/core";
import OutPatientService from '../../_services/outPatient.service';
import TopPayerForm from '../forms/topPayerForm';

export default class TopASCPayerPage extends Component {

    _service = new OutPatientService

    keys = ["Payer/PBM", "# of lives", "Status", "Action"]

    constructor() {
        super()
        this.setState({
            ascPayerLoading: false,
            ascPercentLoading: false,
            livePercentLoading: false,
            getTopListLoading: false,
            data : []
        })
    }

    componentDidMount() {
        this.setState({ loading: true })
        this._service.getTopPayers('asc')
            .then(res => {
                this.state.data = res.data;
                this.setState({ loading: false })
            })
            .catch(err => {
                if (err) {
                    this.setState({ loading: false })
                }
            })
    }

    render() {
        return (
            <>
                <Grid container spacing={4} >
                    <Grid item xs={12}> 
                    {/* <Button onClick={this.formSubmit} className="mb-2" variant="contained" color="primary" size="small">Add Top</Button> */}
                    <TopPayerForm></TopPayerForm>
                    <br></br>
                    <Widget title="Top Ten Commercial Payer ASC Coverage" upperTitle noBodyPadding>
                        <Table className="mb-0">
                            <TableHead>
                                <TableRow>
                                    {this.keys.map(key => (
                                        <TableCell key={key}>{key}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state && this.state.data && this.state.data.length ? (this.state.data.map(({ _id, coalition, lives, status }, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="pl-3 fw-normal">{coalition}</TableCell>
                                        <TableCell>{lives}</TableCell>
                                        <TableCell>{status}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                ))) : (<TableRow >
                                    <TableCell colspan="4" style={centerStyle}>There is no Data</TableCell>
                                    </TableRow>) }
                            </TableBody>
                        </Table>
                    </Widget>
                    </Grid>
                </Grid>
                
            </>
        )
    }
}


const centerStyle = {
    textAlign: "center",
    fontSize: "20px"
}