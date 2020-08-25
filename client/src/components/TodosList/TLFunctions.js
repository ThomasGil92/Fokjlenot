import { updateTodoCategory } from '../../actions'
import moment from 'moment'
import 'moment/locale/fr'



export const setTimeLeft = (dl, now) => {
    const hours_left = moment(dl).diff(moment(now), 'hours')
    const days_left = moment(dl).diff(moment(now), 'days')
    const months_left = moment(dl).diff(moment(now), 'months')
    const years_left = moment(dl).diff(moment(now), 'years')
    if (months_left > 12) {
        return years_left + " années restantes"
    }
    if (months_left > 1) {
        return months_left + " mois restants"
    }
    if (days_left < 4) {
        return hours_left + " heures restantes"
    } else {
        return days_left + " jours restants"
    }
}