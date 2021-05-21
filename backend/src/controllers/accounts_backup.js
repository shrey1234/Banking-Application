import {pool} from './cloudsqlConnection.js';


export async function getAccountsForUser(req, res)  {
const postObj=req.body
const userID=postObj.userID
  try {
    const tabsQuery = pool.query("SELECT * FROM banking.accounts where userID=?;",[userID]);
        let x = await tabsQuery;
res.json(x);
} catch (err) {
        console.error(err);
    res
      .status(500)
      .send(
        'Unable to load page. Please check the application logs for more details.'
      )
      .end();
  }
}

export async function getAccount(req, res)  {
const postObj=req.body
const accountNum=postObj.accountNum
  try {
    const tabsQuery = pool.query("SELECT * FROM banking.accounts where accountNum=?;",[accountNum]);
        let x = await tabsQuery;
res.json(x);
} catch (err) {
        console.error(err);
    res
      .status(500)
      .send(
        'Unable to load page. Please check the application logs for more details.'
      )
      .end();
  }
}


export async function createAccount(req, res)  {
  const timestamp = new Date();

const postObj=req.body
const userID=postObj.userID
const accountType=postObj.accountType

  try {
    const stmt = 'INSERT INTO banking.accounts (userID,totalBalance,availableBalance,accountType,accountStatus) values (?,0.0,0.0,?,"active")';
    await pool.query(stmt,[userID,accountType]);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(
        'Unable to successfully create accounts! Please check the application logs for more details.'
      )
      .end();
  }

  res.status(200).send('Successfully inserted records').end();
}
export async function updateBalance(req, res){
const postObj=req.body
const accountNum=postObj.accountNum
const balanceType=postObj.balanceType
const balanceAmount=postObj.balanceAmount
let stmt = ""
  try {
console.log("start");
if(balanceType=="totalBalance"){
console.log("if");   
 stmt = 'update banking.accounts set totalBalance=? where accountNum=?';
}
else{
console.log("else");
stmt = 'update banking.accounts set availableBalance=? where accountNum=?';
}
    await pool.query(stmt,[balanceAmount,accountNum]);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(
        'Unable to successfully update accounts balance amount! Please check the application logs for more details.'
      )
      .end();
  }

  res.status(200).send('Successfully updated records').end();

}

export async function removeAccount(req, res){
const postObj=req.body
const accountNum=postObj.accountNum
  try {
const stmt = 'delete banking.accounts where accountNum=?';

    await pool.query(stmt,[accountNum]);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(
        'Unable to successfully delete accounts! Please check the application logs for more details.'
      )
      .end();
  }

  res.status(200).send('Successfully deleted records').end();

}



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
