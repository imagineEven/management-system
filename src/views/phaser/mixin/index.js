import vuePng from '@/assets/logo.png'
import { SpinTheWheel } from '../spin-the-wheel'
import { OtherGame } from '../otherGame'
import { BasePhaser } from '@/utils/phaser'
export default {
  mounted() {
    let basePhaser = new BasePhaser(this.$refs.gameScreen);
    this.game = basePhaser.game;
    this.SpinTheWheel = new SpinTheWheel(this.game);
    this.game.state.add('SpinTheWheel', this.SpinTheWheel)
    this.game.state.start('SpinTheWheel')
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
