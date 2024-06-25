import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { TmPipeline } from '../../../src';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TmPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new TmPipeline(this, 'PipelineCdk', {
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
  }
}
