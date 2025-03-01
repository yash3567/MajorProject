const verification = (req, res) => {
  const allowedEmail = ["anjumanengg.edu.in"];
  const { email } = req.body;
  if (!email) {
    res.status(400).send({
      success: false,
      message: "Email is Required",
    });
  }
  const emailDomain = email.split("@")[1];
  if (allowedEmail.includes(emailDomain)) {
    return res.status(200).send({
      success: true,
      message: "Email Verified SuccessFully",
    });
  } else {
    res.status(200).send({
      success: false,
      message: "Redirecting to Payment Section",
    });
  }
};
module.exports = { verification };
