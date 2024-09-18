import { createStore } from 'vuex';

export default createStore({
  state: {
    appBarColor: '',
    appBarTitle: '', 
    appBarLogo: '' ,
    allMatches: [],
    selectedTeam: null,
    currentMatchday: '',
  },
  mutations: {
    setAppBarColor(state, color) {
      state.appBarColor = color;
    },
    setAppBarTitle(state, title) {
      state.appBarTitle = title;
    },
    setAppBarLogo(state, logo) {
      state.appBarLogo = logo;
    },

    setAllMatches(state, matches) {
      state.allMatches = matches;
    },
    setSelectedTeam(state, team) {
      state.selectedTeam = team;
    },
    setCurrentMatchday(state, matchday) {
      state.currentMatchday = matchday;
    }
  },
  actions: {
    updateAppBarColor({ commit }, color) {
      commit('setAppBarColor', color);
    },
    updateAppBarTitle({ commit }, title) {
      commit('setAppBarTitle', title);
    },
    updateAppBarLogo({ commit }, logo) {
      commit('setAppBarLogo', logo);
    },

    updateAllMatches({ commit }, matches) {
      commit('setAllMatches', matches);
    },
    updateSelectedTeam({ commit }, team) {
      commit('setSelectedTeam', team);
    },
    updateCurrentMatchday({ commit }, matchday) {
      commit('setCurrentMatchday', matchday);
    },
  },
  getters: {
    nextMatchForSelectedTeam(state) {
      if (!state.selectedTeam) return null;
    
      // Filtrar os jogos do time selecionado que ainda vão acontecer e não estão com o status 'FINISHED'
      const futureMatches = state.allMatches.filter(
        match =>
          (match.homeTeam.name === state.selectedTeam || match.awayTeam.name === state.selectedTeam) &&
          match.matchday >= state.currentMatchday &&
          match.status !== 'FINISHED' // Verifica se o status não é 'FINISHED'
      );
    
      // Retorna o próximo jogo da rodada atual ou futura
      return futureMatches.length ? futureMatches[0] : null;
    }},
});