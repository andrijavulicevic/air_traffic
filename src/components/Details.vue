<template>
  <div>
    <v-dialog v-model="detailsModal" persistent max-width="800">
      <v-card>
        <v-card-title class="headline">Flight {{ flightDetails.Reg }} details</v-card-title>
        <v-card-text>
          <v-layout row>
            <v-flex md4>
              <v-subheader class="mt-10">Airplane Manufacturer:</v-subheader>
            </v-flex>
            <v-flex md8>
              <v-text-field v-model="flightDetails.Man" readonly>
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex md4>
              <v-subheader class="mt-10">Airplane Model:</v-subheader>
            </v-flex>
            <v-flex md8>
              <v-text-field v-model="flightDetails.Mdl" readonly>
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-divider></v-divider>

          <v-layout row>
            <v-flex md4>
              <v-subheader class="mt-10">Destination Airport:</v-subheader>
            </v-flex>
            <v-flex md8>
              <v-text-field v-model="flightDetails.To" readonly>
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex md4>
              <v-subheader class="mt-10">Origin Airport:</v-subheader>
            </v-flex>
            <v-flex md8>
              <v-text-field v-model="flightDetails.From" readonly>
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-divider></v-divider>

          <v-layout row>
            <v-flex md4>
              <v-subheader class="mt-10">Airlane Company:</v-subheader>
            </v-flex>
            <v-flex md8>
              <v-text-field v-model="flightDetails.Op" readonly>
              </v-text-field>
            </v-flex>
          </v-layout>

          <!-- <img :src="logo"> -->
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
  },
  created () {
    document.addEventListener('keyup', this.closeModal)
  },
  beforeDestroy () {
    document.removeEventListener('keyup', this.closeModal)
  }
}
</script>

<style>
  .mt-10 {
    margin-top: 10px;
  }
</style>
