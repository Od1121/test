import { Configure } from "@goodtechsoft/xs-micro-service";

export default Configure(() => ({
  // host  : "email-smtp.us-east-1.amazonaws.com",
  // port  : 465,
  host  : "email-smtp.ap-southeast-1.amazonaws.com", // AWS SES
  // port  : 587 || 2587, // AWS SES
  port  : 465 || 2465, // AWS SES
  secure: true,
  auth  : {
    // user: "AKIAQZBT3I6ZOG7I4DNU",
    // pass: "BCgCSxZT2MteE70utn5YRYlXn3dkH2icRUEDHzWTWsqB"
    user: "AKIA5AKFHIDSLPYGQFQL", // AWS SES
    pass: "BKyX92x7jonFsaQl7pdULAELgCuDMdN6lXWbp/mHvWf1" // AWS SES
  },
  // from: "\"DeHub\" <bumbayar0223@gmail.com>"
  from: "noreply@dep.mn" // AWS SES
}), {
  dev: {}
});

// Mail: noreply@dep.mn
// SMTP endpoint: email-smtp.ap-southeast-1.amazonaws.com
// STARTTLS Port: 25, 587 or 2587
// TLS Wrapper Port: 465 or 2465
// Amazon Resource Name (ARN): arn:aws:ses:ap-southeast-1:894035247332:identity/dep.mn
// AWS Region: Asia Pacific (Singapore)
// IAM User Name: ses-smtp-user.20221115-172057
// Smtp Username: AKIA5AKFHIDSLPYGQFQL
// Smtp Password: BKyX92x7jonFsaQl7pdULAELgCuDMdN6lXWbp/mHvWf1