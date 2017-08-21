import Logo from 'client/Logo'

export default class Topbar extends Component {
	render () {
		const { username } = this.props

		return (
			<div class="topbar">
				<div class="topbar-left">
				</div>
				<div class="topbar-center">
					<Logo size="small"/>
				</div>
				<div class="topbar-right">
					<div class="username">{ username }</div>
				</div>
			</div>
		)
	}
}

