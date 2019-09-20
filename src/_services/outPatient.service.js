import axios from 'axios'
import { resolve } from 'url';
import { reject } from 'q';
// import config from '../constants/constants.config';
// var server = 'https://exparel-server.herokuapp.com';
var server = 'http://localhost:5000';

export default class OutPatientService{
    getGlobalStatus(){
        return new Promise((resolved, rejected) => {
            axios
            .get(`${server}/api/exparel/global-status`)
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
                .post(`${server}/api/exparel/save-activity`, data)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    getTotalStatus() {
        return new Promise((resolved, rejected) => {
            axios
                .get(`${server}/api/exparel/total-status`)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    saveTotalStatus(data) {
        return new Promise((resolved, rejected) => {
            axios
                .post(`${server}/api/exparel/save-total`, data)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    getLiveStatus() {
        return new Promise((resolved, rejected) => {
            axios
                .get(`${server}/api/exparel/live-status`)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    saveLiveStatus(data) {
        return new Promise((resolved, rejected) => {
            axios
                .post(`${server}/api/exparel/live-status`, data)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    getOneActiveStatus(data) {
        return new Promise((resolved, rejected) => {
            axios
                .post(`${server}/api/exparel/get-active-status`, data)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    getOneTotalStatus(data) {
        return new Promise((resolved, rejected) => {
            axios
                .post(`${server}/api/exparel/get-total-status`, data)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    getOneLiveStatus(data) {
        return new Promise((resolved, rejected) => {
            axios
                .post(`${server}/api/exparel/get-live-status`, data)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    saveOneActiveStatus(data, page){
        return new Promise((resolved, rejected) => {
            axios
                .post(`${server}/api/exparel/set-active-status/${page}`, data)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    saveOneTotalStatus(data, page){
        return new Promise((resolved, rejected) => {
            axios
                .post(`${server}/api/exparel/set-total-status/${page}`, data)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    saveOneLiveStatus(data, page){
        return new Promise((resolved, rejected) => {
            axios
                .post(`${server}/api/exparel/set-live-status/${page}`, data)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    getTopPayers(type) {
        return new Promise((resolved, rejected) => {
            axios
                .get(`${server}/api/exparel/tops/${type}`)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    getOneTopPayer(id) {
        return new Promise((resolved, rejected) => {
            axios
                .get(`${server}/api/exparel/top/${id}`)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    createTopPayer(data) {
        return new Promise((resolved, rejected) => {
            axios
                .post(`${server}/api/exparel/create-tops`, data)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    updateTopPayer(data, id) {
        return new Promise((resolved, rejected) => {
            axios
                .post(`${server}/api/exparel/update-tops/${id}`, data)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    getPayerActiveData(type, payer){
        return new Promise((resolved, rejected) => {
            axios
                .get(`${server}/api/exparel/get-coalition-active/${type}/${payer}`)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    getPayerDetailData(type, payer) {
        return new Promise((resolved, rejected) => {
            axios
                .get(`${server}/api/exparel/get-coalition-detail/${type}/${payer}`)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    getPayerList(type) {
        return new Promise((resolved, rejected) => {
            axios
                .get(`${server}/api/exparel/get-coalition-list/${type}`)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    readPayerData(id) {
        return new Promise((resolved, rejected) => {
            axios
                .get(`${server}/api/exparel/get-coalition/${id}`)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    savePayerData(data, basic) {
        const { type, state, payer } = basic;
        return new Promise((resolved, rejected) => {
            axios
                .post(`${server}/api/exparel/edit-coalition-detail/${type}/${state}/${payer}`, data)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    getPayerPlanData(basic) {
        const { type, category, payer } = basic;
        return new Promise((resolved, rejected) => {
            axios
                .get(`${server}/api/exparel/get-coalition-plans/${type}/${category}/${payer}`)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    getPayerPlans(data) {
        const { type, category } = data;
        return new Promise((resolved, rejected) => {
            axios
                .get(`${server}/api/exparel/get-plans/${type}/${category}`)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    savePayerPlan(data, basic) {
        const { type, category } = basic;
        return new Promise((resolved, rejected) => {
            axios
                .post(`${server}/api/exparel/edit-plans/${type}/${category}`, data)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    getTotalPlan(data){
        const { type, category } = data;
        return new Promise((resolved, rejected) => {
            axios
                .get(`${server}/api/exparel/get-total-plan/${type}/${category}`)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    saveTotalPlan(data, basic) {
        const {type, category} = basic;
        return new Promise((resolved, rejected) => {
            axios
                .post(`${server}/api/exparel/edit-total-plan/${type}/${category}`, data)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    getPayers() {
        return new Promise((resolved, rejected) => {
            axios
                .get(`${server}/api/exparel/get-coalitions`)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }

    registerPayers(data) {
        return new Promise((resolved, rejected) => {
            axios
                .post(`${server}/api/exparel/save-coalition`, data)
                .then((res) => {
                    resolved(res.data)
                })
                .catch((err) => {
                    rejected(err)
                })
        })
    }
}
