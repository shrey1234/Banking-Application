import {pool} from './cloudsqlConnection.js';

export async function updateEmail(req, res){
const postObj=req.body
const email=postObj.email
const userID=postObj.userID
  try {
const stmt = 'update banking.users set email=? where userID=?';

    await pool.query(stmt,[email,userID]);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(
        'Unable to successfully update accounts email ID! Please check the application logs for more details.'
      )
      .end();
  }

  res.status(200).send('Successfully updated records').end();

}

export async function updatePassword(req, res){
const postObj=req.body
const password=postObj.password
const userID=postObj.userID
  try { 
const stmt = 'update banking.users set password=? where userID=?';

    await pool.query(stmt,[password,userID]);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(
        'Unable to successfully update accounts password! Please check the application logs for more details.'
      )
      .end();
  }

  res.status(200).send('Successfully updated records').end();

}
