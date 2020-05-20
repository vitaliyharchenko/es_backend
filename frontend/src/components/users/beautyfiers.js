import moment from "moment";

export const parseAge = dateString => {
    moment.locale('ru');
    const date = moment.parseZone(dateString);
    const formatDate = date.format("YYYYMMDD");
    return moment().diff(moment(formatDate, 'YYYYMMDD'), 'years');
};

export const parseHours = dateString => {
    moment.locale('ru');
    const date = moment.parseZone(dateString);
    return moment(date).fromNow();
};