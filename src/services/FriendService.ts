import * as AWS from 'aws-sdk';
// import { store } from 'src/redux';
// import { saveFriends } from 'src/redux/actions/ActionCreators';
import Friend from 'src/model/Friend';


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


                const confirmedFriends: Friend[] = [];

                result.forEach((item: Friend) => {
                    if (item.friend_status == '2') {
                        confirmedFriends.push(item);
                    }
                })

                callback('', confirmedFriends)
                // store.dispatch(saveFriends(result));
            } else {
                callback('', [])
            }
        }
    })

}
