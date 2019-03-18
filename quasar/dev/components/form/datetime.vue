<template>
  <div class="q-layout-padding" :class="dark ? 'bg-black text-white' : null">
    <div style="max-width: 600px" class="q-gutter-y-md">
      <div class="q-gutter-x-md">
        <q-toggle :dark="dark" v-model="dark" label="Dark" />
        <q-toggle :dark="dark" v-model="disable" label="Disable" />
        <q-toggle :dark="dark" v-model="readonly" label="Readonly" />
        <q-toggle :dark="dark" v-model="fullWidth" label="Full Width" />
        <q-toggle :dark="dark" v-model="biggerHeight" label="More Height" />
        <q-toggle :dark="dark" v-model="minimal" label="Minimal" />
        <q-toggle :dark="dark" v-model="todayBtn" label="Today Button" />
        <q-toggle :dark="dark" v-model="persian" label="Persian calendar model" />
      </div>

      <div>{{ datetime }}</div>

      <q-datetime v-model="datetime" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dark: false,
      disable: false,
      readonly: false,
      fullWidth: false,
      biggerHeight: false,
      minimal: false,
      todayBtn: false,

      datetime: {
        date: '2018/11/03',
        time: '05:30'
      },
      nullDatetime: null,

      persian: false,

      input: null
    }
  }
}
</script>

<style scoped>

</style>
