import vuePng from '@/assets/logo.png'
import { StateGame } from '../stateGame'
import { OtherGame } from '../otherGame'
import { BasePhaser } from '@/utils/phaser'
export default {
  mounted() {
    let basePhaser = new BasePhaser(this.$refs.gameScreen);
    this.game = basePhaser.game;
    this.stateGame = new StateGame(this.game);
    this.game.state.add('stateGame', this.stateGame)
    this.game.state.start('stateGame')
  },
  methods: {
    clickBack() {
      this.$router.push({
        path: '/'
      })
    },
    toggleState() {
      this.game.state.clearCurrentState()
      this.otherGame = new OtherGame(this.game);
      this.game.state.add('otherGame', this.otherGame)
      this.game.state.start('otherGame')
    }
  }
}
