import axios from 'axios'
import { resolve } from 'url';
import { reject } from 'q';
// import config from '../constants/constants.config';
var server = 'https://exparel-server.herokuapp.com';

export default class OutPatientService{
    getGlobalStatus(){
        return new Promise((resolved, rejected) => {
            axios
            .get(`${server}/api/out-patient/global-status`)
            .then((res) => {
                resolved(res.data)
            })
            .catch((err) => {
                rejected(err)
            })
        });
    }

    saveActivity(data){
        return new Promise((resolved, rejected) => {
            axios
                .post(`${server}/api/out-patient/save-activity`, data)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }
}
