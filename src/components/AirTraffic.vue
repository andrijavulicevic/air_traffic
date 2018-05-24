<template>
  <div class="main">
    <v-layout v-if="locationDisabled" row justify-center>
      <v-flex md10 offset-1>
        <v-alert :value="true" type="warning" class="display-1">
          Please, enable location in browser to continue to application!
        </v-alert>
      </v-flex>
    </v-layout>
    <div v-else>
      <v-layout justify-center v-if="loading">
        <loader></loader>
      </v-layout>

      <v-layout v-else justify-center >
        <v-flex md10 offset-1>
          <v-data-table
            v-if="!loading && loaded"
            :pagination.sync="pagination"
            :headers="headers"
            :items="data.acList"
            :rowsPerPageText="rowsPerPageText"
            class="elevation-1">
            <template slot="items" slot-scope="props">
              <tr @click="openDetails(props.item)">
                <td>
                  <v-icon
                    :class="{'west-bound': props.item.Alt % 2 === 1, 'east-bound': props.item.Alt % 2 === 0}">
                    airplanemode_active
                  </v-icon>
                </td>
                <td class="text-xs-left">{{ props.item.Alt }}</td>
                <td class="text-xs-left">{{ props.item.Reg }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </div>

    <v-layout v-if="error" row justify-center>
      <v-flex md10 offset-1>
        <v-alert :value="true" type="error" class="display-1">
          {{error}}
        </v-alert>
      </v-flex>
    </v-layout>

    <flight-details
      v-if="showDetails"
      @close="closeDetails"
      :flightDetails="selectedFlight">
    </flight-details>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Loader from '@/components/Loader'
import FlightDetails from '@/components/Details'

export default {
  components: {
    FlightDetails,
    Loader
  },
  data () {
    return {
      location: null,
      locationDisabled: false,
      headers: [
        { text: 'Direction', value: '', sortable: false },
        { text: 'Altitude', value: 'Alt' },
        { text: 'Flight code number', value: 'Reg' }
      ],
      pagination: {
        sortBy: 'Alt',
        sortType: 'desc'
      },
      rowsPerPageText: 'Flights per page:',
      search: '',
      showDetails: false,
      selectedFlight: null
    }
  },
  computed: {
    ...mapGetters({
      data: 'getData',
      loading: 'loading',
      loaded: 'loaded',
      error: 'error'
    })
  },
  methods: {
    updateData () {
      this.$store.dispatch('updateData', {...this.location})
    },
    openDetails (flight) {
      this.showDetails = true
      this.selectedFlight = flight
    },
    closeDetails () {
      this.showDetails = false
      this.selectedFlight = null
    }
  },
  created () {
    this.$getLocation({
      enableHighAccuracy: false,
      timeout: Infinity,
      maximumAge: 0
    })
      .then(coordinates => {
        this.location = coordinates
        this.$store.dispatch('loadData', {...coordinates})
      })
      .catch(() => {
        this.locationDisabled = true
      })

    setInterval(this.updateData, 60000)
  },
  destroyed () {
    clearInterval(this.updateData)
  }
}
</script>

<style>
 .main {
   margin-top: 50px;
 }
 .east-bound {
   transform: rotate(90deg);
 }
 .west-bound {
   transform: rotate(270deg);
 }
</style>
