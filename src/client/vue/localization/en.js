/**
 * Created by lucky on 25.11.15.
 */
import sid from '@/str/id';

export default {
  button: {
    cancel: 'Cancel',
    create: {
      btnName: '+ Create',
      projectName: 'Project name',
      fullName: 'Full name',
      email: 'Email address',
      cancel: 'Cancel',
      createProject: 'Create project',
      project: 'Project',
      createUser: 'Create user',
      user: 'User',
      createTicket: 'Create ticket',
      ticket: 'Ticket',
    },
    projects: {
      btnName: 'McNuggets',
    },
    actions: {
      btnName: 'Actions',
    },
    post: {
      customerPost: 'Post reply',
      agentReply: 'Post as reply',
      agentNote: 'Post as note',
      saveMacro: 'Save as macro',
    },
    assign: {
      btnName: 'Assign',
    },
    priority: {
      btnName: 'Priority',
    },
    status: {
      btnName: 'Status',
    },
    tag: {
      btnName: 'Tag',
      tagsText: 'Tags',
      submitTag: 'Add tags',
    },
    macro: {
      btnName: 'Macro',
    },
    merge: {
      btnName: 'Merge',
    },
    trash: {
      btnName: 'Trash',
    },
  },
  personal: {
    header: 'Personal info',
    display: 'Full name',
    nick: 'User name',
    role: 'Role',
    sign: 'Signature',
  },
  contact: {
    header: 'Contact info',
    email: 'Email address',
    wphone: 'Work phone',
    pphone: 'Personal phone',
  },
  other: {
    header: 'Other info',
    lang: 'Language',
    tzone: 'Time zone',
  },
  oauth: {
    sin: 'Sign in',
    sup: 'Sign up',
    or: 'or',
    email: 'E-mail',
    pass: 'Password',
  },
  register: {
    header: 'Tell us about your company',
    name: 'Company name',
    domain: 'Domain',
    employees: 'Number of employees',
    country: 'Country',
    create: 'Create my HelpDesk',
  },
  start: {
    header: 'Get started with HelpDesk',
    sign: 'Sign up with',
    or: 'or',
    fnm: 'Full name',
    email: 'E-mail',
    pwd: 'Password',
    next: 'Next',
  },
  tickets: {
    lname: 'All tickets',
    mid: 'ID',
    num: 'ID',
    subject: 'Subject',
    owner: 'Customer',
    date: 'Updated',
    priority: 'Priority',
    status: 'Status',
    updated: 'Updated',
    agent: 'Agent',
  },
  back: {
    text: 'Back to tickets',
  },
  search: {
    text: 'Search for anything',
  },
  userPanel: {
    text: 'Help',
  },
  list: {
    tickets: 'Tickets',
    departments: 'Tickets by department',
    agents: 'Direct messages',
    tags: 'Popular tags',
    profile: 'My profile',
  },
  reply: {
    reply: 'Reply',
    note: 'Note',
    place: 'Enter reply here',
    attach: 'Attach files',
    customerPost: 'Post reply',
    agentReply: 'Post as reply',
    agentNote: 'Post as note',
    saveMacro: 'Save as macro',
  },
  actions: {
    commentActions: 'Actions',
    assign: 'Assign',
    status: 'Status',
    priority: 'Priority',
    tag: 'Tag',
    macro: '+ Macro',
    merge: 'Merge',
    trash: 'Trash',
  },
  status: {
    status_comment_change_caption: 'BATMAN changed subject from {old} to {new}',
  },
  titles: {
    [sid.all]: 'All tickets',
    [sid.fresh]: 'Unassigned',
    [sid.active]: 'My tickets',
    [sid.draft]: 'Drafts',
    [sid.solved]: 'Closed',
  },
};
