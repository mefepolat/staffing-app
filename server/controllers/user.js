const User = require('../models/user');
const passport = require('passport');


module.exports.registerUser = async(req,res,next) => {
    try {
        const {firstName, lastName, username, email, password, phoneNumber} = req.body;
        const user = new User({firstName, lastName, username, email, phoneNumber});
        const registeredUser = await User.register(user, password);
        console.log(user)
        res.json(registeredUser);
    } catch (error) {
        res.json({
            error
        });
    }
};


module.exports.login = (req,res,next) => {
    
    passport.authenticate('local', (err, user, info) => {
        if(err){
            return next(err);
        }
        if(!user){
            return res.status(400).json({
                success:false,
                message: 'Invalid username or password'
            });
        }

        req.login(user, (err) => {
            if (err){
                return next(err);
            }

            req.session.user = {
                _id: user._id,
                email: user.email,
                employer: user.employer,
                availabilities: user.availabilities,
            };

            return res.json({session: req.session})
        });
    })(req,res,next);
};


module.exports.logout = (req,res,next) => {

    req.logout(function (error) {
        if(error){
            next(error);
        };

        res.clearCookie('session');
        req.session.destroy();
        return res.json({
            success:true,
            message: 'Successfully logged out'
        });
    });
};