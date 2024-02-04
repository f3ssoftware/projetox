import { CognitoUserPool } from "amazon-cognito-identity-js"

// eslint-disable-next-line import/no-anonymous-default-export
export default new CognitoUserPool({
    UserPoolId: process.env.REACT_APP_USER_POOL_ID!,
    ClientId: process.env.REACT_APP_CLIENT_ID!,
});