const otpGenerator = require('otp-generator')

const generateOTP = () => {
    const OTP = otpGenerator.generate(6, { 
        lowerCaseAlphabets: false, 
        upperCase: false, 
        specialChars: false 
        });

        return OTP;
};

module.exports = generateOTP();