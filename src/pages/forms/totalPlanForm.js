import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
    Grid,
    CircularProgress,
    TextField,
} from "@material-ui/core";

import '../../_styles/form.css'

import OutPatientService from '../../_services/outPatient.service';

export default class TotalPlanForm extends Component {
    _serivce = new OutPatientService()
    constructor(props) {
        super(props)

        this.state = {
            total: 0,
            status: 0,
        }

        this.onChangeTotal = this.onChangeTotal.bind(this)
        this.onChangeStatus = this.onChangeStatus.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    componentDidMount() {
        this.setState({ loading: true })
        this._serivce.getTotalPlan(this.props.basic)
            .then(res => {
                for (let key in res.data) {
                    this.state[key] = res.data[key]
                }
                this.setState({ loading: false })
            })
            .catch(err => {
                this.setState({ loading: false })
            })
    }

    onChangeTotal = (e) => {
        this.setState({
            total: e.target.value
        })
    }

    onChangeStatus = (e) => {
        this.setState({
            status: e.target.value
        })
    }

    onFormSubmit = () => {
        this.setState({
            submitting: true
        })
        this._serivce.saveTotalPlan({ ...this.state }, { ...this.props.basic })
            .then((res) => {
                this.setState({ submitting: false })                
                this.props.submit(res.data);
                setTimeout(() => {this.setState({isCompleted: false})}, 3000)
            })
            .catch(err => {
                this.setState({ submitting: false})
                setTimeout(() => {this.setState({hasError: false})}, 3000)
            })
    }

    render() {
        return (
            <Grid className="form-wrapper">
                {this.state.loading ? (
                    <div className="form-loader"><CircularProgress size={60} /></div>
                ) : null}
                <div className="form">
                    <Typography>Total Plans</Typography>
                    <TextField
                        id="total_plan"
                        value={this.state.total}
                        onChange={this.onChangeTotal}
                        margin="normal"
                        placeholder="Total Plans"
                        type="number"
                        fullWidth
                    />
                    <Typography>Status (%)</Typography>
                    <TextField
                        id="status"
                        value={this.state.status}
                        onChange={this.onChangeStatus}
                        margin="normal"
                        placeholder="Status"
                        type="number"
                        max="100"
                        fullWidth
                    />
                </div>
                {
                    this.state.isCompleted ?
                        (<div className="succeed">The data is Saved.</div>) : ''
                }
                {
                    this.state.hasError ?
                        (<div className="error">The data is not saved.</div>) : ''
                }
                <div className="form-actions">
                    {this.state.submitting ? (
                        <div className="loader"><CircularProgress size={26} /></div>
                    ) : (
                            <Button onClick={this.onFormSubmit} variant="contained" color="primary" size="large">Save</Button>
                        )}
                </div>
            </Grid >
        );
    }
}