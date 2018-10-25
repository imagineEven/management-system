import vuePng from '@/assets/logo.png'
import { StateGame } from './StateGame'
export default {

  mounted() {
    let stateGame = new StateGame(this.$refs.gameScreen)
  }
}
