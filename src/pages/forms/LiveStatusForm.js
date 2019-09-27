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
import '../../_styles/form.css'


import OutPatientService from '../../_services/outPatient.service';

export default class LiveStatusForm extends Component {

    _service = new OutPatientService;

    constructor(props) {
        super(props)
        this.state = {
            medicareLives: 0,
            commercialLives: 0,
            medicarePercent: 0,
            commercialPercent: 0
        }
        this.formSubmit = this.formSubmit.bind(this)
        this.onChangeMedicareLives = this.onChangeMedicareLives.bind(this)
        this.onChangeCommercialLives = this.onChangeCommercialLives.bind(this)
        this.onChangeMedicarePercent = this.onChangeMedicarePercent.bind(this)
        this.onChangeCommercialPercent = this.onChangeCommercialPercent.bind(this)
    }

    componentDidMount() {
        this.setState({loading: true})
        this._service.getOneLiveStatus(this.props.basic)
            .then((data) => {
                for( let key in data.data ){
                    this.state[key] = data.data[key]
                }
                this.setState({loading: false})
            })
            .catch((err) => {
                this.setState({loading: false})
            })
    }

    formSubmit(e) {
        e.preventDefault()
        const data = {
            ...this.state
        }
        this.setState({
            submitting: true
        })
        this._service.saveOneLiveStatus(data, this.props.basic.type)
            .then((res) => {
                this.setState({
                    submitting: false,
                    isCompleted: true
                })
                setTimeout(() => { this.setState({isCompleted: false})}, 3000)
            })
            .catch((err) => {
                this.setState({
                    submitting: false,
                    hasError: true
                })
                setTimeout(() => { this.setState({hasError: false})}, 3000)
            })
    }

    onChangeMedicareLives(e) {
        this.setState({
            medicareLives: e.target.value
        })
    }

    onChangeCommercialLives(e) {
        this.setState({
            commercialLives: e.target.value
        })
    }

    onChangeMedicarePercent(e) {
        this.setState({
            medicarePercent: e.target.value
        })
    }

    onChangeCommercialPercent(e) {
        this.setState({
            commercialPercent: e.target.value
        })
    }

    render() {
        return (
            <Grid>
                <div className="card">
                    <h3 className="card-header">{this.props.title}</h3>
                    <div className="card-body form-wrapper">
                        {this.state.loading ? (
                                <div className="form-loader"><CircularProgress size={60}/></div>
                        ) : null }
                        <Typography>Medicare Lives(million)</Typography>
                        <TextField
                            id="medicare"
                            InputProps={{
                                classes: {
                                },
                            }}
                            value={this.state.medicareLives}
                            onChange={this.onChangeMedicareLives}
                            margin="normal"
                            placeholder="Medicare Lives( million )"
                            type="number"
                            fullWidth
                        />
                        <Typography>Commercial Lives (million)</Typography>
                        <TextField
                            id="commercial"
                            InputProps={{
                                classes: {
                                },
                            }}
                            value={this.state.commercialLives}
                            onChange={this.onChangeCommercialLives}
                            margin="normal"
                            placeholder="Commercial Lives (million)"
                            type="number"
                            fullWidth
                        />
                        <Typography>Medicare Live Percent (%)</Typography>
                        <TextField
                            id="medicareP"
                            InputProps={{
                                classes: {
                                },
                            }}
                            value={this.state.medicarePercent}
                            onChange={this.onChangeMedicarePercent}
                            margin="normal"
                            placeholder="Medicare Percent(%)"
                            type="number"
                            fullWidth
                        />
                        <Typography>Commercial Live Percent (%)</Typography>
                        <TextField
                            id="commericalP"
                            InputProps={{
                                classes: {
                                },
                            }}
                            value={this.state.commercialPercent}
                            onChange={this.onChangeCommercialPercent}
                            margin="normal"
                            placeholder="Commercial Percent(%)"
                            type="number"
                            fullWidth
                        />
                        {
                            this.state.isCompleted ? 
                            (<div className="succeed">The data is saved.</div>): ''
                        }
                        {
                            this.state.hasError ?
                            (<div className="error">The data is not saved.</div>) : ''
                        }
                        {this.state.submitting ? (
                            <div className="loader"><CircularProgress size={26}/></div>
                        ) : (
                                <Button
                                    onClick={this.formSubmit}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                >
                                    Save
                            </Button>
                        )}
                    </div>
                </div>
            </Grid>
        )
    }
}

LiveStatusForm.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
}
