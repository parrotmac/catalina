export default class Logo extends Component {
	render () {
		const { size } = this.props
		if (size === 'large') {
			return (
				<div class="logo logo-large" size={ size }>
					<span>CATALINA</span>
					<small>MAGDALENA HOOPENSTEINER WALLENDINER</small>
				</div>
			)
		}
		if (size === 'small') {
			return (
				<div class="logo logo-small" size={ size }>
					<span>CATALINA</span>
				</div>
			)
		}
	}
}
