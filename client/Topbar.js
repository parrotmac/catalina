import Logo from 'client/Logo'

export default class Topbar extends Component {
	render () {
		const { username } = this.props

		return (
			<header>
				<div class="topbar">
					<h1 class="logo">catalina</h1>
					<h2 class="username">{ username }</h2>
				</div>
				<hr class="header-rule" />
			</header>
		)
	}
}

