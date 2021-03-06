const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

const serverPort = process.env.PORT || '3000'

const submissionTime = parseInt(process.env.SUBMISSION_TIME || 30)

server.listen(serverPort, function () {
    console.log('App listening on port ' + serverPort);
});

app.use (express.static (path.resolve (__dirname, 'static')));

app.get('/things', (req, res) => {
    res.send(JSON.stringify(thingList));
});

app.get('/host', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/host.html'));
});


// TODO: Shuffle list
const thingList = require("./things").things;

let users = [];

let gameState = {
    isStarted: false
};

/*

# # # # Example state # # # #

roundState = {
  cardIndex: 0,
  allowingResponsesFor: 25,
  isAcceptingResponses: true,
  submissions: [
    {
      username: "0x15AAC",
      response: "Pineapple",
      beenVotedOn: true,
      guesses: [
        {
          guesser: "CluelessDude1",
          guessed: "Robbie"
        },
        {
          guesser: "robbiewxyz",
          guessed: "0x15AAC"
        },
        {
          ...
        }
      ]
    },
    {
      username: "robbiewxyz",
      response: "Cantaloupe",
      beenVotedOn: false,
      guesses: [
        ...
      ]
    },
    {
      ...
    }
  ]
}
*/

let roundState = {
    cardIndex: 0,
    allowingResponsesFor: submissionTime,
    isAcceptingResponses: true,
    judgingSubmissionIndex: -1,
    submissions: []
};

function nextRoundAvailable() {
    return roundState.cardIndex + 1 < thingList.length;
}

function getNextJudgingIndex() {
    let availableSubmissionIndexes = [];
    roundState.submissions.forEach( (submission, idx) => {
        if(!submission.beenVotedOn) {
            availableSubmissionIndexes.push(idx);
        }
    });

    console.log("availableSubmissionIndexes", availableSubmissionIndexes);

    if(availableSubmissionIndexes.length > 0) {
        const randomIndex = Math.floor(Math.random()*availableSubmissionIndexes.length);
        console.log(`Guessing on ${roundState.submissions[availableSubmissionIndexes[randomIndex]]}`);
        return availableSubmissionIndexes[randomIndex];
    }
    return -1;
}

function beginRound(updateStateCallback) {
    beginSteppedTimer(submissionTime, timeLeft => {
        // E'rry second
        roundState.allowingResponsesFor -= 1;
        updateStateCallback();
    }, () => {
        // Completed
        roundState.isAcceptingResponses = false;
        roundState.judgingSubmissionIndex = getNextJudgingIndex();
        updateStateCallback();
    });
}

function beginNextRound(updateStateCallback) {
    // Clean up round state
    roundState.cardIndex += 1;
    roundState.allowingResponsesFor = submissionTime;
    roundState.isAcceptingResponses = true;
    roundState.judgingSubmissionIndex = -1;
    roundState.submissions = [];

    updateStateCallback();
    beginRound(updateStateCallback);
}

function submitAnswer(user, response, cardIndex) {
    if(roundState.cardIndex === cardIndex) {
        let newSubmission = {
            username: user,
            response: response,
            beenVotedOn: false,
            guesses: []
        };
        roundState.submissions.push(newSubmission);
    } else {
        console.error("Cannot accept answer", arguments);
    }
}

function submitGuess(user, suspect, submissionIndex, cardIndex) {
    if(roundState.cardIndex === cardIndex && roundState.submissions[submissionIndex].guesses.find(g => g.guesser === user) === undefined) {
        roundState.submissions[submissionIndex].guesses.push({
            guesser: user,
            guessed: suspect
        });
        if(roundState.submissions[submissionIndex].guesses.length === roundState.submissions.length) {
            roundState.submissions[submissionIndex].beenVotedOn = true;
        }
    } else {
        console.error("Cannot add guess", arguments);
    }
}

function beginSteppedTimer(time, stepCallback, finishedCallback) {
    let timeLeft = time;
    let steppedTimer = setInterval(() => {

        if(timeLeft === 0) {
            clearInterval(steppedTimer);
            finishedCallback();
            return;
        }

        stepCallback(timeLeft);
        timeLeft--;

    }, 1000);
}


io.on('connection', function (socket) {

    socket.on('join-as', data => {
        if(users.indexOf(data.username) < 0) {
            users.push(data.username);
            io.emit('user-join-response', {
                username: data.username,
                status: 'success',
                thingsList: thingList
            })
        } else {
            io.emit('user-join-response', {
                status: 'failure'
            })
        }
    });

    socket.on('remove-user', data => {
        const deadUserIndex = users.indexOf(data.username);
        if(deadUserIndex > -1) {
            users.splice(deadUserIndex, 1);
            io.emit('removed-user', {
                username: data.username,
                status: 'success'
            })
        } else {
            io.emit('removed-user', {
                username: username,
                status: 'failure'
            })
        }
    });

    function updateState() {
        io.emit("status-update", roundState);
    }



    function nextSubmission() {
        // Done with accepting submissions
        roundState.judgingSubmissionIndex = getNextJudgingIndex();
        updateState();
    }

    socket.on('next-submission', nextSubmission);

    socket.on('next-round', data => {
        if(!gameState.isStarted) {
            gameState.isStarted = true
            beginRound(updateState)
        } else {
            const user = data.user
            console.log(`${user} requested a new round`)
            beginNextRound(updateState)
        }
    });

    socket.on('request-things-list', () => {
        io.emit("things-list", {
            thingsList: thingList
        });
    });

    socket.on('submit-answer', data => {
        const user = data.user
        const response = data.response
        const cardIndex = data.cardIndex
        console.log(`"${user}" send "${response}" in response to "${thingList[cardIndex]}"`)
        submitAnswer(user, response, cardIndex)
        updateState()
    });

    socket.on('submit-guess', data => {
        const user = data.user
        const submissionIndex = data.submissionIndex
        const suspect = data.suspect
        const cardIndex = data.cardIndex
        console.log(`"${user}" guesses that "${suspect}" wrote "${roundState.submissions[submissionIndex].response}" to answer "${thingList[roundState.cardIndex]}"`);
        submitGuess(user, suspect, submissionIndex, cardIndex)
        updateState()
    });

});

