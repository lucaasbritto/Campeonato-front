<template>
    <v-navigation-drawer
      app
      permanent
    >
    <v-card-title class="text-h6 text-center white--text">
      Escolha seu time
    </v-card-title>
      <v-container fluid>
        <v-row>         
          <v-col
            v-for="team in sortedTeams"
            :key="team.id"
            cols="3"
            class="d-flex align-center justify-center"
          >
            <v-img
              :src="team.crest"
              contain
              max-height="80"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </template>
<script>
import { getTeams } from '@/services/api'

export default {
  data() {
    return {
      teams: [],
      loading: true,
      error: null,    
    };
  },

  mounted() {
    this.fetchTeamsData();
  },
  computed: {
    sortedTeams() {
      return this.teams.slice().sort((a, b) => a.shortName.localeCompare(b.shortName));
    },
  },


  methods: {
    fetchTeamsData() {
      getTeams()
        .then((response) => {
          this.teams = response.data.teams;
          this.teams.forEach(team => {
            if (team.shortName === 'Mineiro') {
              team.shortName = 'Atlético Mineiro';
            } else if (team.shortName === 'Paranaense') {
              team.shortName = 'Athletico Paranaense';
            }
          });          
        })
        .catch((error) => {
          this.error = 'Erro ao buscar os times';
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  
};

</script>