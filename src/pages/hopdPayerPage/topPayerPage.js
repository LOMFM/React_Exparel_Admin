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
    topPayers = {}
    dataToEdit = {}
    editFlag = false
    constructor() {
        super()
        this.state = {
            getTopListLoading: false,
            isOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this)
        this.editData = this.editData.bind(this)

        this.payers = JSON.parse(localStorage.getItem('payers'))
    }

    componentDidMount() {
        this.setState({ loading: true })
        this._service.getTopPayers('hopd')
            .then(res => {
                res.data.forEach( e => {
                    this.topPayers[e.order] = e;
                })
                this.setState({ loading: false })
            })
            .catch(err => {
                if (err) {
                    this.setState({ loading: false })
                }
            })
        
    }

    toggleModal() {
        this.dataToEdit = {}
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    openEditor(data) {
        this.dataToEdit = data
        this.editFlag = true
        this.setState({
            isOpen: true
        })
    }

    openRegister(order){
        this.dataToEdit = {
            order: order
        }
        this.editFlag = false
        this.setState({
            isOpen: true
        })
    }

    editData(data) {
        this.topPayers[data.order] = data;
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
                        <Widget title="Top Ten Commercial Payer ASC Coverage" upperTitle noBodyPadding>
                            <Table className="mb-0">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No</TableCell>
                                        {this.keys.map(key => (
                                            <TableCell key={key}>{key}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data, index) => (
                                        this.topPayers[data] ? (
                                            <TableRow key={index}>
                                                <TableCell className="text-center">{index + 1}</TableCell>
                                                <TableCell className="pl-3 fw-normal">{this.topPayers[data].payer ? this.topPayers[data].payer.name : ''}</TableCell>
                                                <TableCell>{this.topPayers[data].lives}</TableCell>
                                                <TableCell>{this.topPayers[data].status} %</TableCell>
                                                <TableCell>
                                                    <Button onClick={() => this.openEditor(this.topPayers[data])} variant="contained" color="primary" size="small">Edit</Button>
                                                </TableCell>
                                            </TableRow>
                                        ) : 
                                        (
                                            <TableRow key={index}>
                                                <TableCell className="text-center">{index + 1}</TableCell>
                                                <TableCell className="pl-3 fw-normal"></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell>
                                                    <Button onClick={() => this.openRegister(data)} variant="contained" color="primary" size="small">Register</Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    ))}
                                </TableBody>
                            </Table>
                        </Widget>
                    </Grid>
                </Grid>
                { this.state.isOpen ? (<Modal show={this.state.isOpen} onClose={this.toggleModal} class={'small'} title={ this.index !== -1 ? "Edit Top Payer" : "New Top Payer" }>
                    <TopPayerForm data={ this.dataToEdit } submit={(data) => this.editData(data)} type={'hopd'} edit={this.editFlag}></TopPayerForm>
                </Modal> ) : ''}
            </>
        )
    }
}


const centerStyle = {
    textAlign: "center",
    fontSize: "20px"
}