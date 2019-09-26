import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import ServiceStatusForm from '../forms/ServiceStatusForm';
import TotalStatusForm from '../forms/TotalStatusForm';

export default class PatientGlobalStatus extends Component {

    render() {
        return (
            <>
                <PageTitle title="National Payer Out-Patient" />
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} lg={3}>
                        <ServiceStatusForm title="Medicare ASC" basic={{page: 'patient', category: 'medicare', type: 'asc'}} ></ServiceStatusForm>
                        <ServiceStatusForm title="Medicare HOPD" basic={{page: 'patient', category: 'medicare', type: 'hopd'}} ></ServiceStatusForm>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <ServiceStatusForm title="Commerical ASC" basic={{page: 'patient', category: 'commercial', type: 'asc'}} ></ServiceStatusForm>
                        <ServiceStatusForm title="Commerical HOPD" basic={{page: 'patient', category: 'commercial', type: 'hopd'}}></ServiceStatusForm>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <ServiceStatusForm title="Medicaid ASC" basic={{page: 'patient', category: 'medicaid', type: 'asc'}} ></ServiceStatusForm>
                        <ServiceStatusForm title="Medicaid HOPD" basic={{page: 'patient', category: 'medicaid', type: 'hopd'}}></ServiceStatusForm>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <ServiceStatusForm title="VA/DOD ASC" basic={{page: 'patient', category: 'va', type: 'hopd'}} ></ServiceStatusForm>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} lg={3}>
                        <TotalStatusForm title="Medicare Total" basic={{page: 'patient', category: 'medicare', type: ''}} select={['asc', 'hopd']}></TotalStatusForm>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TotalStatusForm title="Commercial Total" basic={{page: 'patient', category: 'commercial', type: ''}} select={['asc', 'hopd']}></TotalStatusForm>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TotalStatusForm title="Medicaid Total" basic={{page: 'patient', category: 'medicaid', type: ''}} select={['asc', 'hopd']}></TotalStatusForm>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TotalStatusForm title="VA/DOD Total" basic={{page: 'patient', category: 'va', type: ''}} select={['asc', 'hopd']}></TotalStatusForm>
                    </Grid>
                </Grid>
            </>
        )
    }
}
