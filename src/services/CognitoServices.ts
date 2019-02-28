import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import { USER_POOL_ID, USER_POOL_WEB_CLIENT_ID, IDENTITY_POOL_ID } from 'src/config';
import User from 'src/model/User';
import { store } from 'src/redux';
import { push } from 'connected-react-router';
import { saveUser, removeUser } from 'src/redux/actions/ActionCreators';


export const initCognitoIdentyPool = () => {

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IDENTITY_POOL_ID,
    }, {
            region: 'us-east-1'
        })
}


export const getCurrentUser = () => {
    const poolData = {
        UserPoolId: USER_POOL_ID,
        ClientId: USER_POOL_WEB_CLIENT_ID
    };

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const user = userPool.getCurrentUser();
    return user;
}

export const loginUser = (username: string, password: string, callback?: (errorMsg: string) => void) => {
    const authenticationData = {
        Username: username,
        Password: password,
    };

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    const poolData = {
        UserPoolId: USER_POOL_ID,
        ClientId: USER_POOL_WEB_CLIENT_ID
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.setAuthenticationFlowType("USER_PASSWORD_AUTH");

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session: AmazonCognitoIdentity.CognitoUserSession, userConfirmationNecessary: boolean) => {

            if (userConfirmationNecessary) {
                callback && callback('Please confirm your account first')
            } else {
                getUserAttributes(cognitoUser, callback);
            }

        },
        onFailure: (error) => {
            callback && callback(error.message)
        }

    });

}

const getUserAttributes = (user: AmazonCognitoIdentity.CognitoUser, callback?: (errorMsg: string) => void) => {
    user.getUserAttributes((error: any, result: AmazonCognitoIdentity.CognitoUserAttribute[]) => {
        if (error) {
            callback && callback('Something went wrong !')
        } else {

            const user: User = new User();

            for (var i in result) {
                const attribute: AmazonCognitoIdentity.CognitoUserAttribute = result[i];
                switch (attribute.getName()) {
                    case 'sub':
                        user.id = attribute.getValue();
                        break;
                    case 'custom:country':
                        user.country = attribute.getValue();
                        break;
                    case 'custom:profile_picture':
                        user.profile_picture = attribute.getValue();
                        break;
                    case 'birthdate':
                        user.birthdate = attribute.getValue();
                        break;
                    case 'email':
                        user.email = attribute.getValue();
                        break;
                    case 'gender':
                        user.gender = attribute.getValue();
                        break;
                    case 'name':
                        user.name = attribute.getValue();
                        break;
                    case 'custom:gold_points':
                        user.gold_points = parseFloat(attribute.getValue());
                        break;
                    case 'custom:silver_points':
                        user.silver_points = parseFloat(attribute.getValue());
                        break;
                    case 'preferred_username':
                        user.preferred_username = attribute.getValue();
                        break;
                    default:
                        break;
                }
            }

            store.dispatch(saveUser(user));
            store.dispatch(push('/'))
        }
    });
}

export const getSession = (callback: (success: boolean, user?: AmazonCognitoIdentity.CognitoUser) => void) => {
    const user = getCurrentUser();

    if (user) {
        user.getSession((err: any, data: any) => {
            if (err) {
                callback(false, user);
            } else {
                callback(true, user);
            }
        })
    } else {
        callback(false, user || undefined);
    }
}

export const logoutUser = () => {
    const user = getCurrentUser();

    if (user) {
        user.signOut();
    }

    var arr: string[] = [];

    for (var i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.substring(0, 30) == 'CognitoIdentityServiceProvider') {
            arr.push(key);
        }
        else if (key && key.substring(0, 23) == 'aws.cognito.identity-id') {
            arr.push(key);
        }
    }

    // Iterate over arr and remove the items by key
    for (var i = 0; i < arr.length; i++) {
        localStorage.removeItem(arr[i]);
    }

    store.dispatch(removeUser());
}


export const forgotPassword = (username: string, callback: (errorMsg: string) => void) => {
    const poolData = {
        UserPoolId: USER_POOL_ID,
        ClientId: USER_POOL_WEB_CLIENT_ID
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.forgotPassword({
        onFailure: (error: any) => {
            if (error.code == 'UserNotFoundException') {
                callback('User doesnt exist');
            } else {
                callback(error.message);
            }
        },
        onSuccess: (data: any) => {
            store.dispatch(push('/reset-confirm', { email: username, reset: true }))
        },
        inputVerificationCode: (data: any) => {
            store.dispatch(push('/reset-confirm', { email: username, reset: true }))
        }
    })
}


export const confirmNewPassword = (username: string, newPassword: string, code: string, callback: (errorMsg: string) => void) => {
    const poolData = {
        UserPoolId: USER_POOL_ID,
        ClientId: USER_POOL_WEB_CLIENT_ID
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmPassword(code, newPassword, {
        onFailure: (error: any) => {
            callback(error.message);
        },
        onSuccess: () => {
            store.dispatch(push('/login'));
        }
    })
}
