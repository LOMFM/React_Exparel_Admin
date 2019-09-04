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

export default class TotalStatusForm extends Component {

    _service = new OutPatientService;

    constructor(props) {
        super(props)
        this.state = {
            total: 0,
            asc: 0,
            hopd: 0,
        }
        this.formSubmit = this.formSubmit.bind(this)
        this.onChangeTotal = this.onChangeTotal.bind(this)
        this.onChangeASC = this.onChangeASC.bind(this)
        this.onChangeHOPD = this.onChangeHOPD.bind(this)
    }

    componentDidMount() {
        if (this.props.data) {
            const { total, asc, hopd } = this.props.data;
            this.setState({
                total: total,
                asc: asc,
                hopd: hopd
            })
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.data) {
            const { total, asc, hopd } = nextProps.data;
            this.setState({
                total: total,
                asc: asc,
                hopd: hopd
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

    onChangeASC(e) {
        this.setState({
            asc: e.target.value
        })
    }

    onChangeHOPD(e) {
        this.setState({
            hopd: e.target.value
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
                        <Typography>ASC (%)</Typography>
                        <TextField
                            id="active"
                            InputProps={{
                                classes: {
                                },
                            }}
                            value={this.state.asc}
                            onChange={this.onChangeASC}
                            margin="normal"
                            placeholder="ASC(%)"
                            type="number"
                            fullWidth
                        />
                        <Typography>HOPD (%)</Typography>
                        <TextField
                            id="pending"
                            InputProps={{
                                classes: {
                                },
                            }}
                            value={this.state.hopd}
                            onChange={this.onChangeHOPD}
                            margin="normal"
                            placeholder="HOPD(%)"
                            type="number"
                            fullWidth
                        />
                        {this.state.submitting ? (
                            <div className="loader"><CircularProgress size={26}/></div>
                        ) : (
                                <Button
                                    onClick={this.formSubmit}
                                    variant="contained"
                                    color="warning"
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

TotalStatusForm.propTypes = {
    basic: PropTypes.shape({
        page: PropTypes.string,
        category: PropTypes.string,
    }),
    title: PropTypes.string,
    api: PropTypes.string,
    data: PropTypes.object
}
