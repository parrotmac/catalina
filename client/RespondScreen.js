import Topbar from 'client/Topbar'
import TextEntry from 'client/TextEntry'

export default class extends Component {
	constructor () {
		super ()
	}
	render () {
		const { username, card, time } = this.props
		return (
			<div class="window">
				<Topbar username={ username }/>
				<div class="page page-center respond-screen">
					<p class="card-time">{ time }</p>
					<p class="card-prompt">{ card }</p>
					<TextEntry placeholder="Your response" onSubmit={ this.onSubmit }/>
				</div>
			</div>
		)
	}
	onSubmit = (text) => {
		this.props.onResponse && this.props.onResponse (text)
	}
}

