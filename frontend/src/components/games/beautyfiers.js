import * as moment from 'moment';
import 'moment/locale/ru';

export const parseDate = dateString => {
    const date = moment.parseZone(dateString);
    return {
        date: date.format("D MMM, dddd"),
        date_short: date.format("D MMM, dd"),
        time: date.format("HH:mm")
    };
};

export const parseDuration = durationString => {
    const duration = moment.duration(durationString);
    if (duration.asMinutes() % 60 === 0) {
        return `${duration.asHours()} ч`;
    } else {
        return `${duration.asMinutes()} мин`;
    }
};

export const parseInterval = (dateString, durationString) => {
    const date = moment.parseZone(dateString);

    const date1 = moment.parseZone(dateString);
    const duration = moment.duration(durationString);
    date1.add(duration.asMinutes(), 'minutes');

    return {
        start: date.format("HH:mm"),
        finish: date1.format("HH:mm")
    };
};