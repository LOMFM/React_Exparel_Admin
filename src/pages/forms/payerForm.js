import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    Typography,
    CircularProgress,
    Button,
    TextField,
} from "@material-ui/core";
import '../../_styles/card.css'


import OutPatientService from '../../_services/outPatient.service';

export default class PayerForm extends Component {

    _service = new OutPatientService;

    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
        this.formSubmit = this.formSubmit.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
    }

    formSubmit(e) {
        e.preventDefault()
        const data = {
            ...this.state
        }
        this.setState({
            submitting: true
        })
        this._service.registerPayers(data)
            .then((res) => {
                let payers = localStorage.getItem("payers");
                if( payers ){
                    payers = JSON.parse(payers);
                    payers[res.data["_id"]] = res.data.name
                    localStorage.setItem("payers", JSON.stringify(payers))
                }
                payers = localStorage.getItem("payerArray");
                if( payers ){
                    payers = JSON.parse(payers);
                    payers.push(res.data);
                    localStorage.setItem("payerArray", JSON.stringify(payers))
                }
                this.setState({
                    submitting: false
                })
                this.props.submit()
            })
            .catch((err) => {
                this.setState({
                    submitting: false
                })
            })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    render() {
        return (
            <Grid>
                <div className="form">
                    <Typography>Payer Name</Typography>
                    <TextField
                        id="payer_name"
                        value={this.state.name}
                        onChange={this.onChangeName}
                        margin="normal"
                        placeholder="ex: United Health"
                        type="text"
                        fullWidth
                    />
                </div>
                <div className="form-actions">
                    <Button onClick={this.formSubmit} variant="contained" color="primary" size="small">Register</Button>
                </div>
            </Grid >
        )
    }
}

PayerForm.propTypes = {
    submit: PropTypes.func
}
