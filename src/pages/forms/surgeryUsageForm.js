import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    CircularProgress,
    Typography,
    Button,
    TextField,
    Fade,
} from "@material-ui/core";
import '../../_styles/card.css'
import '../../_styles/form.css'


import OutPatientService from '../../_services/outPatient.service';

export default class SurgeryUsageForm extends Component {

    _service = new OutPatientService;

    constructor(props) {
        super(props)
        this.state = {
            total: 0,
            active: 0,
            deactive: 100
        }
        this.formSubmit = this.formSubmit.bind(this)
        this.onChangeTotal = this.onChangeTotal.bind(this)
        this.onChangeActive = this.onChangeActive.bind(this)
        this.onChangeDeactive = this.onChangeDeactive.bind(this)
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        this._service.getOneActiveStatus({page: 'surgery', category: '', type: this.props.type})
            .then((data) => {
                for( let key in data.data ){
                    this.state[key] = data.data[key]
                }
                this.setState({
                    loading: false
                })
            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
            })
    }

    componentWillMount(){
        
    }

    formSubmit(e) {
        e.preventDefault()
        const data = {
            page: 'surgery',
            category: '',
            type: this.props.type,
            ...this.state
        }
        this.setState({
            submitting: true
        })
        this._service.saveOneActiveStatus(data, 'surgery')
            .then((res) => {
                this.setState({
                    submitting: false,
                    isCompleted: true,
                })
                setTimeout( () => { this.setState({ isCompleted: false }) }, 3000 );
            })
            .catch((err) => {
                this.setState({
                    submitting: false,
                    hasError: true
                })
                setTimeout( () => { this.setState({ hasError: false }) }, 3000 );
            })
    }

    onChangeTotal(e) {
        this.setState({
            total: e.target.value
        })
    }

    onChangeActive(e) {
        this.setState({
            active: e.target.value,
            deactive: 100 - e.target.value - ( this.state.pending || 0 )
        })
    }

    onChangeDeactive(e) {
        this.setState({
            deactive: e.target.value,
            pending: 100 - e.target.value - ( this.state.active || 0 )
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
                        <Typography>Total</Typography>
                        <TextField
                            id="total"
                            InputProps={{
                                classes: {
                                },
                            }}
                            value={this.state.total}
                            onChange={this.onChangeTotal}
                            margin="normal"
                            placeholder="Total"
                            type="number"
                            fullWidth
                        />
                        <Typography>Allowable use(%)</Typography>
                        <TextField
                            id="active"
                            InputProps={{
                                classes: {
                                },
                            }}
                            value={this.state.active}
                            onChange={this.onChangeActive}
                            margin="normal"
                            placeholder="Allowable use(%)"
                            type="number"
                            fullWidth
                        />
                        <Typography>No access (%)</Typography>
                        <TextField
                            id="deactive"
                            InputProps={{
                                classes: {
                                },
                            }}
                            value={this.state.deactive}
                            onChange={this.onChangeDeactive}
                            margin="normal"
                            placeholder="No access(%)"
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