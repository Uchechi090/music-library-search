import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { defaultState } from './state'

export const music = {
  namespaced: true,
  state: defaultState(),
  getters,
  mutations,
  actions
}
