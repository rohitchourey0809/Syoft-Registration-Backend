// permitted roles = ["Manager","Admin"]
const authorise = function (permittedroles) {
  return (req, res, next) => {
    //   console.log(permittedroles)
    //getting tghe user
    console.log("data", req.userdata.ROLE);
    const userdata = req.userdata;
    var isPermitted = false;
    //checking ther permissin data
    permittedroles.map((ROLE) => {
      if (userdata.ROLE.includes(ROLE)) {
        isPermitted = true;
      }
    });

    if (isPermitted) {
        console.log("isPermitted", isPermitted);
      return next();
    } else {
      return res.status(401).send({ message: "you are not authorised " });
    }
  };
};

module.exports = authorise;
