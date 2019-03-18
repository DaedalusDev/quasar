import Vue from 'vue'
import DateTimeMixin from './datetime-mixin'
import QBtn from '../btn/QBtn'
import { toGregorian } from './persian'

export default Vue.extend({
  name: 'QDateHeader',

  mixins: [ DateTimeMixin ],

  props: {
    calendar: {
      type: String,
      validator: v => [ 'gregorian', 'persian' ].includes(v),
      default: 'gregorian'
    },

    extModel: {
      type: Object,
      required: true
    },

    todayBtn: Boolean
  },

  computed: {
    headerSubtitle () {
      return this.extModel.year !== null
        ? this.extModel.year
        : ' --- '
    },

    headerTitle () {
      const model = this.extModel
      if (model.value === null) { return ' --- ' }

      let date

      if (this.calendar !== 'persian') {
        date = new Date(model.year, model.month - 1, model.day)
      }
      else {
        const gDate = toGregorian(model.year, model.month, model.day)
        date = new Date(gDate.gy, gDate.gm - 1, gDate.gd)
      }

      if (isNaN(date.valueOf())) { return ' --- ' }

      if (this.$q.lang.date.headerTitle !== void 0) {
        return this.$q.lang.date.headerTitle(date, model)
      }

      return this.$q.lang.date.daysShort[date.getDay()] + ', ' +
        this.$q.lang.date.monthsShort[model.month - 1] + ' ' +
        model.day
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'q-date__header',
      class: this.headerClass
    }, [
      h('div', {
        staticClass: 'relative-position'
      }, [
        h('transition', {
          props: {
            name: 'q-transition--fade'
          }
        }, [
          h('div', {
            key: 'h-yr-' + this.headerSubtitle,
            staticClass: 'q-date__header-subtitle q-date__header-link',
            class: this.view === 'Years' ? 'q-date__header-link--active' : 'cursor-pointer',
            attrs: { tabindex: this.computedTabindex },
            on: {
              click: () => { this.$emit('set-view', 'Years') },
              keyup: e => { e.keyCode === 13 && this.$emit('set-view', 'Years') }
            }
          }, [ this.headerSubtitle ])
        ])
      ]),

      h('div', {
        staticClass: 'q-date__header-title relative-position flex no-wrap'
      }, [
        h('div', {
          staticClass: 'relative-position col'
        }, [
          h('transition', {
            props: {
              name: 'q-transition--fade'
            }
          }, [
            h('div', {
              key: this.value,
              staticClass: 'q-date__header-title-label q-date__header-link',
              class: this.view === 'Calendar' ? 'q-date__header-link--active' : 'cursor-pointer',
              attrs: { tabindex: this.computedTabindex },
              on: {
                click: () => { this.$emit('set-view', 'Calendar') },
                keyup: e => { e.keyCode === 13 && this.$emit('set-view', 'Calendar') }
              }
            }, [ this.headerTitle ])
          ])
        ]),

        this.todayBtn === true ? h(QBtn, {
          staticClass: 'q-date__header-today',
          props: {
            icon: this.$q.iconSet.datetime.today,
            flat: true,
            size: 'sm',
            round: true,
            tabindex: this.computedTabindex
          },
          on: {
            click: () => this.$emit('set-today')
          }
        }) : null
      ])
    ])
  }
})
