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
					<p class="card-time">{ time }</p>
					<p>Just wait</p>
				</div>
			</div>
		)
	}
}


