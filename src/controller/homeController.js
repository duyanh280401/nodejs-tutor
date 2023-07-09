import pool from "../config/connectDB";

let getHomepage = async (req, res) => {
    //logic
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.render('index.ejs', {dataUser: rows});
}

let getDetailPage = async (req, res) => {
    //logic
    let userId = req.params.id;
    let [user] = await pool.execute('SELECT * FROM users where id=?',[userId]);
    console.log('info',user);
    return res.send(JSON.stringify(user));
}

module.exports = {
    getHomepage,getDetailPage
}

