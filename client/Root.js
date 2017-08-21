import NameScreen from 'client/NameScreen'
import Topbar from 'client/Topbar'

export default class Root extends Component {
	constructor () {
		super ()
		this.state = {
			username: localStorage.getItem ('N') || null,
		}
	}
	render () {
		const { username } = this.state
		if (!username) {
			return (
				<div class="window">
					<NameScreen onUsernameChosen={ this.onUsernameChosen }/>
				</div>
			)
		}
		return (
			<div class="window">
				<Topbar username={ username }/>
			</div>
		)
	}
	onUsernameChosen = (username) => {
		localStorage.setItem ('N', username)
		this.setState ({ username })
	}
}

