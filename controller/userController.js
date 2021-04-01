const { find } = require("../model/userModel");

User = require("../model/userModel");

// GET ALL USERS
exports.index = function (req, res) {
    User.get (function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};

exports.getUser = async function (req, res) {
    const email = req.params.email;
    try {
        const findUser = await User.findOne({
          email
        });
        if (!findUser)
            return res.status(401).json({
                message: "No user found for this email"
            });
        return res.status(200).json({
            message: "User retrieved !",
            data: findUser
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

// GET THE DILEMMA DEPENDING ON NUMBER OF USERS
async function getDilemma() {
    var dilemme = await User.countDocuments().then((count) => {
        var index = count % 4;
        if (index == 0)
            return "A";
        else if (index == 1)
            return "B";
        else if (index == 2)
            return "C";
        else
            return "D";
    });
    return dilemme;
  }

// CREATE NEW USER FROM PERSONNAL INFO
exports.new = async function (req, res) {
    const email = req.body.email;
    if (!email || email.length == 0) {
        return res.status(400).json({
            message: "Invalid request"
        });
    }
    try {
        const findUser = await User.findOne({ email });
        if (findUser)
            return res.status(401).json({
                message: "User already exist"
            });
    } catch (error) {
        return res.status(500).json({ error });
    }
    try {
        
        var user = new User();
        user.email = req.body.email;
        user.infos_perso.sexe = req.body.sexe;
        user.infos_perso.age = req.body.age;
        user.infos_perso.etude = req.body.etude;
        user.infos_perso.pro = req.body.pro;
        user.infos_perso.langue = req.body.langue;
        user.infos_perso.langue_sec = req.body.langue_sec;
        user.dilemme = await getDilemma();
        const userObject = await user.save();
        return res.status(200).json({
            message: "New user created!",
            data: userObject,
            // token: userObject.getToken(),
            email: user.email,
            dilemme: userObject.dilemme
        });
      } catch (error) {
          console.log(error);
        return res.status(500).json({ error });
      }
};

//UPDATE DILEMME RESPONSE
exports.update_dilemme = async function (req, res) {
    const email = req.body.email;
    if (!email || email.length == 0) {
        return res.status(400).json({
            message: "Invalid request"
        });
    }
    try {
        const findUser = await User.findOne({ email });
        if (!findUser)
            return res.status(401).json({
                message: "No user found for this email"
            });
        findUser.dilemme_reponses.emotion_prog_a = req.body.emotion_prog_a;
        findUser.dilemme_reponses.emotion_prog_b = req.body.emotion_prog_b;
        findUser.dilemme_reponses.programme = req.body.programme;
        const updatedUser = await findUser.save();
        return res.status(200).json({
            message: "Dilemme updated !",
            data: updatedUser,
            email: findUser.email
            //token: findUser.getToken()
        });
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
};

//UPDATE ANNEXE
exports.update_annexe = async function (req, res) {
    const email = req.body.email;
    if (!email || email.length == 0) {
        return res.status(400).json({
            message: "Invalid request"
        });
    }
    try {
        const findUser = await User.findOne({ email });
        if (!findUser)
            return res.status(401).json({
                message: "No user found for this email"
            });
        findUser.annexes.connais_dilemme = req.body.connais_dilemme;
        findUser.annexes.preoccupation_epidemie = req.body.preoccupation_epidemie;
        findUser.annexes.frequence_infos = req.body.frequence_infos;
        findUser.annexes.frequence_science = req.body.frequence_science;
        findUser.annexes.exactitude_connaissance = req.body.exactitude_connaissance;
        findUser.annexes.respect_directives_sanitaires = req.body.respect_directives_sanitaires;
        findUser.annexes.raisons_respect = req.body.raisons_respect;
        const updatedUser = await findUser.save();
        return res.status(200).json({
            message: "Annexe updated !",
            data: updatedUser
            //token: findUser.getToken()
        });
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
};

//UPDATE MBTI
exports.update_mbti = async function (req, res) {
    const { email, reponses, i, e, n, s, t, f, j, p, type } = req.body;
    if (!email || email.length === 0 || !reponses || reponses.length === 0 || !type || type.length === 0 ) {
        return res.status(400).json({
            message: "Invalid request. Missing or empty parameters."
        });
    }
    try {
        const findUser = await User.findOne({ email });
        if (!findUser)
            return res.status(401).json({
                message: "No corresponding user found."
            });
        findUser.mbti.reponses = req.body.reponses;
        findUser.mbti.i = i;
        findUser.mbti.e = e;
        findUser.mbti.n = n;
        findUser.mbti.s = s;
        findUser.mbti.t = t;
        findUser.mbti.f = f;
        findUser.mbti.j = j;
        findUser.mbti.p = p;
        findUser.mbti.type = type;
        const updatedUser = await findUser.save();
        return res.status(200).json({
            message: "MBTI updated !",
            data: updatedUser
            //token: findUser.getToken()
        });
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
};
