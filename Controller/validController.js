const Verification = require('../modals/Verification');
const otpGenerator = require('otp-generator');
const sgMail = require('@sendgrid/mail')



sgMail.setApiKey(process.env.SENDGRID_API)
const generateMail = async (otp) => {
    

    const msg = {
        to: 'anjuman2@gmail.com', // Change to your recipient
        from: 'studentdb23@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<strong>OTP is  ${otp}</strong>`,
    }

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}

const getOTP = async (req, res) => {
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

    const otpset = await new Verification({
        otp: otp,
        email: req.body.email,
        verified: req.body.verified,
        name: req.body.name,
        usn: req.body.usn
    })

    try {

        Verification.findOne({ email: req.body.email }, async (err, data) => {

            if (data == null) {
                otpset.save();
                // res.status(200).send(otpset);
                await generateMail(otp)
                res.status(200).json("OTP sent successfully");
            }
            else {
                await generateMail(otp)
                await Verification.findOneAndUpdate({ email: req.body.email }, {
                    $set: { otp: otp }
                })
                res.status(200).json("OTP sent successfully");
            }
        })
    }
    catch (e) {
        console.log(e);
    }
}


const verifyOTP = async (req, res) => {
    try {

        Verification.findOne({ email: req.body.email }, async (err, data) => {
            if (data === null) {

                res.status(404).json("OTP/User not found")
                console.log("Error-> " + error);
            } else {
                const otp = req.body.otp                
                if (data.otp === otp) {
                    res.status(200).json("OTP verified")
                } else {
                    res.status(200).json("OTP not verified")
                }
            }
        })

    } catch (e) {
        console.log(e);
        res.status(500).json(e)
    }

}




module.exports = { getOTP, verifyOTP }