import tl = require('azure-pipelines-task-lib/task');
import { IEndpoint, IParameters } from "./interfaces";
import * as ba from "azure-devops-node-api/BuildApi";
import * as azdev from "azure-devops-node-api";

async function run() {
    try {
        // Add tag to current build
        
        // Get endpoint
        const endpoint: IEndpoint = await getEndpoint();
        console.log("EndPoint getted : " + endpoint.url);
        // Get parameters
        const parameters: IParameters = await getParameters();
        console.log("Tag to add : " + parameters.tag + " on project :" + parameters.projectName + " build : " + parameters.buildId);

        // Create connection
        let authHandler = azdev.getPersonalAccessTokenHandler(endpoint.token);  
        const connection = new azdev.WebApi(endpoint.url, authHandler);
        console.log("Connexion done");

        const buildApi: ba.BuildApi = await connection.getBuildApi();

        console.log("Stating add tag");
        buildApi.addBuildTag(parameters.projectName, parameters.buildId, parameters.tag);

        console.log("Tag added");
    }
    catch (err) {
        console.log("Error : " + err.message);
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

function getEndpoint(): IEndpoint {

    let endpointName: string = "SYSTEMVSSCONNECTION";
    let tokenParameterName: string = "AccessToken";

    
    const endpoint: IEndpoint = {

        url: tl.getEndpointUrl(endpointName, false),
        token: tl.getEndpointAuthorizationParameter(endpointName, tokenParameterName, false)!,
    };

    return endpoint;

}

export function getParameters(): IParameters {

    const tag:string | undefined= tl.getInput("Tag", true);

    const teamProject = tl.getVariable("System.TeamProject");
    const buildId = tl.getVariable("Build.BuildId");

    if (!teamProject) {

        throw new Error(`Variable <System.TeamProject> is empty`);

    }

    if (!buildId) {

        throw new Error(`Variable <Build.BuildId> is empty`);

    }

  

    return {
        projectName: teamProject,
        buildId: Number(buildId),
        tag: tag
    } as IParameters;
}


run();