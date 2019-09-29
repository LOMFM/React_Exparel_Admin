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
import Modal from '../components/modal';

export default class TopHOPDPayerPage extends Component {

    _service = new OutPatientService

    keys = ["Payer/PBM", "# of lives", "Status", "Action"]
    index = -1
    payers = {}
    constructor() {
        super()
        this.state = {
            livePercentLoading: false,
            getTopListLoading: false,
            data: [],
            isOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this)
        this.editData = this.editData.bind(this)

        this.payers = JSON.parse(localStorage.getItem('payers'))
        console.log(this.payers);
    }

    componentDidMount() {
        this.setState({ loading: true })
        this._service.getTopPayers('hopd')
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

    toggleModal() {
        this.index = -1
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    openEditor(index) {
        this.index = index;
        this.setState({
            isOpen: true
        })
    }

    editData(data) {
        if( this.index == -1 ){
            this.state.data.push(data)
        }
        else {
            this.state.data[this.index] = data
        }
        this.setState({
            isOpen: false
        })
    }

    

    render() {
        return (
            <>
                <Grid container spacing={4} >
                    <Grid item xs={12}>
                        <Button onClick={this.toggleModal} variant="contained" size="small" color="primary">Save</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Widget title="Top Ten Commercial Payer HOPD Coverage" upperTitle noBodyPadding>
                            <Table className="mb-0">
                                <TableHead>
                                    <TableRow>
                                        {this.keys.map(key => (
                                            <TableCell key={key}>{key}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state && this.state.data && this.state.data.length ? (this.state.data.map((data, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="pl-3 fw-normal">{data.payer ? data.payer.name : ''}</TableCell>
                                            <TableCell>{data.lives}</TableCell>
                                            <TableCell>{data.status} %</TableCell>
                                            <TableCell>
                                                <Button onClick={() => this.openEditor(index)} variant="contained" color="primary" size="small">Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))) : (<TableRow >
                                        <TableCell colSpan="4" style={centerStyle}>There is no Data</TableCell>
                                    </TableRow>)}
                                </TableBody>
                            </Table>
                        </Widget>
                    </Grid>
                </Grid>
                { this.state.isOpen ? (<Modal show={this.state.isOpen} onClose={this.toggleModal} class={'small'} title={ this.index !== -1 ? "Edit Top Payer" : "New Top Payer" }>
                    <TopPayerForm data={ this.index !== -1 ? this.state.data[this.index]: { coalition:'', lives: 0, status: 0, order: 1}} id={this.index !== -1 ? this.state.data[this.index]['_id']: null} submit={(data) => this.editData(data)} type={'hopd'} edit={this.index >= 0 ? true : false}></TopPayerForm>
                </Modal> ) : ''}
            </>
        )
    }
}


const centerStyle = {
    textAlign: "center",
    fontSize: "20px"
}