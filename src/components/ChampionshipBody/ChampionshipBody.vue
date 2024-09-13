<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="9">
          <TableCompetition />
        </v-col>
        <v-col cols="12" md="3">
          <MatchTeams />
        </v-col>
        <v-col cols="12" md="12">
          <GoalPlayers />
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
    }
  };
  </script>