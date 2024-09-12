<template>
  <v-app>
    <AppBar/>
    <v-main>      
      <NavigationDrawer/>
      <ChampionshipBody/>
     
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar/AppBar.vue'
import NavigationDrawer from './components/NavigationDrawer/NavigationDrawer.vue'
import ChampionshipBody from './components/ChampionshipBody/ChampionshipBody.vue'


export default {
  name: 'App',

  components: {
    AppBar,
    NavigationDrawer,
    ChampionshipBody
  },

  data: () => ({
    //
  }),
}
</script>
