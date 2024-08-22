function validateMinion(minion) {
    if (typeof minion.id !== 'string') return 'Invalid id';
    if (typeof minion.name !== 'string') return 'Invalid name';
    if (typeof minion.title !== 'string') return 'Invalid title';
    if (typeof minion.salary !== 'number') return 'Invalid salary';
    return null;
}

function validateIdea(idea) {
    if (typeof idea.id !== 'string') return 'Invalid id';
    if (typeof idea.name !== 'string') return 'Invalid name';
    if (typeof idea.description !== 'string') return 'Invalid description';
    if (typeof idea.numWeeks !== 'string') return 'Invalid numWeeks';
    if (typeof idea.weeklyRevenue !== 'string') return 'Invalid weeklyRevenue';
    return null;
}

function validateMeeting(meeting) {
    if (typeof meeting.time !== 'string') return 'Invalid time';
    if (!(typeof meeting.date instanceof Date)) return 'Invalid date';
    if (typeof meeting.day !== 'string') return 'Invalid day';
    if (typeof meeting.note !== 'string') return 'Invalid note';
    return null;
}

module.exports = {
    validateMinion,
    validateIdea,
    validateMeeting
};