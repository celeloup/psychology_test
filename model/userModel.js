const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: { type: String, lowercase: true, trim: true, unique: true,  required: true },
    infos_perso:
    {
      sexe: { type: String, required: true },
      age: { type: String, required: true },
      etude: { type: String, required: true },
      pro: { type: String, required: true },
      langue: { type: String, required: true },
      langue_sec: { type: String, required: true }
    },
    dilemme: { type: String, required: true },
    dilemme_reponses: 
    {
      emotion_prog_a: { type: Number },
      emotion_prog_b: { type: Number },
      programme: { type: String }
    },
    annexes:
    {
      connais_dilemme: { type: Boolean },
      preoccupation_epidemie: { type: Number },
      frequence_infos: { type: String },
      frequence_science: { type: String },
      exactitude_connaissance: { type: Number },
      respect_directives_sanitaires: { type: Number },
      raisons_respect: { type: [String] }
    },
    mbti:
    {
      reponses: { type: [Number] },
      i: { type: Number },
      e: { type: Number },
      n: { type: Number },
      s: { type: Number },
      t: { type: Number },
      f: { type: Number },
      j: { type: Number },
      p: { type: Number },
      type: { type: String }
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

userSchema.methods = {
  // authenticate: function(password) {
  //   return passwordHash.verify(password, this.password);
  // },
  // getToken: function() {
  //   return jwt.encode(this, config.secret);
  // }
};

module.exports = mongoose.model("User", userSchema);

module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
}