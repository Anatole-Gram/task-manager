class DateConverter {
    static expForDBDate =  /(?<date>(?<year>\d{4})-(?<day>\d{2})-(?<month>\d{2}))T(?<time>(?<hours>\d{2}):(?<minutes>\d{2})(?=:\d{2}))/i;
    constructor(date) {
        this._date = date
        this.groups = new Map()
        this._setGroups()
    }
    _setGroups() { Object.entries(this._date.match(DateConverter.expForDBDate).groups).forEach(el => this.groups.set(...el)) }
    getGroups() { return this.groups }
}

class MyDate extends DateConverter {
    constructor(date) {
        super(date)
    }
    getFullDate() { return `${this.getDate()} ${this.getTime()}` }
    getDate() { return this.groups.get('date').replace(/-/g, '.')}
    getDay() { return this.groups.get('day') }
    getMonth() { return this.groups.get('month') }
    getYear() { return this.groups.get('year') }
    getTime() { return this.groups.get('time') }
    getHours() { return this.groups.get('hours') }
    getMinutes() { return this.groups.get('minutes') }
}

export {MyDate, DateConverter}