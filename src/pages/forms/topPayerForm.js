import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {
    Grid,
    CircularProgress,
    TextField,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import '../../_styles/form.css'

import OutPatientService from '../../_services/outPatient.service';

export default class TopPayerForm extends Component {

    _serivce = new OutPatientService()

    payers = []
    payersJSON= {}

    constructor(props) {
        super(props)

        this.state = {
            coalition: '',
            lives: 0,
            status: 0,
            order: 0,
            id: ''
        }

        this.onChangeCoalition = this.onChangeCoalition.bind(this)
        this.onChangeLives = this.onChangeLives.bind(this)
        this.onChangeLiveStatus = this.onChangeLiveStatus.bind(this)
        this.onChangeOrder = this.onChangeOrder.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)

        let payerArray = localStorage.getItem("payerArray");
        if( payerArray ){
            this.payers = JSON.parse(payerArray);
        }
        

        let payers = localStorage.getItem("payers");
        if( payers ){
            this.payersJSON = JSON.parse(payers)
        }
    }

    componentDidMount(){
        if( this.props.edit ){
            const { _id, coalition, state, lives, status, order } = this.props.data;
            this.setState({
                _id: _id,
                coalition: coalition,
                state: state,
                lives: lives,
                status: status,
                order: order
            })
        }
        else{
            const {order} = this.props.data;
            this.setState({
                order: order
            })
        }
    }

    onChangeCoalition = (e) => {
        this.setState({
            coalition: e.target.value
        })
    }

    onChangeLives = (e) => {
        this.setState({
            lives: e.target.value
        })
    }

    onChangeLiveStatus = (e) => {
        this.setState({
            status: e.target.value
        })
    }

    onChangeOrder = (e) => {
        this.setState({
            order: e.target.value
        })
    }

    onFormSubmit = () => {
        if( !this.props.edit ){
            this._serivce.createTopPayer({ ...this.state, type: this.props.type})
                .then((res) => {
                    var data = {...res.data, payer: {name: this.payersJSON[this.state.coalition]}}
                    this.props.submit(data);
                })
                .catch(err => {
                    
                })
        }
        else {
            this._serivce.updateTopPayer({ ...this.state, type: this.props.type}, this.state._id)
                .then((res) => {
                    var data = {...res.data, payer: {name: this.payersJSON[this.state.coalition]}}
                    this.props.submit(data);
                })
                .catch(err => {

                })
        }
        
    }

    render() {
        return (
            <Grid>
                <div className="form">
                    <Typography>Payer</Typography>
                    <Select
                        value={this.state.coalition}
                        onChange={this.onChangeCoalition}
                    >
                        {this.payers.map((payer, index) => ( 
                                    <MenuItem value={payer['_id']} key={index}>{payer['name']}</MenuItem>) 
                        )}
                    </Select>
                    <div className="divider"></div>
                    <Typography>Lives</Typography>
                    <TextField
                        id="live"
                        value={this.state.lives}
                        onChange={this.onChangeLives}
                        margin="normal"
                        placeholder="Lives( million )"
                        type="number"
                        fullWidth
                    />
                    <Typography>Status (%)</Typography>
                    <TextField
                        id="status"
                        value={this.state.status}
                        onChange={this.onChangeLiveStatus}
                        margin="normal"
                        placeholder="Status"
                        type="number"
                        max="100"
                        fullWidth
                    />

                    <Typography>Order</Typography>
                    <Select
                        value={this.state.order}
                        onChange={this.onChangeOrder}
                        disabled
                    >
                        <MenuItem value={1}>1st</MenuItem>
                        <MenuItem value={2}>2nd</MenuItem>
                        <MenuItem value={3}>3rd</MenuItem>
                        <MenuItem value={4}>4th</MenuItem>
                        <MenuItem value={5}>5th</MenuItem>
                        <MenuItem value={6}>6th</MenuItem>
                        <MenuItem value={7}>7th</MenuItem>
                        <MenuItem value={8}>8th</MenuItem>
                        <MenuItem value={9}>9th</MenuItem>
                        <MenuItem value={10}>10th</MenuItem>
                    </Select>
                </div>
                <div className="form-actions">
                    <Button onClick={this.onFormSubmit} variant="contained" color="primary" size="large">Save</Button>
                </div>
            </Grid >
        );
    }
}
