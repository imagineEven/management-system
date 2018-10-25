import vuePng from '@/assets/logo.png'
import { StateGame } from '../stateGame'
export default {

  mounted() {
    if (!this.stateGame) {
      this.stateGame = new StateGame(this.$refs.gameScreen)
    }
  },
  methods: {

  }
}
