import React, { Component } from 'react';
import { Grid, Button } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import LiveStatusForm from './liveStatusForm';
import '../../_styles/table.css';
import OutPatientService from '../../_services/outPatient.service';

export default class PatientLiveStatus extends Component {
    _service = new OutPatientService;
    constructor(){
        super()
        this.state = {
            page: "patient",
            loading : false,
        }
        this.addData = this.addData.bind(this)
    }

    addData() {
        var data = this.state.data
        data.push({total: 0, asc: 0, hopd: 0})
        this.setState({
            data: data
        })
    }

    componentDidMount(){
        this.setState({loading: true})
        this._service.getLiveStatus()
            .then((data) => {
                this.setState({data: data.data})
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
                <Grid className="block">
                    <Grid container className="form-table">
                        <Grid row className="flex-row header">
                            <label>Total Lives</label>
                            <label>ASC Lives</label>
                            <label>HOPD Lives</label>
                            <label>Action</label>
                        </Grid>
                        {this.state.data ? this.state.data.map((data, index) => {
                        return (<LiveStatusForm data={data} basic={{page: 'patient', _id: data._id}}></LiveStatusForm>)
                        }):""}
                    </Grid>
                </Grid>
                    <Grid>
                        <Button
                            onClick={this.addData}
                            variant="contained"
                            color="primary"
                            size="large"
                            >
                            Add
                        </Button>
                    </Grid>                 
            </>
        )
    }
}
