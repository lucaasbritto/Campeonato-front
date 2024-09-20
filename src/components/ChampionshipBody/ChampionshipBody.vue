<template>
  <v-container>
    <v-row>
      <v-col cols="10" offset="1">
        <v-tabs v-model="activeTab" background-color="primary" dark>
          <v-tab value="classificacao">Classificação</v-tab>
          <v-tab value="partidas">Partidas</v-tab>
          <v-tab value="artilharia">Artilharia</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10" offset="1">
        <div v-show="activeTab === 'classificacao'">
          <TableCompetition />
        </div>        
        
        <div v-show="activeTab === 'partidas'">
          <MatchTeams />
        </div>
                
        <div v-show="activeTab === 'artilharia'">
          <GoalPlayers />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TableCompetition from '../TableCompetition/TableCompetition.vue';
import MatchTeams from '../MatchTeams/MatchTeams.vue';
import GoalPlayers from '../GoalPlayers/GoalPlayers.vue';

export default {
  components: {
    TableCompetition,
    MatchTeams,
    GoalPlayers,
  },
  data() {
    return {
      activeTab: 'classificacao',
    };
  },
};
</script>
