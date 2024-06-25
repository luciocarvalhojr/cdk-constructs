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
      repoName: 'toumoro/cdk-constructs',
      repoBranch: 'main',
      connectionArn: 'arn:aws:codestar-connections:us-east-1:123456789012:connection/1234abcd-12ab-34cd-56ef-1234567890ab',
      primaryOutputDirectory: 'examples/tm-webapp/cdk.out',
      synthCommand: [ 'cd examples/tm-webapp', 
                      'npm install', 
                      'cdk synth', 
                      'find . -iname cdk.out', 
                      'pwd']
    });
  }
}
