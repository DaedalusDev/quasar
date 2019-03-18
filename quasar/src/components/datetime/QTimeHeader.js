import Vue from 'vue'
import DateTimeMixin from './datetime-mixin'

export default Vue.extend({
  name: 'QTimeHeader',

  mixins: [ DateTimeMixin ],

  props: {
    format24h: Boolean,

    innerModel: {
      type: Object,
      required: true
    },

    stringModel: {
      type: Object,
      required: true
    },

    view: String

  },

  computed: {
    minLink () {
      return this.innerModel.hour !== null
    },

    secLink () {
      return this.minLink && this.innerModel.minute !== null
    }
  },

  methods: {
    __getLabel (h, k, b = true) {
      const kLow = k.toLowerCase()
      return h('div',
        b === true
          ? {
            staticClass: 'q-time__link',
            class: this.view === k ? 'q-time__link--active' : 'cursor-pointer',
            attrs: { tabindex: this.computedTabindex },
            on: {
              click: () => this.$emit('set-view', k),
              keyup: e => { e.keyCode === 13 && this.$emit('set-view', k) }
            }
          }
          : { staticClass: 'q-time__link' },
        [ this.stringModel[kLow] ])
    },

    __get12hLabel (h, k) {
      const kLow = k.toLowerCase()
      return h('div', {
        staticClass: 'q-time__link',
        class: this.isAM === true ? 'q-time__link--active' : 'cursor-pointer',
        attrs: { tabindex: this.computedTabindex },
        on: {
          click: () => this.$emit('set-' + kLow),
          keyup: e => { e.keyCode === 13 && this.$emit('set-' + kLow) }
        }
      }, [ k ])
    }
  },

  render (h) {
    const __getLabel = this.__getLabel
    const __get12hLabel = this.__get12hLabel

    const label = [
      __getLabel(h, 'Hour'),
      h('div', [ ':' ]),
      __getLabel(h, 'Minute', this.minLink)
    ]

    if (this.withSeconds === true) {
      label.push(
        h('div', [ ':' ]),
        __getLabel(h, 'Second', this.secLink)
      )
    }

    return h('div', {
      staticClass: 'q-time__header flex flex-center no-wrap',
      class: this.headerClass
    }, [
      h('div', {
        staticClass: 'q-time__header-label row items-center no-wrap',
        attrs: { dir: 'ltr' }
      }, label),

      this.format24h === false ? h('div', {
        staticClass: 'q-time__header-ampm column items-between no-wrap'
      }, [
        __get12hLabel(h, 'AM'),
        __get12hLabel(h, 'PM')
      ]) : null
    ])
  }
})
