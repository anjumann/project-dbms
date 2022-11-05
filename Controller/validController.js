const Verification = require('../modals/Verification');
const otpGenerator = require('otp-generator');
const getOTP = async (req, res) => {
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

    const otpset = await new Verification({
        otp: otp,
        email: req.body.email,
        name: req.body.name,
        usn: req.body.usn
    })

    try {
        await otpset.save()
        res.status(200).json("OTP sent successfully");
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = { getOTP }