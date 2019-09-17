import React, {Component} from 'react';
import {
    Grid,
    CircularProgress,
    Typography,
    Button,
    TextField,
    Fade,
} from "@material-ui/core";

import OutPatientService from '../../_services/outPatient.service';

export default class LiveStatusForm extends Component {

    _service = new OutPatientService

    constructor(props){
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
        this._service.saveLiveStatus(data)
            .then((res) => {
                this.setState({
                    submitting: false
                })
                this.props.change(res.data);
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

    render(){
        return (
            <Grid row className="flex-row">          
                <TextField
                    id="total"
                    InputProps={{
                        classes: {
                        },
                    }}
                    value={this.state.total}
                    onChange={this.onChangeTotal}
                    margin="normal"
                    placeholder="Total Lives"
                    type="number">
                </TextField>
                <TextField
                    id="asc"
                    value={this.state.asc}
                    onChange={this.onChangeASC}
                    margin="normal"
                    placeholder="ASC Lives"
                    type="number">
                </TextField>
                <TextField
                    id="hopd"
                    value={this.state.hopd}
                    onChange={this.onChangeHOPD}
                    margin="normal"
                    placeholder="HOPD Lives"
                    type="number">
                </TextField>
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
            </Grid>
        )
    }
}