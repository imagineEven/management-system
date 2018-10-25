import vuePng from '@/assets/logo.png'
import { RotateGame } from './rotateGame'
export default {

  mounted() {
    let rotateGame = new RotateGame(this.$refs.gameScreen)
  }
}
