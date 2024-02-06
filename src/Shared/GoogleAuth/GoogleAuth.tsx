import { AuthenticationDetails, CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import axios from "axios";
import userPool from '../../userpool';
import userpool from "../../userpool";

export async function googleAuthCheckToken(access_token: string) {
    try {
        const result = await axios.get(`${process.env.REACT_APP_GOOGLE_APIS_URL}/v1/userinfo`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            params: {
                access_token,
            }
        });

        console.log(result);
    } catch (err) {
        console.error(err);
    }
}

export const authenticateCognito = (Email: string, Password: string) => {
    return new Promise((resolve, reject) => {
        const user = new CognitoUser({
            Username: Email,
            Pool: userPool
        });

        const authDetails = new AuthenticationDetails({
            Username: Email,
            Password
        });

        user.authenticateUser(authDetails, {
            onSuccess: (result) => {
                console.log(result);
                sessionStorage.setItem('access_token', result.getAccessToken().getJwtToken());
                sessionStorage.setItem('refresh_token', result.getRefreshToken().getToken());
                resolve(result);
                return true;
            },
            onFailure: (err) => {
                reject(err);
                return false;
            },
            newPasswordRequired: (userAttr, requiredAttr) => {
                alert('New Password Required!');
            }
        })
    })
}

export const signUpCognito = (email: string, password: string) => {
    const attrList = [new CognitoUserAttribute({
        Name: 'email',
        Value: email,
    })]

    const validationData: CognitoUserAttribute[] = [];

    userpool.signUp(email, password, attrList, validationData, (err, data) => {
        if (err) {
            alert(err);
        } else {
            console.log()
        }
    });
}