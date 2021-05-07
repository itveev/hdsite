/**
 * Created by fox on 15.11.17.
 */

const change = 'change';
const profile = 'profile';
const org = 'org';
const newOrg = 'newOrg';
const users = 'users';
const action = 'action';
const basic = 'basic';
const draft = 'draft';
const tickets = 'tickets';
const comments = 'comments';
const button = 'button';
const notification = 'notification';

const isAgent = 'isAgent';
const isChangeSubj = '';
const isAuth = 'isAuth';
const isCmn = 'isCmn';
const isInternal = 'isInternal';
const isTicket = 'isTicket';
const isProfile = 'isProfile';
const isCurPage = 'isCurPage';

const updMsgs = 'updMsgs';
// const loadMsgs = 'loadMsgs';
const updCount = 'updCount';

const updCmts = 'updCmts';

export default {
  method: {
    takeProp: 'takeProp',
    takeProps: 'takeProps',
    getProp: 'getProp',
    setProp: 'setProp',
    setDirtyState: 'setDirtyState',
    setCleanState: 'setCleanState',
    clearState: 'clearState',
    clearSetDirty: 'clearSetDirty',
    clearSetClean: 'clearSetClean',
    setComputedState: 'setComputedState',
    getCopy: 'getCopy',

    setUser: 'setUser',
    appendUser: 'appendUser',
    setUsers: 'setUsers',
    appendUsers: 'appendUsers',
    getUser: 'getUser',
    getUsers: 'getUsers',

    attachmentsPush: 'attachmentsPush',
    attachmentsSplice: 'attachmentsSplice',
  },
  id: {
    profile,
    org,
    newOrg,
    users,
    action,
    basic,
    draft,
    tickets,
    comments,
    button,
  },
  mutation: {
    change,
    notificationChange: `${notification}/${change}`,
    profileChange: `${profile}/${change}`,
    orgChange: `${org}/${change}`,
    newOrgChange: `${org}/${newOrg}/${change}`,
    usersChange: `${users}/${change}`,
    actionChange: `${action}/${change}`,
    basicChange: `${basic}/${change}`,
    draftChange: `${draft}/${change}`,
    ticketsChange: `${tickets}/${change}`,
    commentsChange: `${comments}/${change}`,
    buttonChange: `${button}/${change}`,
  },
  getters: {
    isAgent,
    profileIsAgent: `${profile}/${isAgent}`,
    isChangeSubj,
    profileIsChangeSubj: `${profile}/${isChangeSubj}`,

    isCurPage,
    basicIsCurPage: `${basic}/${isCurPage}`,
    isAuth,
    basicIsAuth: `${basic}/${isAuth}`,
    isCmn,
    basicIsCmn: `${basic}/${isCmn}`,
    isInternal,
    basicIsInternal: `${basic}/${isInternal}`,
    isTicket,
    basicIsTicket: `${basic}/${isTicket}`,
    isProfile,
    basicIsProfile: `${basic}/${isProfile}`,

    // all,
    // ticketsAll : `${tickets}/${all}`,
  },
  actions: {
    // loadMsgs,
    // ticketsLoadMsgs: `${tickets}/${loadMsgs}`,
    updMsgs,
    ticketsUpdMsgs: `${tickets}/${updMsgs}`,
    updCount,
    ticketsUpdCount: `${tickets}/${updCount}`,

    updCmts,
    commentsUpdCmts: `${comments}/${updCmts}`,
  },
};
