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
import PlanForm from '../forms/planForm';

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
                this.state.data = res.data;
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
                this.state.data = res.data;
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
        this.institusData = data
        this.institusEditFlag = true
        this.setState({
            isInstitusOpen: true
        })
    }

    editSystemData() {
        if(this.systemEditFlag) {

        }
        else {

        }
        this.systemEditFlag = false
        this.setState({
            isSystemOpen: false
        })
    }

    editInstitusData() {
        if(this.institusEditFlag) {

        }
        else{

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
            isInstitusOpen: false
        })
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
                        <Grid item xs={12} md={11}>
                            <Widget title="Plan Lists" upperTitle noBodyPadding>
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
                                                    <Button onClick={() => this.openEditor(data)} variant="contained" color="primary" size="small">Edit</Button>
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
                        <Grid item xs={12} md={11}>
                            <Widget title="Plan Lists" upperTitle noBodyPadding>
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
                                                    <Button onClick={() => this.openEditor(data)} variant="contained" color="primary" size="small">Edit</Button>
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
                </Grid>
            </>
        )
    }
}


const centerStyle = {
    textAlign: "center",
    fontSize: "20px"
}