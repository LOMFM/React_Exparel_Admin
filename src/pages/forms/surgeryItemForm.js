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

export default class SurgeryItemForm extends Component {

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
        this.onChangePlan = this.onChangePlan.bind(this)
        this.onChangeASC = this.onChangeASC.bind(this)
        this.onChangeHOPD = this.onChangeHOPD.bind(this)
        this.onChangeStatus = this.onChangeStatus.bind(this)

        let payerArray = localStorage.getItem("payerArray");
        this.payers = JSON.parse(payerArray);
    }

    componentDidMount() {
            const { coalition, plan, asc_flag, hopd_flag, status } = this.props.data;
            this.setState( {
                coalition: coalition,
                plan: plan,
                asc_flag: asc_flag,
                hopd_flag: hopd_flag,
                status: status
            } )
    }

    formSubmit(e) {
        // console.log(this.state);
        e.preventDefault()
        this.setState({
            submitting: true
        })
        this._service.savePayerPlan(this.state, this.props.basic)
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
    onChangePlan(e) {
        this.setState({
            plan: e.target.value
        })
    }
    onChangeASC(e) {

        this.setState({
            asc_flag: !this.state.asc_flag
        })

    }
    onChangeHOPD(e) {
        this.setState({
            hopd_flag: !this.state.hopd_flag
        })
    }
    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        })
    }



    render() {
        return (
            <Grid className="form-wrapper">
                <div className="form">
                    <Typography>Payer</Typography>
                    <Select
                        value={this.state.coalition}
                        onChange={this.onChangeCoalition}
                        disabled={this.props.edit}
                    >
                        {this.payers.map((payer, index) => (
                            <MenuItem value={payer['_id']} key={index}>{payer['name']}</MenuItem>)
                        )}
                        
                    </Select>
                    <div className="divider"></div>
                    <Typography>Plans</Typography>
                    <TextField
                        id="total_plan"
                        value={this.state.plan}
                        onChange={this.onChangePlan}
                        margin="normal"
                        placeholder="Plans"
                        type="number"
                        fullWidth
                    />
                    { this.props.dental ? 
                        "" : (
                            <FormControlLabel
                                control={
                                    <Checkbox checked={this.state.asc_flag} onChange={this.onChangeASC} value="true" />
                                }
                                label="ASC Coverage"
                            />
                        )
                    }
                    { this.props.dental ? 
                        "" : (
                            <FormControlLabel
                                control={
                                    <Checkbox checked={this.state.hopd_flag} onChange={this.onChangeHOPD} value="true" />
                                }
                                label="HOPD Coverage"
                            />
                        )
                    }
                    
                    
                    <Typography>Status (%)</Typography>
                    <TextField
                        id="status"
                        value={this.state.status}
                        onChange={this.onChangeStatus}
                        margin="normal"
                        placeholder="Status"
                        type="number"
                        fullWidth
                    />
                </div>
                <div className="form-actions">
                    <Button onClick={this.formSubmit} variant="contained" color="primary" size="small">Save</Button>
                </div>
            </Grid >
        )
    }
}

SurgeryItemForm.propTypes = {
    submit: PropTypes.func
}