"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/Rx");
var UtilityService = /** @class */ (function () {
    // prod setup
    // baseUrl = "";
    function UtilityService(http) {
        this.http = http;
        // dev setup
        this.baseUrl = "http://localhost:8080/";
    }
    UtilityService.prototype.post = function (url, body, options) {
        var _this = this;
        //Call start loading bar if we have any.
        console.log(options);
        return this.http.post(url, body, options)
            .map(function (res) {
            console.log("in map");
            return res.json();
        })
            .catch(function (res) { return (_this.handleError(res)); })
            .finally(function () {
            //Call stop loading bar if we have any.
        });
    };
    UtilityService.prototype.get = function (url, options) {
        var _this = this;
        //Call start loading bar if we have any.
        return this.http.get(url, options)
            .map(function (res) { return res; })
            .catch(function (res) { return (_this.handleError(res)); })
            .finally(function () {
            //Call stop loading bar if we have any.
        });
    };
    UtilityService.prototype.handleError = function (response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        var redirectPath = "";
        console.log(response);
        //console.error(response);
        if (response.status == 404) {
            console.log(response);
            redirectPath = '/Home/PageNotFound';
        }
        else if (response.status >= 400 && response.status < 500) {
            //redirectPath = '/Home/UnAuthorisedAccess';
            //window.location.href = redirectPath;
        }
        else if (response.status >= 500) {
            redirectPath = '/Home/InternalServerError';
            window.location.href = redirectPath;
        }
        return Observable_1.Observable.throw(response || 'Server error');
        //return Observable.throw( 'Server error');
    };
    UtilityService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], UtilityService);
    return UtilityService;
}());
exports.UtilityService = UtilityService;
//# sourceMappingURL=utility.service.js.map