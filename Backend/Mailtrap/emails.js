import { EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplate.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"


export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}];

    try {
        const  response = await mailtrapClient.send({
            from:sender,
            to: recipient,
            subject: "verify your email",
            html: EMAIL_TEMPLATE.replace('{{verification_code}}',verificationToken),
            category: "Email Verification"
        })

        console.log("Email sent successfully", response)
    } catch (error) {
        console.error(`Error sending email`, error)
        throw new Error(`Error sending verification email: ${error}`)
    }
};


export const sendWelcomeEmail = async (email,name) =>{
    const recipient = [{email}];

    try {
        
        const response =await  mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid:"4ecb7139-79a2-4b0d-aadd-03b086593971",
            template_variables:{
                name: name,
            company_info_name: "KaizerDEV.COM",
            },
        })
        console.log("welcome email sent successfully", response);
    } catch (error) {
        console.error(`Error sending welcome email`, error);
        throw new Error(`Error sending welcome email: ${error}`);
    }

};

export const sendPasswordResetEmail = async  (email, resetURL) => {
    const  recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{{resetURL}}", resetURL),
            category: "Password Reset",
        })
    } catch (error) {
        console.error(`Error sending password reset email`, error);

        throw new Error(`Error sending password reset email: ${error}`);
    }

};

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password reset Succesfull",
            html:  PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });

        console.log("password reset email sent successfully", response);
    } catch (error) {
        console.error(`Error sending password reset email`, error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
};

