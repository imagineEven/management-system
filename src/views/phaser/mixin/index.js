import vuePng from '@/assets/logo.png'
import { StateGame } from '../stateGame'
import { OtherGame } from '../otherGame'
export default {
  mounted() {
      this.stateGame = new StateGame(this.$refs.gameScreen);
      this.stateGame.game.state.add('stateGame', this.stateGame)
      this.stateGame.game.state.start('stateGame')
  },
  methods: {
    clickBack() {
      this.stateGame.game.state.clearCurrentState()
      this.$router.push({
        path: '/'
      })
      location.reload()
    },
    toggleState() {
      this.stateGame.game.state.clearCurrentState()
      this.otherGame = new OtherGame(this.$refs.gameScreen);
      this.otherGame.game.state.add('otherGame', this.otherGame)
      this.otherGame.game.state.start('otherGame')
    }
  }
}
