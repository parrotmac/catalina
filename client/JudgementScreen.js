import Topbar from 'client/Topbar'
import UserButton from "client/UserButton";

export default class extends Component {
    constructor () {
        super ()
    }
    handleGuessSelected(submission, event) {
        this.props.onGuess(submission.username)
    }
    render () {
        const { username, submissions, judgingSubmissionIndex } = this.props
        return (
            <div class="window">
                <Topbar username={ username }/>
                <div class="page page-center">
                    <p class="">Who said "{submissions[judgingSubmissionIndex].response}"?</p>
                    <div>
                        {submissions.map((s) => <UserButton key={s.username} onClick={e => this.handleGuessSelected(s, e)} username={s.username}/>)}
                    </div>
                </div>
            </div>
        )
    }
}

