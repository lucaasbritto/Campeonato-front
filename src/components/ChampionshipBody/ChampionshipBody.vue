<template>
  <div class="containerChampionshipBody">
    <v-row class="tab-championship">
      <v-col cols="10" offset="1">
        <v-tabs v-model="activeTab">
          <v-tab class="tabsActives" value="classificacao">Classificação</v-tab>
          <v-tab class="tabsActives" value="partidas">Partidas</v-tab>
          <v-tab class="tabsActives" value="artilharia">Artilharia</v-tab>
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
  </div>
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

<style>
.containerChampionshipBody{
  min-height: 100vh ;
  background: url('../../assets/fundo_estadio.jpg');
  background-size: cover; 
  background-repeat: no-repeat; 
  background-position: center; 
}

.tab-championship{
  margin-bottom: -36px;
  color: white;
}


.tabsActives{
  background: #10502f;
  font-size: 0.8rem;
}
</style>
