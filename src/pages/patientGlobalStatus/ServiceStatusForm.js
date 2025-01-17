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


import OutPatientService from '../../_services/outPatient.service';

export default class ServiceStatusForm extends Component {

    _service = new OutPatientService;

    constructor(props) {
        super(props)
        this.state = {
            total: 0,
            active: 0,
            pending: 0,
            deactive: 100
        }
        this.formSubmit = this.formSubmit.bind(this)
        this.onChangeTotal = this.onChangeTotal.bind(this)
        this.onChangeActive = this.onChangeActive.bind(this)
        this.onChangePending = this.onChangePending.bind(this)
        this.onChangeDeactive = this.onChangeDeactive.bind(this)
    }

    componentDidMount() {
        if (this.props.data) {
            const { total, active, deactive, pending } = this.props.data;
            this.setState({
                total: total,
                active: active,
                deactive: deactive,
                pending: pending
            })
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.data) {
            const { total, active, deactive, pending } = nextProps.data;
            this.setState({
                total: total,
                active: active,
                deactive: deactive,
                pending: pending
            })
        }
    }

    formSubmit(e) {
        e.preventDefault()
        const data = {
            ...this.props.basic,
            ...this.state
        }
        this.setState({
            submitting: true
        })
        this._service.saveActivity(data)
            .then((res) => {
                this.setState({
                    submitting: false
                })
            })
            .catch((err) => {
                this.setState({
                    submitting: false
                })
            })
    }

    onChangeTotal(e) {
        this.setState({
            total: e.target.value
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

    onChangeDeactive(e) {
        this.setState({
            deactive: e.target.value
        })
    }

    render() {
        return (
            <Grid>
                <div className="card">
                    <h3 className="card-header">{this.props.title}</h3>
                    <div className="card-body">
                        <Typography>Total Lives(million)</Typography>
                        <TextField
                            id="total"
                            InputProps={{
                                classes: {
                                },
                            }}
                            value={this.state.total}
                            onChange={this.onChangeTotal}
                            margin="normal"
                            placeholder="Total Lives( million )"
                            type="number"
                            fullWidth
                        />
                        <Typography>Active (%)</Typography>
                        <TextField
                            id="active"
                            InputProps={{
                                classes: {
                                },
                            }}
                            value={this.state.active}
                            onChange={this.onChangeActive}
                            margin="normal"
                            placeholder="Active(%)"
                            type="number"
                            fullWidth
                        />
                        <Typography>Pending (%)</Typography>
                        <TextField
                            id="pending"
                            InputProps={{
                                classes: {
                                },
                            }}
                            value={this.state.pending}
                            onChange={this.onChangePending}
                            margin="normal"
                            placeholder="Pending(%)"
                            type="number"
                            fullWidth
                        />
                        <Typography>Deactive (%)</Typography>
                        <TextField
                            id="deactive"
                            InputProps={{
                                classes: {
                                },
                            }}
                            value={this.state.deactive}
                            onChange={this.onChangeDeactive}
                            margin="normal"
                            placeholder="Deactive(%)"
                            type="number"
                            fullWidth
                        />
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

ServiceStatusForm.propTypes = {
    basic: PropTypes.shape({
        page: PropTypes.string,
        category: PropTypes.string,
        type: PropTypes.string
    }),
    title: PropTypes.string,
    api: PropTypes.string,
    data: PropTypes.object
}
