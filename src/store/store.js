
let state = {
  mans: []
}

let mutations = {
  'SET_MANS_LIST' (state, list) {
    state.mans = list
  }
}
export function getStructStore () {
  return {
    state,
    mutations
  }
}
