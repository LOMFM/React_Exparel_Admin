import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import ServiceStatusForm from './ServiceStatusForm';
import TotalStatusForm from './TotalStatusForm';
import OutPatientService from '../../_services/outPatient.service';

export default class PatientGlobalStatus extends Component {
    _service = new OutPatientService;
    constructor(){
        super()
        this.state = {
            page: "patient",
            loading : false,
        }
    }

    componentDidMount(){
        this.setState({loading: true})
        this._service.getGlobalStatus()
            .then((data) => {
                var global = {};
                data.data.forEach( e => {
                    if( e.category && e.type ){
                        global[e.category + "_" + e.type] = e
                    }
                })
                this.setState({
                    global: global
                })

                this.setState({loading: false})
            })
            .catch(err => {
                if(!err){
                }
                this.setState({loading: false})
            })
    }


    render() {
        return (
            <>
                <PageTitle title="National Payer Out-Patient" />
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} lg={3}>
                        <ServiceStatusForm title="Medicare ASC" basic={{page: 'patient', category: 'medicare', type: 'asc'}} data={this.state.global ? this.state.global['medicare_asc']: {}}></ServiceStatusForm>
                        <ServiceStatusForm title="Medicare HOPD" basic={{page: 'patient', category: 'medicare', type: 'hopd'}} data={this.state.global ? this.state.global['medicare_hopd']: {}}></ServiceStatusForm>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <ServiceStatusForm title="Commerical ASC" basic={{page: 'patient', category: 'commercial', type: 'asc'}} data={this.state.global ? this.state.global['commercial_asc']: {}}></ServiceStatusForm>
                        <ServiceStatusForm title="Commerical HOPD" basic={{page: 'patient', category: 'commercial', type: 'hopd'}} data={this.state.global ? this.state.global['commercial_hopd']: {}}></ServiceStatusForm>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <ServiceStatusForm title="Medicaid ASC" basic={{page: 'patient', category: 'medicaid', type: 'asc'}} data={this.state.global ? this.state.global['medicaid_asc']: {}}></ServiceStatusForm>
                        <ServiceStatusForm title="Medicaid HOPD" basic={{page: 'patient', category: 'medicaid', type: 'hopd'}} data={this.state.global ? this.state.global['medicaid_hopd']: {}}></ServiceStatusForm>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <ServiceStatusForm title="VA/DOD ASC" basic={{page: 'patient', category: 'va', type: 'asc'}} data={this.state.global ? this.state.global['va_asc']: {}}></ServiceStatusForm>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} lg={3}>
                        <TotalStatusForm title="Medicare Total" basic={{page: 'patient', category: 'medicare'}}></TotalStatusForm>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TotalStatusForm title="Commercial Total" basic={{page: 'patient', category: 'commercial'}}></TotalStatusForm>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TotalStatusForm title="Medicaid Total" basic={{page: 'patient', category: 'medicaid'}}></TotalStatusForm>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TotalStatusForm title="VA/DOD Total" basic={{page: 'patient', category: 'va'}}></TotalStatusForm>
                    </Grid>
                </Grid>
            </>
        )
    }
}
