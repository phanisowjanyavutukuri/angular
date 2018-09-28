import { Injectable } from '@angular/core';

@Injectable()
export class UserUtilityService {

    static USERNAME_KEY = "username";
    static TOKEN_KEY = "token";

    isUserLoggedIn() {
        if(sessionStorage.getItem('token')) {
            return true;
        }
        return false;
    }

    addTokenAndUsername(token, username) {
        sessionStorage.setItem(UserUtilityService.TOKEN_KEY,token);
        sessionStorage.setItem(UserUtilityService.USERNAME_KEY,username);
    }

    getTokenFromSessionStore() {
        return sessionStorage.getItem(UserUtilityService.TOKEN_KEY) || '';
    }

    getUsernameFromSessionStore() {
        return sessionStorage.getItem(UserUtilityService.USERNAME_KEY) || '';
    }

    removeFromSessionStore() {
        sessionStorage.removeItem(UserUtilityService.TOKEN_KEY);
        sessionStorage.removeItem(UserUtilityService.USERNAME_KEY);
    }
}