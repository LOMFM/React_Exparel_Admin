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
        this.onChangeDental = this.onChangeDental.bind(this)
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        this._service.getOneTotalStatus(this.props.basic)
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

    formSubmit(e) {
        e.preventDefault()
        const data = {
            ...this.props.basic,
            ...this.state
        }
        this.setState({
            submitting: true
        })
        this._service.saveOneTotalStatus(data, this.props.basic.page)
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

    onChangeDental(e){
        this.setState({
            dental: e.target.value
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
                        
                        {this.props.select && this.props.select.indexOf('asc') !== -1 ? (
                            <>
                            <Typography>ASC (%)</Typography>
                            <TextField
                            id="ASC"
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
                        </>
                        ) : ''}
                        {this.props.select && this.props.select.indexOf('hopd') !== -1 ? (
                            <>
                                <Typography>HOPD (%)</Typography>
                                <TextField
                                    id="HOPD"
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
                            </>    
                        ): ''}
                        {this.props.select && this.props.select.indexOf('dental') !== -1 ? (
                            <>
                                <Typography>Dental (%)</Typography>
                                <TextField
                                    id="Dental"
                                    InputProps={{
                                        classes: {
                                        },
                                    }}
                                    value={this.state.dental}
                                    onChange={this.onChangeDental}
                                    margin="normal"
                                    placeholder="Dental(%)"
                                    type="number"
                                    fullWidth
                                />
                            </>    
                        ): ''}
                        
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
