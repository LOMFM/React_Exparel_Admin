import React, { Component } from 'react';
import { Grid } from "@material-ui/core";

import ServiceStatusForm from '../forms/ServiceStatusForm';
import TotalStatusForm from '../forms/TotalStatusForm';

export default class DentalPayerStatisticsPage extends Component {
    constructor(){
        super()
    }

    render() {
        return (
            <>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} lg={4}>
                        <ServiceStatusForm title="Total Covered Dental" basic={{page: 'dentalPage', category: 'medicare', type: 'dental'}}></ServiceStatusForm>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <ServiceStatusForm title="Total Covered Dental" basic={{page: 'dentalPage', category: 'commercial', type: 'dental'}}></ServiceStatusForm>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <ServiceStatusForm title="Total Covered Dental" basic={{page: 'dentalPage', category: 'medicaid', type: 'dental'}}></ServiceStatusForm>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} lg={4}>
                        <TotalStatusForm title="Percent of Total" basic={{page: 'dentalPage', category: 'medicare', type: ''}} select={['dental']}></TotalStatusForm>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <TotalStatusForm title="Percent of Total" basic={{page: 'dentalPage', category: 'commercial', type: ''}} select={['dental']}></TotalStatusForm>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <TotalStatusForm title="Percent of Total" basic={{page: 'dentalPage', category: 'medicaid', type: ''}} select={['dental']}></TotalStatusForm>
                    </Grid>
                </Grid>
            </>
        )
    }
}