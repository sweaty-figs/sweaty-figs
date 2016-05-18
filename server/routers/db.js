'use strict';

const dbrouter = require('express').Router();
const axios = require('axios');

/**
 *  PLAN ROUTES ----------------------------------------------------
 */

dbrouter
  .route('/searchplans')
  .post((request, response) => {
    const city = request.body.city;

    axios.get(`https://sleepy-crag-32675.herokuapp.com/v1/plans?city__icontains=${city}&private__is=false`)
      .then(data => response.send(data.data))
      .catch(error => {
        console.log(error);
        response.send(error);
      });
  });

dbrouter
  .route('/createplan')
  .post((request, response) => {
    const plan = request.body.plan;
    const access_token = request.body.access_token;
    const activities = request.body.activities;
    const reqBody = Object.assign(plan, {
      activities: activities
    });

    axios.post(`https://sleepy-crag-32675.herokuapp.com/v1/plans?access_token=${access_token}`, reqBody)
      .then(data => response.send(data.data))
      .catch(error => {
        console.log('Error posting plans to db from server:', error);
        response.send(error);
      });
  });

dbrouter
  .route('/updateplan')
  .post((request, response) => {
    const plan = request.body.plan;
    const plan_id = request.body.plan_id;
    const access_token = request.body.access_token;
    const activities = request.body.activities;
    const reqBody = Object.assign(plan, {
      activities: activities
    });

    axios.put(`https://sleepy-crag-32675.herokuapp.com/v1/plans/${plan_id}?access_token=${access_token}`, reqBody)
    .then(data => response.send(data.data))
    .catch(error => {
      console.log(error);
      response.send(error);
    });
  });

dbrouter
  .route('/deleteplan')
  .post((request, response) => {
    const planID = request.body.planID;

    axios.delete(`https://sleepy-crag-32675.herokuapp.com/v1/plans/${planID}`)
      .then((data) => response.send(data.data))
      .catch(error => {
        console.log(error);
        response.send(error);
      });
  });

/**
 *  ACTIVITY ROUTES --------------------------------------------------
 */


module.exports = dbrouter;