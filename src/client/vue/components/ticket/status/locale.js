/**
 * Created by fox on 18.09.17.
 */

import ppid from '@/str/ptcl/prop';

const status = ppid.status.comment;
export default {
  en: {
    [status.caption]: '{user} changed subject from "{old}" to "{new}"',
    [status.note]: '{user} added a note: "{note}".',
    [status.close]: '{user} closed the ticket.',
    [status.assigned]: '{user} assigned the ticket to {toUser}.',
    [status.priority]: '{user} set priority to {priority}',
  },
  ru: {
    [status.caption]: '{user} изменил заголовок с "{old}" на "{new}"',
    [status.note]: '{user} добавил заметку: "{note}"',
    [status.close]: '{user} закрыл сообщение.',
    [status.assigned]: '{user} назначил сообщение {toUser}.',
    [status.priority]: '{user} установил приоритет {priority}',
  },
};
