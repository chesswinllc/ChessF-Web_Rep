import * as AWS from 'aws-sdk';

export const updateUserPoints = (userId: string, points: number, callback: (success: boolean) => void) => {
    const lambda = new AWS.Lambda({ region: 'us-east-1', apiVersion: '2015-03-31' });


    const pullParams = {
        FunctionName: 'update-points',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify({
            userId,
            points,
            type: 1
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
