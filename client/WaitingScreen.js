import Topbar from 'client/Topbar'

export default class extends Component {
	constructor () {
		super ()
	}
	render () {
		const { username, time } = this.props
		return (
			<div class="window">
				<Topbar username={ username }/>
				<div class="page page-center waiting-screen">
					<p class="card-time">{ time } second{(time !== 1)?"s":""} remaining</p>
					<p class="waiting-message">Just wait</p>
				</div>
			</div>
		)
	}
}


