import moment from 'moment';

export function getStringDate(date) {
    const year = moment(date).diff(moment(new Date()), 'years');
    if(year !== 0){
        return moment(date).format('YY. MM. DD')
    }
    const month = moment(date).diff(moment(new Date()), 'months');
    if(month !== 0){
        return moment(date).format('MM월 DD일')
    }
    const day = moment(date).diff(moment(new Date()), 'days');
    if(day !== 0){
        return  moment(date).format('MM월 DD일')
    }
    return moment(date).format('h:mm a')

}

export function getFullDate (date) {
    const year = moment(date).diff(moment(new Date()), 'years');
    if(year !== 0){
        return moment(date).format('YY. MM. DD h:mm a')
    }
    const month = moment(date).diff(moment(new Date()), 'months');
    if(month !== 0){
        return moment(date).format('MM월 DD일 h:mm a')
    }
    const day = moment(date).diff(moment(new Date()), 'days');
    if(day !== 0){
        return  moment(date).format('MM월 DD일 h:mm a')
    }
    return moment(date).format('h:mm a')
}
