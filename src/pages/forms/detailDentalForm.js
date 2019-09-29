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
    MenuItem,
    Radio,
    RadioGroup
} from "@material-ui/core";
import '../../_styles/card.css'


import OutPatientService from '../../_services/outPatient.service';

export default class DetailDentalForm extends Component {

    _service = new OutPatientService;

    payers = []

    constructor(props) {
        super(props)
        this.state = {
            medicare_flag: "-2",
            medicaid_flag: "-2",
            commercial_flag: "-2",
            work_flag: "-2",
            effective_date_confirmed: "0",

        }
        this.formSubmit = this.formSubmit.bind(this)
        this.onChangeCoalition = this.onChangeCoalition.bind(this)
        this.onChangeState = this.onChangeState.bind(this)
        this.onChangeActive = this.onChangeActive.bind(this)
        this.onChangePending = this.onChangePending.bind(this)
        this.onChangeInactive = this.onChangeInactive.bind(this)
        this.onChangeEffectiveDateConfirmed = this.onChangeEffectiveDateConfirmed.bind(this)
        this.onChangeEffectiveDate = this.onChangeEffectiveDate.bind(this)
        this.onChangeMedicareFlag = this.onChangeMedicareFlag.bind(this)
        this.onChangeWorkFlag = this.onChangeWorkFlag.bind(this)
        this.onChangeMedicaidFlag = this.onChangeMedicaidFlag.bind(this)
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
        this.onChangeEffectiveDateConfirmed = this.onChangeEffectiveDateConfirmed.bind(this);

        let payerArray = localStorage.getItem("payerArray");
        this.payers = JSON.parse(payerArray);
    }

    componentDidMount() {
        if (this.props.edit) {
            var { type, coalition, state, active, pending, inactive,
                effective_date, confirm_flag, medicare_flag, medicaid_flag, medicaid_plan,
                medicaid_active_plan, medicaid_inactive_plan, medicaid_pending_plan,
                commercial_flag, commercial_plan, commercial_active_plan, commercial_inactive_plan, commercial_pending_plan,
                work_flag, reimbursement, comment, criteria, coverage_policy } = this.props.data;
            if( effective_date.indexOf('TBD') > -1 ){
                this.setState({
                    effective_date_confirmed: "-1"
                })
            }
            else{
                this.setState({
                    effective_date_confirmed: (confirm_flag == 0 ? 0 : 1) + ''
                })
            }

            this.setState({
                type: type,
                coalition: coalition,
                state: state,
                active: active,
                pending: pending,
                inactive: inactive,
                effective_date: effective_date,
                confirmed_flag: confirm_flag + '',
                medicare_flag: medicare_flag + '',
                medicaid_flag: medicaid_flag + '',
                medicaid_plan: medicaid_plan,
                medicaid_active_plan: medicaid_active_plan,
                medicaid_inactive_plan: medicaid_inactive_plan,
                medicaid_pending_plan: medicaid_pending_plan,
                commercial_flag: commercial_flag + '',
                commercial_plan: commercial_plan,
                commercial_active_plan: commercial_active_plan,
                commercial_inactive_plan: commercial_inactive_plan,
                commercial_pending_plan: commercial_pending_plan,
                work_flag: work_flag + '',
                reimbursement: reimbursement,
                comment: comment,
                criteria: criteria,
                coverage_policy: coverage_policy
            })
        }
    }

    formSubmit(e) {
        e.preventDefault()
        this.setState({
            submitting: true
        })
        let detailData = {
            ...this.state
        }
        
        if( this.effective_date_confirmed == -1 ){
            detailData.effective_date = 'TBD'
        }
        else if( this.effective_date_confirmed == 0 ){
            detailData.confirm_flag = 0;
        }
        else {
            detailData.confirm_flag = 1;
        }
        
        this._service.savePayerData(detailData, { type: this.props.type, payer: detailData.coalition, state: detailData.state })
            .then((res) => {
                this.setState({
                    submitting: false
                })
                this.props.submit({...res.data, payer: res.payer})
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
    onChangeState(e) {
        this.setState({
            state: e.target.value
        })
    }
    onChangeActive(e) {
        this.setState({
            active: e.target.value
        })
    }
    onChangePending(e) {
        this.setState({
            pending: e.target.value
        })
    }
    onChangeInactive(e) {
        this.setState({
            inactive: e.target.value
        })
    }
    onChangeEffectiveDateConfirmed(e) {
        this.setState({
            effective_date_confirmed: e.target.value
        })
    }
    onChangeEffectiveDate(e) {
        this.setState({
            effective_date: e.target.value
        })
    }
    onChangeMedicareFlag(e) {
        this.setState({
            medicare_flag: e.target.value
        })
    }
    onChangeMedicaidFlag(e) {
        this.setState({
            medicaid_flag: e.target.value
        })
    }
    onChangeCommercialFlag(e) {
        this.setState({
            commercial_flag: e.target.value
        })
    }
    onChangeWorkFlag(e) {
        this.setState({
            work_flag: e.target.value
        })
    }
    onChangeMedicaidTotalPlan(e) {
        this.setState({
            medicaid_plan: e.target.value
        })
    }
    onChangeMedicaidActiveStatus(e) {
        this.setState({
            medicaid_active_plan: e.target.value
        })
    }
    onChangeMedicaidPendingStatus(e) {
        this.setState({
            medicaid_pending_plan: e.target.value
        })
    }
    onChangeMedicaidInactiveStatus(e) {
        this.setState({
            medicaid_inactive_plan: e.target.value
        })
    }
    onChangeCommercialTotalPlan(e) {
        this.setState({
            commercial_plan: e.target.value
        })
    }
    onChangeCommercialActiveStatus(e) {
        this.setState({
            commercial_active_plan: e.target.value
        })
    }
    onChangeCommercialPendingStatus(e) {
        this.setState({
            commercial_pending_plan: e.target.value
        })
    }
    onChangeCommercialInactiveStatus(e) {
        this.setState({
            commercial_inactive_plan: e.target.value
        })
    }
    onChangeReimbursement(e) {
        this.setState({
            reimbursement: e.target.value
        })
    }
    onChangeComment(e) {
        this.setState({
            comment: e.target.value
        })
    }
    onChangeCriteria(e) {
        this.setState({
            criteria: e.target.value
        })
    }
    onChangePolicy(e) {
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
                                <RadioGroup aria-label="effective_date_confirmed" name="effective_date_confirmed" value={this.state.effective_date_confirmed} onChange={this.onChangeEffectiveDateConfirmed} row>
                                    <FormControlLabel value="0" control={<Radio />} label="None" />
                                    <FormControlLabel value="-1" control={<Radio />} label="TBD" />
                                    <FormControlLabel value="1" control={<Radio />} label="Confirmed" />
                                </RadioGroup>
                                {
                                    this.state.effective_date_confirmed != -1 ? (
                                        <TextField
                                            id="effective_date"
                                            value={this.state.effective_date}
                                            onChange={this.onChangeEffectiveDate}
                                            margin="normal"
                                            placeholder="Effective Date"
                                            type="date"
                                            className="input-field"
                                        />
                                    ) : ''
                                }                                
                            </div>

                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography>Commerical Plan</Typography>
                            <div className="d-flex">
                                <RadioGroup aria-label="commercial_flag" name="commercial_flag" value={this.state.commercial_flag} onChange={this.onChangeCommercialFlag} row>
                                    <FormControlLabel value="-2" control={<Radio />} label="None" />
                                    <FormControlLabel value="-1" control={<Radio />} label="TBD" />
                                    <FormControlLabel value="1" control={<Radio />} label="YES" />
                                    <FormControlLabel value="0" control={<Radio />} label="No" />
                                </RadioGroup>
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

DetailDentalForm.propTypes = {
    submit: PropTypes.func
}
