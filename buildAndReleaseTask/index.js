"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParameters = void 0;
var tl = require("azure-pipelines-task-lib/task");
var azdev = __importStar(require("azure-devops-node-api"));
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var endpoint, parameters, authHandler, connection, buildApi, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, getEndpoint()];
                case 1:
                    endpoint = _a.sent();
                    console.log("EndPoint getted : " + endpoint.url);
                    return [4 /*yield*/, getParameters()];
                case 2:
                    parameters = _a.sent();
                    console.log("Tag to add : " + parameters.tag + " on project :" + parameters.projectName + " build : " + parameters.buildId);
                    authHandler = azdev.getPersonalAccessTokenHandler(endpoint.token);
                    connection = new azdev.WebApi(endpoint.url, authHandler);
                    console.log("Connexion done");
                    return [4 /*yield*/, connection.getBuildApi()];
                case 3:
                    buildApi = _a.sent();
                    console.log("Stating add tag");
                    buildApi.addBuildTag(parameters.projectName, parameters.buildId, parameters.tag);
                    console.log("Tag added");
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.log("Error : " + err_1.message);
                    tl.setResult(tl.TaskResult.Failed, err_1.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getEndpoint() {
    var endpointName = "SYSTEMVSSCONNECTION";
    var tokenParameterName = "AccessToken";
    var endpoint = {
        url: tl.getEndpointUrl(endpointName, false),
        token: tl.getEndpointAuthorizationParameter(endpointName, tokenParameterName, false),
    };
    return endpoint;
}
function getParameters() {
    var tag = tl.getInput("Tag", true);
    var teamProject = tl.getVariable("System.TeamProject");
    var buildId = tl.getVariable("Build.BuildId");
    if (!teamProject) {
        throw new Error("Variable <System.TeamProject> is empty");
    }
    if (!buildId) {
        throw new Error("Variable <Build.BuildId> is empty");
    }
    return {
        projectName: teamProject,
        buildId: Number(buildId),
        tag: tag
    };
}
exports.getParameters = getParameters;
run();
