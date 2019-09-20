import React, { Component } from 'react';
import { Grid } from "@material-ui/core";

import OutPatientService from '../../_services/outPatient.service';
import ServiceStatusForm from '../forms/ServiceStatusForm';
import TotalStatusForm from '../forms/TotalStatusForm';
import LiveStatusForm from '../forms/LiveStatusForm';

export default class DentalPayerBasic extends Component {

    _service = new OutPatientService

    constructor() {
        super()
    }

    render() {
        return (
            <>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} lg={4}>
                        <ServiceStatusForm title="Total Covered ASC" basic={{page: 'dentalPayer', category: '', type: ''}}></ServiceStatusForm>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} lg={4}>
                        <TotalStatusForm title="Percent of Total" basic={{page: 'dentalPayer', category: '', type: ''}} select={['dental']}></TotalStatusForm>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} lg={4}>
                        <LiveStatusForm title="ASC Penetration" basic={{type: 'dental'}}></LiveStatusForm>
                    </Grid>
                </Grid>
            </>
        )
    }
}