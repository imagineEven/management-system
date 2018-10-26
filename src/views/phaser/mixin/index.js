import vuePng from '@/assets/logo.png'
import { StateGame } from '../stateGame'
export default {

  mounted() {
    console.log('location.reload',location);
    if (!this.stateGame) {
      this.stateGame = new StateGame(this.$refs.gameScreen)
    }
  },
  methods: {
    clickBack() {
      console.log(this.stateGame)
      console.log(this.stateGame.game)
      this.stateGame.game.state.clearCurrentState()
      this.stateGame.game.state.add('go', {
        preload: ()=>{
          console.log('change------state')
        }
      })
      this.stateGame.game.state.start('go')
      this.$router.push({
        path: '/'
      })
      location.reload()
    }
  }
}
