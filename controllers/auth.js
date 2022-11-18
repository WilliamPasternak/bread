const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

// Password Reset:
const Token = require("../models/Token")
const crypto = require("crypto")
const { token } = require('morgan') // Not sure morgan is needed. Test and delete.
const nodemailer = require("nodemailer")

exports.forgotPassword = async (req, res) => {
  const validation = []

  //Check if email exists in DB
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  let emailUser = await User.findOne({email: req.body.email})
  if (!emailUser) {
    console.log("User with email not found")
    validation.push({ msg: 'Email address was not found. Check email address or signup below.' })
    req.flash("errors", validation)
    return res.redirect("/passwordReset")
  }

  console.log("Email Exists")

  //If token exists, Do not create a new one
  let tokenAlreadyExists = await Token.findOne({email: req.body.email})
  if (tokenAlreadyExists) {
    console.log("Token exists already") 
    validation.push({ msg: 'A password reset email has previously been sent and is still active, please use the link in that email to reset your password.' })
    req.flash("errors", validation)
    return res.redirect('/passwordReset')
  }
    console.log("Token not found. Creating new token")

  const token = new Token({
    Token: crypto.randomBytes(20).toString("hex"),
    email: req.body.email,
  })

  token.save()

  //Send Email with reset link
  const transporter = await nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Mail transporter is working");
    }
  });

  const resetURL = `http://${req.headers.host}/passwordReset/${token.Token}`

  let msg = await transporter.sendMail({
    from: `Password Reset ${process.env.MAIL_USER}`,
    to: req.body.email,
    subject: "bread Password Reset",
    text: `A password reset request was sent for your account. Please click the following link to reset your password and this link will expire in one hour: ${resetURL} .`
  })

  validation.push({ msg: 'An email with a password reset link has been sent!' })
  req.flash("success", validation)
  console.log("Email was sent")

  res.redirect('/passwordReset')

}


exports.forgotPasswordES = async (req, res) => {
  const validation = []

  //Check if email exists in DB
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  let emailUser = await User.findOne({email: req.body.email})
  if (!emailUser) {
    console.log("User with email not found")
    validation.push({ msg: 'No se encontró la dirección de correo electrónico. Verifique la dirección de correo electrónico o regístrese a continuación.' })
    req.flash("errors", validation)
    return res.redirect("/es/passwordReset")
  }

  console.log("Email Exists")

  //If token exists, Do not create a new one
  let tokenAlreadyExists = await Token.findOne({email: req.body.email})
  if (tokenAlreadyExists) {
    console.log("Token exists already") 
    validation.push({ msg: 'Anteriormente se envió un correo electrónico de restablecimiento de contraseña y aún está activo, use el enlace en ese correo electrónico para restablecer su contraseña.' })
    req.flash("errors", validation)
    return res.redirect('/es/passwordReset')
  }
    console.log("Token not found. Creating new token")

  const token = new Token({
    Token: crypto.randomBytes(20).toString("hex"),
    email: req.body.email,
  })

  token.save()

  //Send Email with reset link
  const transporter = await nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Mail transporter is working");
    }
  });

  const resetURL = `http://${req.headers.host}/es/passwordReset/${token.Token}`

  let msg = await transporter.sendMail({
    from: `Restablecimiento de contraseña ${process.env.MAIL_USER}`,
    to: req.body.email,
    subject: "bread Restablecimiento de contraseña",
    text: `Se envió una solicitud de restablecimiento de contraseña para su cuenta. Haga clic en el siguiente enlace para restablecer su contraseña y este enlace caducará en una hora:
    ${resetURL} .`
  })

  validation.push({ msg: '¡Se ha enviado un correo electrónico con un enlace para restablecer la contraseña!'})
  req.flash("success", validation)
  console.log("Email was sent")

  //Redirect to login
  res.redirect('/es/passwordReset')

}





exports.getReset = (req, res) => {
  if (req.user) {
    return res.redirect('/')
  }
  res.render('passwordReset', {
    user: req.user,
    title: 'Reset Your Password'
  })
}

exports.getResetES = (req, res) => {
  if (req.user) {
    return res.redirect('/es/')
  }
  res.render('es/passwordReset', {
    title: 'Restablecimiento de Contraseña',
    user: req.user,
  })
}

exports.getResetForm = async (req, res) => {
  const token = await Token.findOne({Token: req.params.token}) 
  if(!token) {
    req.flash("errors", [{msg: "Reset password link has expired, please try again."}])
    console.log("Cannot find token in db")
    return res.redirect('/passwordReset')
  }
  res.render("newPassword.ejs", {  
    tokenObj: token, 
    title: 'Set a new password',
    user: req.user
  })
}

exports.getResetFormES = async (req, res) => {
  const token = await Token.findOne({Token: req.params.token}) 
  if(!token) {
    req.flash("errors", [{msg: "El enlace para restablecer la contraseña ha caducado, inténtalo de nuevo."}])
    console.log("Cannot find token in db")
    return res.redirect('/es/passwordReset')
  }
  res.render("es/newPassword.ejs", {  
    tokenObj: token, 
    title: 'Set a new password',
    user: req.user
  })
}



exports.resetPassword = async (req, res)=> {
  const token = await Token.findOne({Token: req.params.token})
  const user = await User.findOne({email: token.email})
  const validation = []

  // If not logged in
  if (!user) { 
    validation.push({ msg: 'Reset password link has expired, please try again.' })
    req.flash("errors", validation)
    console.log("Error finding email")
    return res.redirect('/')
  }

  // Validator
  if (!validator.isLength(req.body.password, { min: 8 })) validation.push({ msg: 'Password must be at least 8 characters long' })
  if (req.body.password !== req.body.confirmPassword) validation.push({ msg: 'Passwords do not match' })

  if(validation.length > 0) {
    req.flash("errors", validation)
    console.log("Check Errors")
    return res.redirect('back')
  }

   user.password = req.body.password

  User.findOneAndUpdate({$or: [
    {email: user.email}
  ]}, (err) => {
    if (err) { return next(err) }
    user.save((err) => {
      if (err) { return next(err) }
      req.logIn(user, (err) => {
        if (err) {
          return next(err)
        }
        res.redirect('/')
      })
    })
  })

  user.updateOne({password: req.body.password}) 
  user.save()

// Send Success Message
  req.flash('success', 'Password Successfully Changed! Please Log In Below')

  res.redirect('/login') // Password Changed Successfully
}


exports.resetPasswordES = async (req, res)=> {
  const token = await Token.findOne({Token: req.params.token})
  const user = await User.findOne({email: token.email})
  const validation = []

  // If not logged in
  if (!user) { 
    validation.push({ msg: 'Reset password link has expired, please try again.' })
    req.flash("errors", validation)
    console.log("Error finding email")
    return res.redirect('/')
  }

  // Validator
  if (!validator.isLength(req.body.password, { min: 8 })) validation.push({ msg: 'La contraseña debe tener al menos 8 caracteres' })
  if (req.body.password !== req.body.confirmPassword) validation.push({ msg: 'Las contraseñas no coinciden' })

  if(validation.length > 0) {
    req.flash("errors", validation)
    console.log("Check Errors")
    return res.redirect('back')
  }

   user.password = req.body.password

  User.findOneAndUpdate({$or: [
    {email: user.email}
  ]}, (err) => {
    if (err) { return next(err) }
    user.save((err) => {
      if (err) { return next(err) }
      req.logIn(user, (err) => {
        if (err) {
          return next(err)
        }
        res.redirect('/es/')
      })
    })
  })

  user.updateOne({password: req.body.password}) 
  user.save()

// Send Success Message
  req.flash('success', '¡Contraseña cambiada correctamente! Inicie sesión a continuación')

  res.redirect('/es/login') // Password Changed Successfully
}




// End Password Rest




exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "bread | Login",
    user: req.user,
  });
};

exports.getLoginES = (req, res) => {
  if (req.user) {
    return res.redirect("/es/profile");
  }
  res.render("es/login", {
    title: "bread | Acceso",
    user: req.user,
  });
};


exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

exports.postLoginES = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Por favor, introduce una dirección de correo electrónico válida." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "La contraseña no puede estar en blanco." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/es/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/es/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/es/profile");
    });
  })(req, res, next);
};

exports.logout = async (req, res) => {
  await req.logout(() => {

    req.session.destroy((err) => {
      if (err)
        console.log("Error : Failed to destroy the session during logout.", err);
      req.user = null;
      res.redirect("/");
    });
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("signup", {
    title: "bread | Sign Up",
    user: req.user
  });
};

exports.getSignupES = (req, res) => {
  if (req.user) {
    return res.redirect("/es/profile");
  }
  res.render("es/signup", {
    title: "bread | Registrarse",
    user: req.user
  });
};

exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    {email: req.body.email },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or usernamealready exists.",
        });
        return res.redirect("../signup");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/profile");
        });
      });
    }
  );
};

exports.postSignupES = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Por favor, introduce una dirección de correo electrónico válida." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "La contraseña debe tener al menos 8 caracteres",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Las contraseñas no coinciden" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../es/signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    {email: req.body.email },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Ya existe una cuenta con esa dirección de correo electrónico o nombre de usuario.",
        });
        return res.redirect("../es/signup");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/es/profile");
        });
      });
    }
  );
};



