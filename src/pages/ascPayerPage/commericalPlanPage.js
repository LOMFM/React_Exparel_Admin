import React, { Component } from 'react';
import { Grid, Button } from "@material-ui/core";
import Widget from "../../components/Widget";
import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    CircularProgress
} from "@material-ui/core";
import OutPatientService from '../../_services/outPatient.service';
import Modal from '../components/modal';
import TotalPlanForm from '../forms/totalPlanForm';
import PlanForm from '../forms/planForm';

export default class ASCCommercialPlanPage extends Component {

    _service = new OutPatientService

    keys = ["Payer/PBM", "# of plans", "ASC Coverage", "HOPD Coverage", "Status", "Action"]
    payers = {}

    planToEdit = {}
    editFlag = false
    constructor() {
        super()
        this.state = {
            ascPayerLoading: false,
            ascPercentLoading: false,
            livePercentLoading: false,
            getTopListLoading: false,
            data: [],
            isOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this)
        this.editData = this.editData.bind(this)

        this.payers = JSON.parse(localStorage.getItem('payers'));
    }

    componentDidMount() {
        this.setState({ loading: true })
        this._service.getPayerPlans({type: 'asc', category: "commercial"})
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

    openEditor(data) {
        this.planToEdit = data
        this.editFlag = true
        this.setState({
            isOpen: true
        })
    }

    editData(data) {
        // if( this.index == -1 ){
        //     this.state.data.push(data)
        // }
        // else {
        //     this.state.data[this.index] = data
        // }
        if( this.editFlag ){
            this.state.data.forEach(e => {
                if( e._id == data._id ){
                    const {coalition, plan, asc_flag, hopd_flag, status} = data
                    e.coalition = coalition;
                    e.plan = plan
                    e.asc_flag = asc_flag
                    e.hopd_flag = hopd_flag
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
                    <Grid item xs={12}>
                        <Button onClick={this.toggleModal} variant="contained" size="small" color="primary">Add</Button>
                    </Grid>
                    <Grid item xs={12} md={10} lg={9}>
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
                                    {
                                        this.state.loading ? 
                                        <TableRow><TableCell colSpan="8" className="loader-cell"><div className="form-loader"><CircularProgress size={60}/></div></TableCell></TableRow>
                                        : ''
                                    }
                                    {this.state && this.state.data && this.state.data.length && !this.state.loading ? (this.state.data.map((data, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="pl-3 fw-normal">{data.payer ? data.payer.name : ''}</TableCell>
                                            <TableCell>{data.plan}</TableCell>
                                            <TableCell>{data.asc_flag ? "YES" : "No"}</TableCell>
                                            <TableCell>{data.hopd_flag ? "YES" : "No"}</TableCell>
                                            <TableCell>{data.status} %</TableCell>
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
                    <Grid item xs={12} md={2} lg={3}>
                        <TotalPlanForm basic={{type: 'asc', category: 'commercial'}}></TotalPlanForm>
                    </Grid>
                </Grid>
                { this.state.isOpen ? (<Modal show={this.state.isOpen} onClose={this.toggleModal} class={'small'} title={ this.index !== -1 ? "Edit Payer Plan Data" : "New Payer Plan Data" }>
                    <PlanForm data={this.planToEdit}  basic={{type: 'asc', category: 'commercial'}} submit={(data) => this.editData(data)} edit={this.editFlag}></PlanForm>
                </Modal> ) : ''}
            </>
        )
    }
}


const centerStyle = {
    textAlign: "center",
    fontSize: "20px"
}