import Topbar from 'client/Topbar'
import Button from 'client/Button'

export default class extends Component {
	constructor () {
		super ()
	}
	render () {
		const { username, title } = this.props
		return (
			<div class="window">
				<Topbar username={ username }/>
				<div class="page page-center start-game">
					<p class="description">Start the game!</p>
					<Button title={ title } onClick={ this.onStart }/>
				</div>
			</div>
		)
	}
	onStart = () => {
		this.props.onStart && this.props.onStart ()
	}
}


