import * as AWS from 'aws-sdk';
import { store } from 'src/redux';
import { saveFriends } from 'src/redux/actions/ActionCreators';
import Friend from 'src/model/Friend';
import { GameActionTypes } from 'src/redux/actions/GameActionTypes';

export const getAllFriends = (userId: string, callback: (errorMsg: string, data?: Friend[]) => void) => {
    const lambda = new AWS.Lambda({ region: 'us-east-1', apiVersion: '2015-03-31' });

    // create JSON object for parameters for invoking Lambda function
    const pullParams = {
        FunctionName: 'get-friends',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify({
            userId
        })
    };

    lambda.invoke(pullParams, (error: AWS.AWSError, data: AWS.Lambda.InvocationResponse) => {
        if (error) {
            callback(error.message, undefined);
        } else {
            if (data.Payload) {
                const result = JSON.parse(data.Payload.toString());
                if (result.error) {
                    callback('Something went wrong !', [])
                    return;
                }


                callback('', result)
                store.dispatch(saveFriends(result));
            } else {
                callback('', [])
            }
        }
    })

}

export const searchForFriends = (username: string, callback: (data?: Friend[]) => void) => {
    const lambda = new AWS.Lambda({ region: 'us-east-1', apiVersion: '2015-03-31' });

    // create JSON object for parameters for invoking Lambda function
    const pullParams = {
        FunctionName: 'search-friends',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify({
            username
        })
    };

    lambda.invoke(pullParams, (error: AWS.AWSError, data: AWS.Lambda.InvocationResponse) => {
        if (error) {
            callback([]);
        } else {
            if (data.Payload) {
                const result = JSON.parse(data.Payload.toString());
                callback(result)
            } else {
                callback([])
            }
        }
    })

}


export const addFriend = (userId: string, playerId: string, callback: (success: boolean) => void) => {
    const lambda = new AWS.Lambda({ region: 'us-east-1', apiVersion: '2015-03-31' });


    const pullParams = {
        FunctionName: 'add-friend',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify({
            userId,
            playerId
        })
    };

    lambda.invoke(pullParams, (error: AWS.AWSError, data: AWS.Lambda.InvocationResponse) => {
        if (error) {
            callback(false);
        } else {
            if (data.Payload) {
                const result = JSON.parse(data.Payload.toString());
                if (result.success) {
                    callback(true);
                    return;
                }
                callback(false);
            } else {
                callback(false);
            }
        }
    })

}


export const sendGameRequestLambda = (userId: string, opponentId: string, callback: (errorMsg: string, game: string) => void) => {
    const lambda = new AWS.Lambda({ region: 'us-east-1', apiVersion: '2015-03-31' });

    // create JSON object for parameters for invoking Lambda function
    const pullParams = {
        FunctionName: 'send-game-request',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify({
            userId,
            opponentId
        })
    };

    lambda.invoke(pullParams, (error: AWS.AWSError, data: AWS.Lambda.InvocationResponse) => {
        if (error) {
            callback(error.message, '');
        } else {
            if (data.Payload) {
                const result = JSON.parse(data.Payload.toString());
                if (result.error) {
                    callback('Something went wrong !', '')
                    return;
                }


                callback('', result.game)
            } else {
                callback('error', '')
            }
        }
    })

}


export const declineGameRequestLambda = (opponentId: string, gameId: string, callback: (errorMsg: string) => void) => {
    const lambda = new AWS.Lambda({ region: 'us-east-1', apiVersion: '2015-03-31' });

    // create JSON object for parameters for invoking Lambda function
    const pullParams = {
        FunctionName: 'decline-game-request',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify({
            gameId,
            opponentId
        })
    };

    lambda.invoke(pullParams, (error: AWS.AWSError, data: AWS.Lambda.InvocationResponse) => {
        if (error) {
            callback(error.message);
        } else {
            if (data.Payload) {
                const result = JSON.parse(data.Payload.toString());
                if (result.error) {
                    callback('Something went wrong !')
                    return;
                }

                callback('')
            } else {
                callback('error')
            }
        }
    })

}


export const acceptGameRequestLambda = (game: string, callback: (errorMsg: string) => void) => {
    const lambda = new AWS.Lambda({ region: 'us-east-1', apiVersion: '2015-03-31' });

    // create JSON object for parameters for invoking Lambda function
    const pullParams = {
        FunctionName: 'accept-game-request',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify({
            game
        })
    };

    lambda.invoke(pullParams, (error: AWS.AWSError, data: AWS.Lambda.InvocationResponse) => {
        if (error) {
            callback(error.message);
        } else {
            if (data.Payload) {
                const result = JSON.parse(data.Payload.toString());
                if (!result.success) {
                    callback('Something went wrong !')
                    return;
                }

                callback('')
            } else {
                callback('error')
            }
        }
    })

}



export const subscribeGameLambda = (gameId: string, connectionId: string, callback: (errorMsg: string) => void) => {
    const lambda = new AWS.Lambda({ region: 'us-east-1', apiVersion: '2015-03-31' });


    // create JSON object for parameters for invoking Lambda function
    const pullParams = {
        FunctionName: 'subscribe-game',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify({
            gameId,
            connectionId
        })
    };

    lambda.invoke(pullParams, (error: AWS.AWSError, data: AWS.Lambda.InvocationResponse) => {
        if (error) {
            callback(error.message);
        } else {
            if (data.Payload) {
                const result = JSON.parse(data.Payload.toString());
                if (result.statusCode != 200) {
                    callback('Something went wrong !')
                    return;
                }

                callback('')
            } else {
                callback('error')
            }
        }
    })

}



export const unsubscribeGameLambda = (gameId: string, connectionId: string, callback: (errorMsg: string) => void) => {
    const lambda = new AWS.Lambda({ region: 'us-east-1', apiVersion: '2015-03-31' });


    // create JSON object for parameters for invoking Lambda function
    const pullParams = {
        FunctionName: 'unsubscribe-game',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify({
            gameId,
            connectionId
        })
    };

    lambda.invoke(pullParams, (error: AWS.AWSError, data: AWS.Lambda.InvocationResponse) => {
        if (error) {
            callback(error.message);
        } else {
            if (data.Payload) {
                const result = JSON.parse(data.Payload.toString());
                if (result.statusCode != 200) {
                    callback('Something went wrong !')
                    return;
                }

                callback('')
            } else {
                callback('error')
            }
        }
    })

}




export const sendChatMessageLambda = (gameId: string, userId: string, message: string, callback: (errorMsg: string) => void) => {
    const lambda = new AWS.Lambda({ region: 'us-east-1', apiVersion: '2015-03-31' });


    // create JSON object for parameters for invoking Lambda function
    const pullParams = {
        FunctionName: 'game-event',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify({
            eventType: GameActionTypes.CHAT_MESSAGE,
            gameId,
            userId,
            chatEvent: {
                message
            }
        })
    };

    lambda.invoke(pullParams, (error: AWS.AWSError, data: AWS.Lambda.InvocationResponse) => {
        if (error) {
            callback(error.message);
        } else {
            if (data.Payload) {
                const result = JSON.parse(data.Payload.toString());
                if (result.statusCode != 200) {
                    callback('Something went wrong !')
                    return;
                }

                callback('')
            } else {
                callback('error')
            }
        }
    })

}


export const newGameMoveLambda = (gameId: string, userId: string, fen: string, move: any, callback: (errorMsg: string) => void) => {
    const lambda = new AWS.Lambda({ region: 'us-east-1', apiVersion: '2015-03-31' });


    // create JSON object for parameters for invoking Lambda function
    const pullParams = {
        FunctionName: 'game-event',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify({
            eventType: GameActionTypes.GAME_MOVE,
            gameId,
            userId,
            gameEvent: {
                fen,
                move
            }
        })
    };

    lambda.invoke(pullParams, (error: AWS.AWSError, data: AWS.Lambda.InvocationResponse) => {
        if (error) {
            callback(error.message);
        } else {
            if (data.Payload) {
                const result = JSON.parse(data.Payload.toString());
                if (result.statusCode != 200) {
                    callback('Something went wrong !')
                    return;
                }

                callback('')
            } else {
                callback('error')
            }
        }
    })

}


export const abortGameLambda = (gameId: string, userId: string, callback: (errorMsg: string) => void) => {
    const lambda = new AWS.Lambda({ region: 'us-east-1', apiVersion: '2015-03-31' });


    // create JSON object for parameters for invoking Lambda function
    const pullParams = {
        FunctionName: 'game-event',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify({
            eventType: GameActionTypes.GAME_ABORT,
            gameId,
            userId
        })
    };

    lambda.invoke(pullParams, (error: AWS.AWSError, data: AWS.Lambda.InvocationResponse) => {
        if (error) {
            callback(error.message);
        } else {
            if (data.Payload) {
                const result = JSON.parse(data.Payload.toString());
                if (result.statusCode != 200) {
                    callback('Something went wrong !')
                    return;
                }

                callback('')
            } else {
                callback('error')
            }
        }
    })

}




export const sendDrawRequestLambda = (gameId: string, userId: string, playerId: string, type: GameActionTypes, callback: (errorMsg: string) => void) => {
    const lambda = new AWS.Lambda({ region: 'us-east-1', apiVersion: '2015-03-31' });


    // create JSON object for parameters for invoking Lambda function
    const pullParams = {
        FunctionName: 'game-event',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify({
            eventType: type,
            gameId,
            userId,
            playerId
        })
    };

    lambda.invoke(pullParams, (error: AWS.AWSError, data: AWS.Lambda.InvocationResponse) => {
        if (error) {
            callback(error.message);
        } else {
            if (data.Payload) {
                const result = JSON.parse(data.Payload.toString());
                if (result.statusCode != 200) {
                    callback('Something went wrong !')
                    return;
                }

                callback('')
            } else {
                callback('error')
            }
        }
    })

}