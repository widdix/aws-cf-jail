# AWS CloudFormation jail

Allow your users with `ReadOnlyAccess` to create CloudFormation stacks with ease. [Why do you want to do such a thing?](https://cloudonaut.io/how-to-protect-your-cloudformation-managed-aws-account-from-human-intervention/).

1. clone this repository `$ git clone git@github.com:widdix/aws-cf-jail.git`
2. switch into the newly created folder `$ cd aws-cf-jail/`
3. create a CloudFormation stack to provision the Lambda functions `$ aws cloudformation create-stack --stack-name aws-cf-jail --template-body file://template.json --capabilities CAPABILITY_IAM`
4. wait until the stack is `CREATE_COMPLETE` with `$ aws cloudformation describe-stacks --stack-name aws-cf-jail --query Stacks[0].StackStatus`
5. list the ARNs of the Lambda functions with `$ aws cloudformation describe-stacks --stack-name aws-cf-jail --query Stacks[0].Outputs`

    ```
    [
      {
        "OutputKey": "LambdaCreateStack", 
        "OutputValue": "arn:aws:lambda:eu-west-1:XXX:function:aws-cf-jail-LambdaCreateStack-YY1"
      }, 
      {
        "OutputKey": "LambdaDeleteStack", 
        "OutputValue": "arn:aws:lambda:eu-west-1:XXX:function:aws-cf-jail-LambdaDeleteStack-YY2"
      }, 
      {
        "OutputKey": "LambdaUpdateStack", 
        "OutputValue": "arn:aws:lambda:eu-west-1:XXX:function:aws-cf-jail-LambdaUpdateStack-YY3"
      }
    ]
    ```

6. allow your users with `ReadOnlyAccess` to invoke the lambda functions by adding an inline policy to the IAM role. Replace the three `Resource`s with the ARNs provided by the 5. step.

    ```
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "1",
          "Effect": "Allow",
          "Action": "lambda:InvokeFunction",
          "Resource": [
            "arn:aws:lambda:eu-west-1:XXX:function:aws-cf-jail-LambdaCreateStack-YY1",
            "arn:aws:lambda:eu-west-1:XXX:function:aws-cf-jail-LambdaCreateStack-YY2",
            "arn:aws:lambda:eu-west-1:XXX:function:aws-cf-jail-LambdaCreateStack-YY3"
          ]
        }
      ]
    }
```

7. That´s it.
