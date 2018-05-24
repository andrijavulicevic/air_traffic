<template>
  <div>
    <v-dialog v-model="detailsModal" persistent max-width="800">
      <v-card>
        <v-card-title class="headline">Flight {{ flightDetails.Reg }} details</v-card-title>
        <v-card-text>
          <p>Airplane Manufacturer: <span>{{ flightDetails.Man }}</span></p>
          <v-spacer></v-spacer>
          <p>Airplane Model: <span>{{ flightDetails.Mdl }}</span></p>
          <v-spacer></v-spacer>
          <p>Destination Airport: <span>{{ flightDetails.To }}</span></p>
          <p>Origin Airport: <span>{{ flightDetails.From }}</span></p>
          <p>Airlane Company: <span>{{ flightDetails.Op }}</span></p>
          <img :src="logo">
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="" flat @click="closeModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    flightDetails: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      detailsModal: true
    }
  },
  computed: {
    logo () {
      return `//logo.clearbit.com/${this.flightDetails.Op}`
    }
  },
  methods: {
    closeModal () {
      this.detailsModal = false
      this.$emit('close')
    }
  }

}
</script>
