/**
 * Created by lucky on 15.01.16.
 */
import hdId from './hd';
import apiId from './api';
import sid from './id';
// const proj
const hostName = hdId.domainName;
const prodHostName = hdId.domainName;
const localHostName = 'localhost';
const sandboxHostName = 'sandbox.org.ru';
const protocol = 'https://';
const social = '/social';
const usrCmn = '/user';

const susr = sid.usr;
const sorg = sid.org;
const sdata = sid.data;
const smsg = sid.msg;

const origin = `${protocol}${hostName}`;
const svc = `${protocol}api.${hostName}`;
const msgSvc = `${svc}/${smsg}`;
const orgSvc = `${svc}/${sorg}`;
const usrSvc = `${svc}/${susr}`;
const dataSvc = `${svc}/${sdata}`;

export const external = {
  origin,
  svc,
  msgSvc,
  orgSvc,
  usrSvc,
  dataSvc,
  hostName,
  localHostName,
  prodHostName,
  sandboxHostName,
  orgLogo: `${dataSvc}?m=${apiId.data.getData}&src=${sorg}&id=`,
  userAva: `${dataSvc}?m=${apiId.data.getData}&src=${susr}&auth=`,
  attachment: `${dataSvc}?m=${apiId.data.getData}&src=${smsg}&auth=`,
  socialWnd: `${origin}${social}`,
  // redirect:'http://kobets.me',
};

export const internal = {
  blank: '',
  defaultUrl: '/',
  social,
  appearance: '/appearance',
  activity: '/activity',
  action: '/action',
  index: '/index',
  changePlan: '/change',
  dashboard: '/dashboard',
  signin: '/signin',
  signup: '/signup',
  submit: '/submit',
  createUser: '/create-user',
  setPass: '/set-pass',
  updPass: '/upd-pass',
  resetPass: '/reset-pass',
  ticket: '/ticket',
  tickets: '/tickets',
  profile: '/profile',
  users: '/users',
  user: `${usrCmn}/:id`,
  knowlegeBase: '/kb',
  settings: '/settings',
  draft: '/draft',
  register: '/register',
  login: '/login',
};

export const extra = {
  usrCmn,
  logOut: '#',
  notFound: '/404',
  asterisk: '/*',
  siteSvcReport: '/api/site/report',
};

export const landing = {
  help: '/help',
  terms: '/terms',
};
