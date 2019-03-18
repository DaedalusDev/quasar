import Vue from 'vue'

import DateTimeMixin from './datetime-mixin.js'
import QDate from './QDate'
import QTime from './QTime'

export default Vue.extend({
  name: 'QDatetime',

  mixins: [ DateTimeMixin ],

  render (h) {
    return h('div', {
      on: this.$listeners
    }, [
      h(QDate),
      h(QTime)
    ])
  }
})
