import pool from "../config/connectDB";
import multer from "multer";

let getHomepage = async (req, res) => {
    //logic
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.render('index.ejs', {dataUser: rows});
}

let getDetailPage = async (req, res) => {
    //logic
    let userId = req.params.id;
    let [user] = await pool.execute('SELECT * FROM users where id=?',[userId]);
    //console.log('info',user);
    return res.send(JSON.stringify(user));
}

let createNewUser = async (req, res) => {
    //logic
    //console.log('check request:', req.body);
    let {firstName, lastName, email, address} = req.body;
    await pool.execute('insert into users(firstName,lastName,email,address) values(?,?,?,?)',
    [ firstName, lastName, email, address]);
    return res.redirect('/');
}

let deleteUser = async (req, res) => {
    //logic
    let userId = req.body.userId;
    await pool.execute('delete from users where id=?',[userId]);
    return res.redirect('/');
}

let getEditPage = async (req, res) => {
    //logic
    let id = req.params.id;
    let [user] = await pool.execute('SELECT * FROM users where id=?',[id]);
    return res.render('update.ejs', {dataUser: user[0]});
}

let updateUser = async (req, res) => {
    //logic
    // console.log('check request:', req.body);
    let {firstName, lastName, email, address,id} = req.body;
    await pool.execute('update users set firstName=?,lastName=?,email=?,address=? where id =?',
    [firstName,lastName,email,address,id]);
    return res.redirect('/');
}

let getUploadFilePage = async (req, res) =>{
    return res.render('uploadFile.ejs');
}

const upload = multer().single('profile_pic');

let handleUploadFile = async (req, res) => {

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}

module.exports = {
    getHomepage,getDetailPage,deleteUser,createNewUser,getEditPage,updateUser,getUploadFilePage, handleUploadFile
}

