import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    Typography,
    CircularProgress,
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem
} from "@material-ui/core";
import '../../_styles/card.css'


import OutPatientService from '../../_services/outPatient.service';

export default class DetailForm extends Component {

    _service = new OutPatientService;

    payers = []

    constructor(props) {
        super(props)
        this.state = {
            coalition: '',
            plan: 0,
            asc_flag: false,
            hopd_flag: false,
            status: 0
        }
        this.formSubmit = this.formSubmit.bind(this)
        this.onChangeCoalition = this.onChangeCoalition.bind(this)
        this.onChangeState = this.onChangeState.bind(this)
        this.onChangeActive = this.onChangeActive.bind(this)
        this.onChangePending = this.onChangePending.bind(this)
        this.onChangeInactive = this.onChangeInactive.bind(this)
        this.onChangeEffectiveDateTBD = this.onChangeEffectiveDateTBD.bind(this)
        this.onChangeEffectiveDateConfirmed = this.onChangeEffectiveDateConfirmed.bind(this)
        this.onChangeEffectiveDate = this.onChangeEffectiveDate.bind(this)
        this.onChangeMedicareFlag = this.onChangeMedicareFlag.bind(this)
        this.onChangeMedicareFlagTBD = this.onChangeMedicareFlagTBD.bind(this)
        this.onChangeWorkFlagTBD = this.onChangeWorkFlagTBD.bind(this)
        this.onChangeWorkFlag = this.onChangeWorkFlag.bind(this)
        this.onChangeMedicaidFlagTBD = this.onChangeMedicaidFlagTBD.bind(this)
        this.onChangeMedicaidFlag = this.onChangeMedicaidFlag.bind(this)
        this.onChangeCommercialFlagTBD = this.onChangeCommercialFlagTBD.bind(this)
        this.onChangeCommercialFlag = this.onChangeCommercialFlag.bind(this)
        this.onChangeMedicaidTotalPlan = this.onChangeMedicaidTotalPlan.bind(this)
        this.onChangeMedicaidActiveStatus = this.onChangeMedicaidActiveStatus.bind(this)
        this.onChangeMedicaidPendingStatus = this.onChangeMedicaidPendingStatus.bind(this)
        this.onChangeMedicaidInactiveStatus = this.onChangeMedicaidInactiveStatus.bind(this)
        this.onChangeCommercialTotalPlan = this.onChangeCommercialTotalPlan.bind(this)
        this.onChangeCommercialActiveStatus = this.onChangeCommercialActiveStatus.bind(this)
        this.onChangeCommercialPendingStatus = this.onChangeCommercialPendingStatus.bind(this)
        this.onChangeCommercialInactiveStatus = this.onChangeCommercialInactiveStatus.bind(this)
        this.onChangeComment = this.onChangeComment.bind(this)
        this.onChangeReimbursement = this.onChangeReimbursement.bind(this)
        this.onChangeCriteria = this.onChangeCriteria.bind(this)
        this.onChangePolicy = this.onChangePolicy.bind(this)
        this.onChangeEffectiveDateTBD = this.onChangeEffectiveDateTBD.bind(this);
        this.onChangeEffectiveDateConfirmed = this.onChangeEffectiveDateConfirmed.bind(this);

        let payerArray = localStorage.getItem("payerArray");
        this.payers = JSON.parse(payerArray);
    }

    componentDidMount() {
        var { type, coalition, state, active, pending, inactive, 
            effective_date, confirmed_flag, medicare_flag, medicaid_flag, medicaid_plan,
            medicaid_active_plan, medicaid_inactive_plan, medicaid_pending_plan,
            commercial_flag, commercial_active_plan, commercial_inactive_plan, commercial_pending_plan,
            work_flag, reimbursement, comment, criteria, coverage_policy} = this.props.data;
        let confirm_flag = false;
        let effect_date
        if( effective_date && effective_date.indexOf('Confirmed') > -1 ){
            confirm_flag = true;
            effect_date = effective_date.split(' ')[1];
            if( effect_date ){
                effect_date = new Date(effect_date)
            }            
        }
        let medicaid_flag_tbd = false;
        let commercial_flag_tbd = false;
        let medicare_flag_tbd = false;
        let work_flag_tbd = false;

        if( medicaid_flag == 1 ){
            medicaid_flag = true
        }
        else{
            if( medicaid_flag == 0){
                medicaid_flag = false
            }
            else{
                medicaid_flag_tbd = true
            }
        }
        if( commercial_flag == 1 ){
            commercial_flag = true
        }
        else{
            if( commercial_flag == 0){
                commercial_flag = false
            }
            else{
                commercial_flag_tbd = true
            }
        }
        if( medicare_flag == 1 ){
            medicare_flag = true
        }
        else{
            if( medicare_flag == 0){
                medicare_flag = false
            }
            else{
                medicare_flag_tbd = true
            }
        }
        if( work_flag == 1 ){
            work_flag = true
        }
        else{
            if( work_flag == 0){
                work_flag = false
            }
            else{
                work_flag_tbd = true
            }
        }

        console.log( medicaid_flag, medicare_flag, commercial_flag);
        console.log( medicaid_flag_tbd, medicare_flag_tbd, commercial_flag_tbd);
        this.setState({
            type: type, 
            coalition: coalition, 
            state: state, 
            active: active, 
            pending: pending, 
            inactive: inactive, 
            effective_date_tbd : effective_date == 'TBD' ? true : false,
            effective_date: effect_date, 
            confirmed_flag: confirm_flag,
            medicare_flag_tbd: medicare_flag_tbd,
            medicare_flag: medicare_flag,
            medicaid_flag_tbd: medicaid_flag_tbd,
            medicaid_flag: medicaid_flag,
            medicaid_plan: medicaid_plan,
            medicaid_active_plan: medicaid_active_plan, 
            medicaid_inactive_plan: medicaid_inactive_plan, 
            medicaid_pending_plan: medicaid_pending_plan,
            commercial_flag_tbd: commercial_flag_tbd,
            commercial_flag: commercial_flag,
            commercial_active_plan: commercial_active_plan, 
            commercial_inactive_plan: commercial_inactive_plan, 
            commercial_pending_plan: commercial_pending_plan,
            work_flag_tbd: work_flag_tbd,
            work_flag: work_flag,
            reimbursement: reimbursement, 
            comment: comment, 
            criteria: criteria, 
            coverage_policy: coverage_policy
        })
    }

    formSubmit(e) {
        e.preventDefault()
        this.setState({
            submitting: true
        })
        let detailData = {
            ...this.state
        }
        if( this.state.effective_date_tbd ){
            detailData.effective_date = 'TBD'
        }
        else {
            if( this.state.effective_date_confirmed ){
                detailData.effective_date = 'Confirmed ' + this.state.effective_date
            }
            else{
                detailData.effective_date = this.state.effective_date
            }
        }
        if( this.state.medicare_flag_tbd ){
            detailData.medicare_flag = -1
        }
        else{
            if(this.state.medicare_flag){
                detailData.medicare_flag = 1
            }
            else{
                detailData.medicare_flag = 0
            }
        }
        if( this.state.medicaid_flag_tbd ){
            detailData.medicaid_flag = -1
        }
        else{
            if(this.state.medicaid_flag){
                detailData.medicaid_flag = 1
            }
            else{
                detailData.medicaid_flag = 0
            }
        }
        if( this.state.commercial_flag_tbd ){
            detailData.commercial_flag = -1
        }
        else{
            if(this.state.commercial_flag){
                detailData.commercial_flag = 1
            }
            else{
                detailData.commercial_flag = 0
            }
        }if( this.state.work_flag_tbd ){
            detailData.work_flag = -1
        }
        else{
            if(this.state.work_flag){
                detailData.work_flag = 1
            }
            else{
                detailData.work_flag = 0
            }
        }

        this._service.savePayerData(detailData, { type: this.props.type, payer: detailData.coalition, state: detailData.state})
            .then((res) => {
                this.setState({
                    submitting: false
                })
                this.props.submit(res.data)
            })
            .catch((err) => {
                this.setState({
                    submitting: false
                })
            })
    }

    onChangeCoalition(e) {
        this.setState({
            coalition: e.target.value
        })
    }
    onChangeState(e){
        this.setState({
            state: e.target.value
        })
    }
    onChangeActive(e){
        this.setState({
            active: e.target.value
        })
    }
    onChangePending(e) {
        this.setState({
            pending: e.target.value
        })
    }
    onChangeInactive(e){
        this.setState({
            inactive: e.target.value
        })
    }
    onChangeEffectiveDateTBD(e) {
        this.setState({
            effective_date_tbd: !this.state.effective_date_tbd
        })
    }
    onChangeEffectiveDateConfirmed(e) {
        this.setState({
            effective_date_confirmed: !this.state.effective_date_confirmed
        })
    }
    onChangeEffectiveDate(e){
        this.setState({
            effective_date: e.target.value   
        })
    }
    onChangeMedicareFlagTBD(e){
        this.setState({
            medicare_flag_tbd : !this.state.medicare_flag_tbd
        })
    }
    onChangeMedicareFlag(e){
        this.setState({
            medicare_flag: !this.state.medicare_flag
        })
    }
    onChangeMedicaidFlagTBD(e){
        this.setState({
            medicaid_flag_tbd : !this.state.medicaid_flag_tbd
        })
    }
    onChangeMedicaidFlag(e){
        this.setState({
            medicaid_flag: !this.state.medicaid_flag
        })
    }
    onChangeCommercialFlagTBD(e){
        this.setState({
            commercial_flag_tbd : !this.state.commercial_flag_tbd
        })
    }
    onChangeCommercialFlag(e){
        this.setState({
            commercial_flag: !this.state.commercial_flag
        })
    }
    onChangeWorkFlagTBD(e){
        this.setState({
            work_flag_tbd : !this.state.work_flag_tbd
        })
    }
    onChangeWorkFlag(e){
        this.setState({
            work_flag: !this.state.work_flag
        })
    }
    onChangeMedicaidTotalPlan(e){
        this.setState({
            medicaid_plan: e.target.value
        })
    }
    onChangeMedicaidActiveStatus(e){
        this.setState({
            medicaid_active_plan: e.target.value
        })
    }
    onChangeMedicaidPendingStatus(e){
        this.setState({
            medicaid_pending_plan: e.target.value
        })
    }
    onChangeMedicaidInactiveStatus(e){
        this.setState({
            medicaid_inactive_plan: e.target.value
        })
    }
    onChangeCommercialTotalPlan(e){
        this.setState({
            commercial_plan: e.target.value
        })
    }
    onChangeCommercialActiveStatus(e){
        this.setState({
            commercial_active_plan: e.target.value
        })
    }
    onChangeCommercialPendingStatus(e){
        this.setState({
            commercial_pending_plan: e.target.value
        })
    }
    onChangeCommercialInactiveStatus(e){
        this.setState({
            commercial_inactive_plan: e.target.value
        })
    }
    onChangeReimbursement(e){
        this.setState({
            reimbursement: e.target.value
        })
    }
    onChangeComment(e){
        this.setState({
            comment: e.target.value  
        })
    }
    onChangeCriteria(e){
        this.setState({
            criteria: e.target.value  
        })
    }
    onChangePolicy(e){
        this.setState({
            coverage_policy: e.target.value  
        })
    }
    


    render() {
        return (
            <Grid className="form-wrapper">
                <div className="form">
                    <Grid container spacing={4} >
                        <Grid item xs={6}>
                            <Typography>Payer</Typography>
                            <Select
                                value={this.state.coalition}
                                onChange={this.onChangeCoalition}
                                disabled={this.props.edit}
                                fullWidth
                            >
                                {this.payers.map((payer, index) => (
                                    <MenuItem value={payer['_id']} key={index}>{payer['name']}</MenuItem>)
                                )}

                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>State</Typography>
                            <Select
                                value={this.state.state}
                                onChange={this.onChangeState}
                                disabled={this.props.edit}
                                fullWidth
                            >
                                {this.states.map((state, index) => (
                                    <MenuItem value={state} key={index}>{state}</MenuItem>)
                                )}

                            </Select>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Typography>Active (%)</Typography>
                            <TextField
                                id="active_status"
                                value={this.state.active}
                                onChange={this.onChangeActive}
                                margin="normal"
                                placeholder="Total Active"
                                type="number"
                                fullWidth
                                className="input-field"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography>Pending (%)</Typography>
                            <TextField
                                id="total_pending"
                                value={this.state.pending}
                                onChange={this.onChangePending}
                                margin="normal"
                                placeholder="Total Pending"
                                type="number"
                                fullWidth
                                className="input-field"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography>Inactive (%)</Typography>
                            <TextField
                                id="total_inactive"
                                value={this.state.inactive}
                                onChange={this.onChangeInactive}
                                margin="normal"
                                placeholder="Plans"
                                type="number"
                                fullWidth
                                className="input-field"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography>Effective Date</Typography>
                            <div className="d-flex">
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={this.state.effective_date_tbd} onChange={this.onChangeEffectiveDateTBD} value="true" />
                                    }
                                    label="TBD"
                                />
                                {this.state.effective_date_tbd ? null : (
                                    <>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={this.state.effective_date_confirmed} onChange={this.onChangeEffectiveDateConfirmed} value="true" />
                                            }
                                            label="Confirmed"
                                        />
                                        <TextField
                                            id="effective_date"
                                            value={this.state.effective_date}
                                            onChange={this.onChangeEffectiveDate}
                                            margin="normal"
                                            placeholder="Effective Date"
                                            type="date"
                                            className="input-field"
                                        />
                                    </>
                                )}
                            </div>

                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography>Medicare</Typography>
                            <div className="d-flex">
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={this.state.medicare_flag_tbd} onChange={this.onChangeMedicareFlagTBD} value="true" />
                                    }
                                    label="TBD"
                                />
                                {
                                    this.state.medicare_flag_tbd ? null : (
                                        <>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={this.state.medicare_flag} onChange={this.onChangeMedicareFlag} value="true" />
                                                }
                                                label="Yes/No"
                                            />
                                        </>
                                    )
                                }
                            </div>                            
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography>Work / Comp</Typography>
                            <div className="d-flex">
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={this.state.work_flag_tbd} onChange={this.onChangeWorkFlagTBD} value="true" />
                                    }
                                    label="TBD"
                                />
                                {
                                    this.state.work_flag_tbd ? null : (
                                        <>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={this.state.work_flag} onChange={this.onChangeWorkFlag} value="true" />
                                                }
                                                label="Yes/No"
                                            />
                                        </>
                                    )
                                }
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography>Medicaid Plan</Typography>
                            <div className="d-flex">
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={this.state.medicaid_flag_tbd} onChange={this.onChangeMedicaidFlagTBD} value="true" />
                                    }
                                    label="TBD"
                                />
                                {
                                    this.state.medicaid_flag_tbd ? null : (
                                        <>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={this.state.medicaid_flag} onChange={this.onChangeMedicaidFlag} value="true" />
                                                }
                                                label="Yes/No"
                                            />
                                            <TextField
                                                id="medicaid_total_plan"
                                                value={this.state.medicaid_plan}
                                                onChange={this.onChangeMedicaidTotalPlan}
                                                margin="normal"
                                                placeholder="Total Plans"
                                                type="number"
                                                className="input-field"
                                            />
                                            <TextField
                                                id="medicaid_active_status"
                                                value={this.state.medicaid_active_plan}
                                                onChange={this.onChangeMedicaidActiveStatus}
                                                margin="normal"
                                                placeholder="Active (%)"
                                                type="number"
                                                className="input-field"
                                            />
                                            <TextField
                                                id="medicaid_pending_status"
                                                value={this.state.medicaid_pending_plan}
                                                onChange={this.onChangeMedicaidPendingStatus}
                                                margin="normal"
                                                placeholder="Pending (%)"
                                                type="number"
                                                className="input-field"
                                            />
                                            <TextField
                                                id="medicaid_inactive_status"
                                                value={this.state.medicaid_inactive_plan}
                                                onChange={this.onChangeMedicaidInactiveStatus}
                                                margin="normal"
                                                placeholder="Inactive (%)"
                                                type="number"
                                                className="input-field"
                                            />
                                        </>
                                    )
                                }
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography>Commerical Plan</Typography>
                            <div className="d-flex">
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={this.state.commercial_flag_tbd} onChange={this.onChangeCommercialFlagTBD} value="true" />
                                    }
                                    label="TBD"
                                />
                                {
                                    this.state.commercial_flag_tbd ? null : (
                                        <>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={this.state.commercial_flag} onChange={this.onChangeCommercialFlag} value="true" />
                                                }
                                                label="Yes/No"
                                            />
                                            <TextField
                                                id="commercial_total_plan"
                                                value={this.state.commercial_plan}
                                                onChange={this.onChangeCommercialTotalPlan}
                                                margin="normal"
                                                placeholder="Total Plans"
                                                type="number"
                                                className="input-field"
                                            />
                                            <TextField
                                                id="commercial_active_plan"
                                                value={this.state.commercial_active_plan}
                                                onChange={this.onChangeCommercialActiveStatus}
                                                margin="normal"
                                                placeholder="Active (%)"
                                                type="number"
                                                className="input-field"
                                            />
                                            <TextField
                                                id="commercial_pending_plan"
                                                value={this.state.commercial_pending_plan}
                                                onChange={this.onChangeCommercialPendingStatus}
                                                margin="normal"
                                                placeholder="Pending (%)"
                                                type="number"
                                                className="input-field"
                                            />
                                            <TextField
                                                id="commercial_inactive_plan"
                                                value={this.state.commercial_inactive_plan}
                                                onChange={this.onChangeCommercialInactiveStatus}
                                                margin="normal"
                                                placeholder="Inactive (%)"
                                                type="number"
                                                className="input-field"
                                            />
                                        </>
                                    )
                                }
                            </div>
                        </Grid>
                    </Grid>
                    
                    <Typography>Reimbursement Amount</Typography>
                    <TextField
                        id="reim"
                        value={this.state.reimbursement}
                        onChange={this.onChangeReimbursement}
                        margin="normal"
                        placeholder="Reimbursement"
                        type="text"
                        fullWidth
                    />

                    <Typography>Criteria</Typography>
                    <TextField
                        id="criteria"
                        value={this.state.criteria}
                        onChange={this.onChangeCriteria}
                        margin="normal"
                        placeholder="Criteria"
                        type="text"
                        fullWidth
                    />
                    <Typography>Coveragy Policy</Typography>
                    <TextField
                        id="coverage"
                        value={this.state.coverage_policy}
                        onChange={this.onChangePolicy}
                        margin="normal"
                        placeholder="Coverage Policy"
                        type="text"
                        fullWidth
                    />
                    <Typography>Comment</Typography>
                    <TextField
                        id="comment"
                        value={this.state.comment}
                        onChange={this.onChangeComment}
                        margin="normal"
                        placeholder="Comment"
                        multiline
                        rows="4"
                        fullWidth
                    />
                </div>
                <div className="form-actions">
                    <Button onClick={this.formSubmit} variant="contained" color="primary" size="small">Save</Button>
                </div>
            </Grid >
        )
    }


    states = [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
    ]
}

DetailForm.propTypes = {
    submit: PropTypes.func
}
