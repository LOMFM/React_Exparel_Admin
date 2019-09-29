import React, { Component } from 'react';
import { Grid, Button } from "@material-ui/core";
import Widget from "../../components/Widget/Widget";
import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@material-ui/core";
import OutPatientService from '../../_services/outPatient.service';
import Modal from '../components/modal';
import TotalPlanForm from '../forms/totalPlanForm';
import SurgeryItemForm from '../forms/surgeryItemForm';

export default class SurgeryListPage extends Component {

    _service = new OutPatientService

    keys = ["Payer/PBM", "# of lives", "Status", "Action"]
    payers = {}

    itemToEdit = {}
    editFlag = false
    constructor() {
        super()
        this.state = {
            systemData: [],
            institusData: [],
            isSystemOpen: false,
            isInstitusOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this)
        this.openSystemModal = this.openSystemModal.bind(this)
        this.openSystemEditor = this.openSystemEditor.bind(this)
        this.openInstitusModal = this.openInstitusModal.bind(this)
        this.openInstitusEditor = this.openInstitusEditor.bind(this)

        this.payers = JSON.parse(localStorage.getItem('payers'));
    }

    componentDidMount() {
        this.setState({ loading1: true })
        this._service.getPayerPlans({ type: 'surgery', category: "system" })
            .then(res => {
                this.state.systemData = res.data;
                this.setState({ loading1: false })
            })
            .catch(err => {
                if (err) {
                    this.setState({ loading1: false })
                }
            })
        this.setState({ loading2: true })
        this._service.getPayerPlans({ type: 'surgery', category: "institution" })
            .then(res => {
                this.state.institusData = res.data;
                this.setState({ loading2: false })
            })
            .catch(err => {
                if (err) {
                    this.setState({ loading2: false })
                }
            })

    }

    openSystemModal() {
        this.setState({
            isSystemOpen: true
        })
    }

    openInstitusModal() {
        this.setState({
            isInstitusOpen: true
        })
    }

    openSystemEditor(data) {
        this.systemToEdit = data
        this.systemEditFlag = true
        this.setState({
            isSystemOpen: true
        })
    }

    openInstitusEditor(data) {
        this.institusToEdit = data
        this.institusEditFlag = true
        this.setState({
            isInstitusOpen: true
        })
    }

    editSystemData(data) {
        console.log( data );
        if(this.systemEditFlag) {
            this.state.systemData.forEach( e => {
                if( e._id == data._id){
                    e.plan = data.plan
                    e.status = data.status
                }
            })
        }
        else {
            this.state.systemData.push(data)
        }
        this.systemEditFlag = false
        this.setState({
            isSystemOpen: false
        })
    }

    editInstitusData(data) {
        if(this.institusEditFlag) {
            this.state.institusData.forEach(e => {
                if( e._id == data._id ){
                    e.plan = data.plan
                    e.status = data.status
                }
            })
        }
        else{
            this.state.institusData.push(data)
        }
        this.institusEditFlag = false
        this.setState({
            isInstitusOpen: false
        })
    }

    toggleModal() {
        this.index = -1
        this.setState({
            isSystemOpen: false,
            isInstitusOpen: false,
        })
        this.institusEditFlag = false
        this.systemEditFlag = false
        this.systemToEdit = {}
        this.institusToEdit = {}
    }

    editData(data) {
        if (this.editFlag) {
            this.state.data.forEach(e => {
                if (e._id == data._id) {
                    const { coalition, plan, status } = data
                    e.coalition = coalition;
                    e.plan = plan
                    e.status = status
                }
            })
        }
        else {
            this.state.data.push(data)
        }
        this.editFlag = false

        this.setState({
            isOpen: false
        })
    }

    render() {
        return (
            <>
                <Grid container spacing={4} >
                    <Grid item xs={12} md={6}>
                        <Grid item xs={12}>
                            <Button onClick={this.openSystemModal} variant="contained" size="small" color="primary">Add</Button>
                        </Grid>
                        <div className="divider"></div>
                        <Grid item xs={12} md={11}>
                            <Widget title="Hospital System List" upperTitle noBodyPadding>
                                <Table className="mb-0">
                                    <TableHead>
                                        <TableRow>
                                            {this.keys.map(key => (
                                                <TableCell key={key}>{key}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state && this.state.systemData && this.state.systemData.length ? (this.state.systemData.map((data, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="pl-3 fw-normal">{this.payers[data.coalition]}</TableCell>
                                                <TableCell>{data.plan}</TableCell>
                                                <TableCell>{data.status ? "Active" : 'No'}</TableCell>
                                                <TableCell>
                                                    <Button onClick={() => this.openSystemEditor(data)} variant="contained" color="primary" size="small">Edit</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))) : (<TableRow >
                                            <TableCell colSpan="8" style={centerStyle}>There is no Data</TableCell>
                                        </TableRow>)}
                                    </TableBody>
                                </Table>
                            </Widget>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid item xs={12}>
                            <Button onClick={this.openInstitusModal} variant="contained" size="small" color="primary">Add</Button>
                        </Grid>
                        <div className="divider"></div>
                        <Grid item xs={12} md={11}>
                            <Widget title="Hospital Institutions List" upperTitle noBodyPadding>
                                <Table className="mb-0">
                                    <TableHead>
                                        <TableRow>
                                            {this.keys.map(key => (
                                                <TableCell key={key}>{key}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state && this.state.institusData && this.state.institusData.length ? (this.state.institusData.map((data, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="pl-3 fw-normal">{this.payers[data.coalition]}</TableCell>
                                                <TableCell>{data.plan}</TableCell>
                                                <TableCell>{data.status ? "Active" : 'No'}</TableCell>
                                                <TableCell>
                                                    <Button onClick={() => this.openInstitusEditor(data)} variant="contained" color="primary" size="small">Edit</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))) : (<TableRow >
                                            <TableCell colSpan="8" style={centerStyle}>There is no Data</TableCell>
                                        </TableRow>)}
                                    </TableBody>
                                </Table>
                            </Widget>
                        </Grid>
                    </Grid>
                    { this.state.isSystemOpen ? (<Modal show={this.state.isSystemOpen} onClose={this.toggleModal} class={'small'} title={ this.index !== -1 ? "Edit Hospital System Data" : "New Hospital System Data" }>
                        <SurgeryItemForm data={this.systemToEdit}  basic={{type: 'surgery', category: 'system'}} submit={(data) => this.editSystemData(data)} edit={this.systemEditFlag}></SurgeryItemForm>
                    </Modal> ) : ''}
                    { this.state.isInstitusOpen ? (<Modal show={this.state.isInstitusOpen} onClose={this.toggleModal} class={'small'} title={ this.index !== -1 ? "Edit Hospital Institutions Data" : "New Hospital Institutions Data" }>
                        <SurgeryItemForm data={this.institusToEdit}  basic={{type: 'surgery', category: 'institution'}} submit={(data) => this.editInstitusData(data)} edit={this.institusEditFlag}></SurgeryItemForm>
                    </Modal> ) : ''}
                </Grid>
            </>
        )
    }
}


const centerStyle = {
    textAlign: "center",
    fontSize: "20px"
}