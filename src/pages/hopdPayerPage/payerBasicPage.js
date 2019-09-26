import React, { Component } from 'react';
import { Grid } from "@material-ui/core";

import ServiceStatusForm from '../forms/ServiceStatusForm';
import TotalStatusForm from '../forms/TotalStatusForm';
import LiveStatusForm from '../forms/LiveStatusForm';

export default class HOPDPayerBasicPage extends Component {

    render() {
        return (
            <>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} lg={4}>
                        <ServiceStatusForm title="Total Covered HOPD" basic={{page: 'hopdPayer', category: '', type: ''}}></ServiceStatusForm>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} lg={4}>
                        <TotalStatusForm title="Percent of Total" basic={{page: 'hopdPayer', category: '', type: ''}} select={['hopd']}></TotalStatusForm>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} lg={4}>
                        <LiveStatusForm title="HOPD Penetration" basic={{type: 'hopd'}}></LiveStatusForm>
                    </Grid>
                </Grid>
            </>
        )
    }
}