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

    _service = new OutPatientService();

    payers = []

    constructor(props) {
        super(props)
        this.state = {
            coalition: '',
            plan: 0,
            status: 0
        }
        this.formSubmit = this.formSubmit.bind(this)
        this.onChangeCoalition = this.onChangeCoalition.bind(this)
        this.onChangeLive = this.onChangeLive.bind(this)
        this.onChangeStatus = this.onChangeStatus.bind(this)

        let payerArray = localStorage.getItem("payerArray");
        this.payers = JSON.parse(payerArray);
    }

    componentDidMount() {
        if( this.props.edit ){
            // To Get The data from server
            // this.setState({loading: true})
            // console.log(this.props.basic, this.props.data)
            // this._service.getHospitalData({...this.props.basic, payer: this.props.data.coalition})
            //     .then((res) => {
            //         console.log(res);
            //         this.setState({loading: false})
            //     })
            //     .catch((err) => {
            //         this.setState({loading: false, error: "Could`t load the data."});
            //     })
            this.state = this.props.data
            this.setState({
                coalition: this.props.data.coalition,
                plan: this.props.data.plan,
                status: this.props.data.status
            })
        }
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
    onChangeLive(e) {
        this.setState({
            plan: e.target.value
        })
    }
    onChangeStatus(e) {
        this.setState({
            status: this.state.status == 0 ? 1 : 0
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
                    <Typography>Lives</Typography>
                    <TextField
                        id="total_lives"
                        value={this.state.plan}
                        onChange={this.onChangeLive}
                        margin="normal"
                        placeholder="Lives"
                        type="number"
                        fullWidth
                    />
                    <FormControlLabel
                        control={<Checkbox checked={this.state.status} onChange={this.onChangeStatus} value="1" />}
                        label="Status"
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