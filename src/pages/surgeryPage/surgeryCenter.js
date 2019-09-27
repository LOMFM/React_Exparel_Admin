import React, { Component } from 'react';
import { Grid } from "@material-ui/core";

import SurgeryStatusForm from '../forms/surgeryStatusForm';
import SurgeryUsageForm from '../forms/surgeryUsageForm';

export default class SurgeryCenterPage extends Component {
    constructor(){
        super()
    }

    render() {
        return (
            <>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} lg={3}>
                        <SurgeryStatusForm title="Out Patient Surgery ASC" ></SurgeryStatusForm>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <SurgeryUsageForm title="Out Patient Surgery HOPD" type={"hopd_usage"}></SurgeryUsageForm>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <SurgeryUsageForm title="In Patient Surgery" type={"in_patient"}></SurgeryUsageForm>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <SurgeryUsageForm title="In Patient Surgery VA" type={"va_patient"}></SurgeryUsageForm>
                    </Grid>
                </Grid>
            </>
        )
    }
}