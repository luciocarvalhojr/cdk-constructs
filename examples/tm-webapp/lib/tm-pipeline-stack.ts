import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { TmPipeline, TmPipelineProps } from '../../../src';
import { TmPipelineAppStage } from './tm-app-stage';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TmPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

  const pipeline = new pipelines.CodePipeline(this, 'TmPipelineStack', {
    pipelineName: 'TmPipelineStack',
    synth: new pipelines.ShellStep('Synth', {
      // From codecommit.Repository.fromRepositoryName
      //input: pipelines.CodePipelineSource.codeCommit(repository, props.repoBranch),
      input: pipelines.CodePipelineSource.connection( 'tm-lcarvalho/cdk-constructs', 'main', {
        connectionArn: 'arn:aws:codestar-connections:ca-central-1:654654470378:connection/72c0424f-3adc-4157-8f48-962db7dfaefd'
      }),
      // Commands to run in the synth step
      installCommands: ['npm install', 'npm ci', 'npm install -g aws-cdk'],
      commands: [
        'cd examples/tm-webapp',
        'npm install',
        'cdk synth',
        'find . -iname cdk.out',
        'pwd'
      ],
      primaryOutputDirectory: 'examples/tm-webapp/cdk.out',
    }),
  });

  pipeline.addStage(new TmPipelineAppStage(this, 'AppStage', {
    env: {region: 'ca-central-1'},
  }));

}
}

  /* 
  const pipeline = new TmPipeline(this, 'PipelineCdk', {
      pipelineName: 'PipelineCdk',
      repoName: 'tm-lcarvalho/cdk-constructs',
      repoBranch: 'main',
      connectionArn: 'arn:aws:codestar-connections:ca-central-1:654654470378:connection/72c0424f-3adc-4157-8f48-962db7dfaefd',
      primaryOutputDirectory: 'examples/tm-webapp/cdk.out',
      synthCommand: [ 'cd examples/tm-webapp', 
                      'npm install', 
                      'cdk synth', 
                      'find . -iname cdk.out', 
                      'pwd']
    });
    */
