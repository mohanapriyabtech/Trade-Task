import express from 'express';

import { adminSignup } from '../../api/v1/admin/admin-controller/sign-up'
import { loginRequest, userLogin } from '../../api/v1/user/user-controller/login';
import { registerRequest, userRegister } from '../../api/v1/user/user-controller/register';
import { usersList } from '../../api/v1/user/user-controller/list';
import { getAllTrade, getAllTradeDetails, pagination, search } from '../../api/v1/trade/trade-controller/trade-controller';
import { paginate } from 'mongoose-paginate-v2';

const v1Router = express.Router();

/**
 * User module routes 
 */
// v1Router.get('/users/list', [], usersList);
// v1Router.post('/users/auth/login', userLogin);

v1Router.get('/get-trade-details',[],getAllTradeDetails);
v1Router.get('/pagination',[],pagination);
v1Router.get('/search',[],search);

/**
 * admin module routes
 */
// v1Router.get('/admin/auth/signup',[],adminSignup)

module.exports = v1Router ;