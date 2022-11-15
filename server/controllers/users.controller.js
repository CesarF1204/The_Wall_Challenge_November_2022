const UsersModel = require('../models/users.model');
const GlobalHelper = require('../helpers/global.helper');

class UsersController {
    constructor(){
    }

    /* index */
    index(req, res){
        res.render('../../views/users/index')
    }

    /* signin */
    signin(req, res){
        res.render('../../views/users/signin')
    }

    /* logout */
    logout(req, res){
        req.session.destroy();
        res.redirect('/')
    }

    /* register */
    register(req, res){
        res.render('../../views/users/register')
    }

    registrationProcess = async function(req, res){
        let response_data = { status: false, error: null, message: ""}

        try{
            let globalHelper = new GlobalHelper();
            let validate_fields = globalHelper.validateFields(["first_name", "last_name", "email_address", "password"], [], req);

            if(validate_fields.status){
                let {first_name, last_name, email_address, password} = validate_fields.result.sanitized_data;
                response_data = await UsersModel.insertUserAccount({first_name, last_name, email_address, password});
            }
            else{
                response_data = validate_fields;
            }
        }
        catch(error){
            response_data.error = error;
        }

        res.json(response_data);
    }

    /* signin process */
    signinProcess = async function(req, res){
        let response_data = { status: false, error: null, message: ""}

        try{
            let globalHelper = new GlobalHelper();
            let validate_fields = globalHelper.validateFields(["email_address", "password"], [], req);

            if(validate_fields.status){
                let {email_address, password} = validate_fields.result.sanitized_data;
                response_data = await UsersModel.signInUser({email_address, password});

                if(response_data.result.is_user_login){
                    req.session.user_id = response_data.result.user_id;
                    req.session.is_login = response_data.result.is_user_login;
                }
            }
            else{
                response_data = validate_fields;
            }
        }
        catch(error){
            response_data.error = error;
        }

        res.json(response_data);
    }

}

module.exports = new UsersController;