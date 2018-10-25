import vuePng from '@/assets/logo.png'
import { StateGame } from '../stateGame'
export default {

  mounted() {
    let stateGame = new StateGame(this.$refs.gameScreen)
  }
}
