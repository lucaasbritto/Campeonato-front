<template>
    <v-card>
        <v-card-title>
            <img 
                v-if="competition.emblem" 
                :src="competition.emblem" 
                alt="Escudo Campeonato" 
                style="width: 40px; height: 40px; margin-right: 10px;" 
            />
            Classificação - {{ competition.name }} - {{ year }}
        </v-card-title>
        <v-data-table 
            :headers="headers" 
            :items="classification" 
            class="elevation-1" 
            density="compact"  
            :items-per-page="20" 
            hide-default-footer
        >
        
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.position }}</td>
          <td>
            <img :src="item.team.crest" alt="Escudo" style="width: 20px; height: 20px; margin-right: 8px;" />
            {{ item.team.shortName }}
          </td>
          <td>{{ item.points }}</td>
          <td>{{ item.playedGames }}</td>
          <td>{{ item.won }}</td>
          <td>{{ item.draw }}</td>
          <td>{{ item.lost }}</td>
          <td>{{ item.goalsFor }}</td>
          <td>{{ item.goalsAgainst }}</td>
          <td>{{ item.goalDifference }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </template>
  
  <script>
  import { getClassification } from '@/services/api'

  export default {
    data() {
      return {
        classification: [],
        competition: {},
        year: null,
        loading: true,
        error: null,    
        headers: [
            { title: 'P', value: 'position' },
            { title: 'Time', value: 'team.shortName' },
            { title: 'P', value: 'points' },
            { title: 'J', value: 'playedGames' },
            { title: 'V', value: 'won' },
            { title: 'E', value: 'draw' },
            { title: 'D', value: 'lost' },
            { title: 'GP', value: 'goalsFor' },
            { title: 'GC', value: 'goalsAgainst' },
            { title: 'SG', value: 'goalDifference' },
        ],        
      };
    },

    mounted() {
        this.fetchClassificationData();
    },

    methods: {
    fetchClassificationData() {
      getClassification()
        .then((response) => {
          this.classification = response.data.standings[0].table;
          this.competition = response.data.competition;
          this.year = response.data.filters.season;

          this.classification.forEach(team => {
            if (team.team.shortName === 'Mineiro') {
              team.team.shortName = 'Atlético Mineiro';
            } else if (team.team.shortName === 'Paranaense') {
              team.team.shortName = 'Athletico Paranaense';
            }
          });
          
        })
        .catch((error) => {
          this.error = 'Erro ao buscar a Classificação';
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

  };
  </script>
  