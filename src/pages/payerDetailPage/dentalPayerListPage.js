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
import Modal from '../components/modal';
import TotalPlanForm from '../forms/totalPlanForm';
import DetailDentalForm from '../forms/detailDentalForm';
import '../../_styles/app.css'

export default class DentalPayerListPage extends Component {

    _service = new OutPatientService

    keys = ["Payer/PBM", "State", "Active", "Pending", "Inactive", "Date", "Reimbursement", "Comment", "Criteria", "Coverage Policy"]
    payers = {}

    planToEdit = {}
    editFlag = false
    constructor() {
        super()
        this.state = {
            loading: false,
            data: [],
            isOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this)
        this.editData = this.editData.bind(this)

        this.payers = JSON.parse(localStorage.getItem('payers'));
    }



    componentDidMount() {
        this.setState({ loading: true })
        this._service.getPayerList('dental')
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
        this.editFlag = false;
        this.planToEdit = {}
    }

    openEditor(data) {
        this.planToEdit = data
        this.editFlag = true
        this.setState({
            isOpen: true
        })
    }

    editData(data) {
        if (this.editFlag) {
            this.state.data.forEach(e => {
                if (e._id == data._id) {
                    const { type, coalition, state, active, pending, inactive, 
                        effective_date, confirm_flag, medicare_flag, medicaid_flag, medicaid_plan,
                        medicaid_active_plan, medicaid_inactive_plan, medicaid_pending_plan,
                        commercial_flag, commercial_active_plan, commercial_inactive_plan, commercial_pending_plan,
                        work_flag, reimbursement, comment, criteria, coverage_policy} = data;
                    e.type = type
                    e.coalition = coalition
                    e.state = state
                    e.active = active
                    e.pending = pending
                    e.inactive = inactive
                    e.effective_date = effective_date
                    e.confirm_flag = confirm_flag
                    e.medicare_flag = medicare_flag
                    e.medicaid_flag = medicaid_flag
                    e.commercial_flag = commercial_flag
                    e.work_flag = work_flag
                    e.medicaid_plan = medicaid_plan
                    e.medicaid_active_plan = medicaid_active_plan
                    e.medicaid_pending_plan = medicaid_pending_plan
                    e.medicaid_inactive_plan = medicaid_inactive_plan
                    e.commercial_active_plan = commercial_active_plan
                    e.commercial_pending_plan = commercial_pending_plan
                    e.commercial_inactive_plan = commercial_inactive_plan
                    e.reimbursement = reimbursement
                    e.comment = comment
                    e.criteria = criteria
                    e.coverage_policy = coverage_policy
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
                    <Grid item xs={12}>
                        <Widget title="Payer Coverage HOPD List" upperTitle noBodyPadding>
                            <div className="overflow">
                                <Table className="mb-0">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            {this.keys.map(key => (
                                                <TableCell key={key}>{key}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state && this.state.data && this.state.data.length ? (this.state.data.map((data, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Button onClick={() => this.openEditor(data)} variant="contained" color="primary" size="small">Edit</Button>
                                                </TableCell>
                                                <TableCell className="pl-3 fw-normal">{data.payer ? data.payer.name : ''}</TableCell>
                                                <TableCell>{data.state}</TableCell>
                                                <TableCell>{data.active}%</TableCell>
                                                <TableCell>{data.pending}%</TableCell>
                                                <TableCell>{data.inactive}%</TableCell>
                                                <TableCell>{data.confirm_flag ? 'Confirmed': ''} {data.effective_date}</TableCell>
                                                <TableCell>{data.reimbursement}</TableCell>
                                                <TableCell>{data.comment}</TableCell>
                                                <TableCell>{data.criteria}</TableCell>                                                
                                                <TableCell>{data.coverage_policy}</TableCell>
                                            </TableRow>
                                        ))) : (<TableRow >
                                            <TableCell colSpan="20" style={centerStyle}>There is no Data</TableCell>
                                        </TableRow>)}
                                    </TableBody>
                                </Table>

                            </div>
                        </Widget>
                    </Grid>
                </Grid>
                {this.state.isOpen ? (<Modal show={this.state.isOpen} onClose={this.toggleModal} class={''} title={this.index !== -1 ? "Edit Payer Plan Data" : "New Payer Plan Data"}>
                    <DetailDentalForm data={this.planToEdit} type={"dental"} submit={(data) => this.editData(data)} edit={this.editFlag}></DetailDentalForm>
                </Modal>) : ''}
            </>
        )
    }
}


const centerStyle = {
    textAlign: "center",
    fontSize: "20px"
}
