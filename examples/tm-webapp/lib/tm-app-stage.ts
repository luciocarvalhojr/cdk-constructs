import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { TmVpcbaseStack } from './tm-vpc-base-stack';
import 

export class TmPipelineAppStage extends cdk.Stage {

    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
      super(scope, id, props);

      const caCentral1Env = {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: 'ca-central-1',
      }
      const caWest1Env = {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: 'ca-west-1',
      }
      

      const VpcCaCentral2 = new TmVpcbaseStack(this, 'vpcCaCentral2Stack', {
        env: caCentral1Env,
        range: '10.3.0.0/16',
      });
      const VpcCaWest2 = new TmVpcbaseStack(this, 'vpcCaWest2Stack', {
        env: caWest1Env,
        range: '10.4.0.0/16',
      });
    
    }

}
