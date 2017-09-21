import Topbar from 'client/Topbar'
import UserButton from "client/UserButton";

export default class extends Component {
    constructor () {
        super ()
        this.state = {
            canGuess: true
        }
    }
    handleGuessSelected(submission, event) {
        this.props.onGuess(submission.username)
        this.setState({
            canGuess: false
        })
    }
    render () {
        const { username, submissions, judgingSubmissionIndex } = this.props
        return (
            <div class="window">
                <Topbar username={ username }/>
                <div class="page page-center">
                    <p class="">Who said "{submissions[judgingSubmissionIndex].response}"?</p>
                    <div>
                        {submissions.map((s) => <UserButton key={s.username} style={{display: this.state.canGuess?"block":"none"}} onClick={e => this.handleGuessSelected(s, e)} username={s.username}/>)}
                        {this.state.canGuess?"":<p>Waiting on others to guess</p>}
                    </div>
                </div>
            </div>
        )
    }
}

