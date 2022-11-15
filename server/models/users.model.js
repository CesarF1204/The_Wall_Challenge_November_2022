const DatabaseModel = require('./database/database.model');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

class UsersModel extends DatabaseModel {
    constructor(){
        super();
    }

    /* insert user account */
    insertUserAccount = async (params) => {
        let response_data = { status: false, result: {}, error: null}

        try{
            let {first_name, last_name, email_address, password} = params;
            
            let salt = await bcrypt.genSalt(10);
            let password_encrypted = await bcrypt.hash(password, salt);

            let users_data = {
                first_name,
                last_name,
                email_address,
                password: password_encrypted,
                created_at: new Date()
            }

            let {status, result} = await this.getEmailAddress(email_address);

            if(!status && !result.email_address){
                let insert_user_account_query = mysql.format(`INSERT INTO users SET ?`, users_data);
                let insert_user_account_result = await this.query(insert_user_account_query);

                response_data.result = {
                    id: insert_user_account_result.insertId,
                    full_name: first_name+' '+last_name,
                    email_address
                };

                response_data.status = insert_user_account_result.affectedRows > 0;
            }
            else{
                response_data.message = 'Email address exist. Please use another email address.'
            }
        }
        catch(error){
            response_data.error = error;
            response_data.message = "Registration failed."
        }

        return response_data;
    }

    /* signin user account */
    signInUser = async (params) => {
        let response_data = { status: false, result: {}, error: null}

        try{
            let {email_address, password} = params;

            let signin_user_query = mysql.format(`SELECT * FROM users WHERE email_address = ?`, email_address);
            let [signin_user_result] = await this.query(signin_user_query);

            let validatePassword = await bcrypt.compare(password, signin_user_result.password);

            if(validatePassword){
                response_data.result = {
                    user_id: signin_user_result.id,
                    first_name: signin_user_result.first_name,
                    last_name: signin_user_result.last_name,
                    email_address: signin_user_result.email_address,
                    is_user_login: validatePassword
                };
            }
            else{
                response_data.message = "Wrong email/password. Please try again."
            }
            
            response_data.status = validatePassword;
        }
        catch(error){
            response_data.error = error;
            response_data.message = "Login user failed."
        }

        return response_data;
    }

    /* get email address */
    getEmailAddress = async (email_address) => {
        let response_data = { status: false, result: {}, error: null}

        try{

            if(email_address){
                let get_user_email_address_query = mysql.format(`SELECT email_address FROM users WHERE email_address = ?`, email_address);
                let [get_user_email_address_result] = await this.query(get_user_email_address_query);

                if(get_user_email_address_result){
                    response_data.status = true;
                    response_data.result = get_user_email_address_result;
                }
            }
        }
        catch(error){
            response_data.error = error;
            response_data.message = "Email address not found. Please enter a valid email address."
        }

        return response_data;
    }

}

module.exports = new UsersModel;