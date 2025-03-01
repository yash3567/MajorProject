const {
  checkHashedPassword,
  hashPassword,
} = require("../authentication/auth-helper");
const projects = require("../Models/projects-Schema");
const usersPassword = require("../Models/user-Schema");
const path = require("path");
//  ########################## project push krne k liye ye function hai handleProjects
const handleProjects = async (req, res) => {
  try {
    const {
      name,
      email,
      projectname,
      abstract,
      link,
      password,
      degree,
      type,
      techused,
      price,
      projectfile,
    } = req.body;
    // Encrypted Password Saved honga ab Db me
    const encryptedPassword = await hashPassword(password);

    // ##########################################**********************************
    // console.log("req.body", req.body);
    const imageName = req.file.filename;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // ############################################******************************
    const projt = await projects.create({
      name,
      email,
      projectname,
      abstract,
      link,
      password: encryptedPassword,
      degree,
      type,
      techused,
      price,
      projectfile: imageName,
    });

    // ##### Project Push Form Pasword Verification #######
    const userData = await usersPassword.findOne({ email });
    if (!userData) {
      return res.status(404).send({
        success: false,
        message: "User not found with the provided email",
      });
    }
    // //////// Password Verification #############
    if (userData.email !== null || userData.email !== undefined) {
      const passwordVerify = await checkHashedPassword(
        password,
        userData.password
      );
      if (!passwordVerify) {
        return res.send({
          success: false,
          message: "Password Not Verified Please Check Again",
        });
      }

      // If All Is clear Then This will Execute
      res.send({
        success: true,
        message: "Project Uploaded SuccessFully",
        projt,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Failed to Upload the projects",
      error,
    });
  }
};

//********* To Show Data On Ui projectData Function is used *********
const projectData = async (req, res) => {
  const dataProjects = await projects.find({});
  res.json(dataProjects);
};
module.exports = { handleProjects, projectData };
