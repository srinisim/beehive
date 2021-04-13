import { Fire } from "./config.js";
import * as FireAPI from "./Firebase";
import * as Interface from "../Interfaces";
import "firebase/auth";
import "firebase/firestore";

interface Message {
  data: any;
  msg: string | number;
}

function genMessage(_data: any, _msg: any) {
  return { msg: _msg, data: _data };
}

async function login(email: string, password: string): Promise<Message> {
  // Take in user login credentials and authenticate them
  return Fire.default
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (res: any) => {
      let tmp = await FireAPI.getDoc("Users-WEB", "email", email);
      // Since we're getDoc, getdoc returns the found users as an array
      // but we don't want an array, there could be only one person found
      // so want to just return the first entry, which should be the user
      return { data: tmp["data"][0], msg: tmp.msg };
    })
    .catch((res: any) => genMessage(false, "failed to login"));
}

// Returns {true, made a new user if successful}
// Returns {false, Failed to sginpu} if user's name is bad
// Returns {err, failed to mkae collection} if failed
async function newUser(
  email: string,
  password: string,
  firstname: string,
  lastname: string
): Promise<Message> {
        let finduser = await  FireAPI.getDoc("Users-WEB", "email", email)
        console.log(finduser)

        if(finduser["data"].length==0){
                 return Fire.default
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(async (res: any) => {
                        // return genMessage(0, "WOW")



                        const id = res.user.uid
                        let newuser =await Fire.default.firestore().collection("Users-WEB")
                        .doc(id).set({
                                firstname: firstname,
                                lastname: lastname,
                                email: email,
                                points: 0,
                                isowner: false,
                                id: id
                        }) 
                        // FireAPI.newDoc("Users-WEB", , "email")
                        return genMessage({
                                firstname: firstname,
                                lastname: lastname,
                                email: email,
                                points: 0,
                                isowner: false,
                                id: id
                        }, "Success")
                })
                .catch((err: any) => genMessage(1, err+"\nFailed to sign up"));
        }
        else{
                return genMessage(2, "Failed to make user")
                // return newuser
        }
}
async function resetPassword(email: string): Promise<Message> {
  return Fire.default
    .auth()
    .sendPasswordResetEmail(email)
    .then((res: any) => genMessage(true, "Reset password email sent"))
    .catch((res: any) => genMessage(false, "Failed to send password"));
}

async function getallUsers(): Promise<Message> {
  return FireAPI.getDoc("Users-WEB");
}

async function changeEmail(
  id: any,
  newemail: string
): Promise<Message | undefined> {
  var user = Fire.default.auth().currentUser;
  console.log(id);
  return user
    ?.updateEmail(newemail)
    .then(() => {
      return Fire.default
        .firestore()
        .collection("Users-WEB")
        .doc(id)
        .update({ email: newemail })
        .then(() => genMessage(true, "Changed email"))
        .catch((error: any) =>
          genMessage(false, "Couldn't change email," + error)
        );
    })
    .catch((error: any) => genMessage(false, "Couldn't change email," + error));
}

async function email(
  users: Interface.MemberInfo[],
  subject: string,
  body: string
) {
  let emails = users.map((x: Interface.MemberInfo) => x.email);
  const handleSaveToPC = (jsonData: any) => {
    const fileData = JSON.stringify(jsonData);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = subject + ".json";
    link.href = url;
    link.click();
  };
  handleSaveToPC({ subject: subject, body: body, bcc: emails });

  // This is the code for when the emailing
  // plan is added to the database
  // Fire.firestore()
  //   .collection("mail")
  //   .add({
  //     bcc: emails,
  //     message: {
  //       subject: subject,
  //       html: body,
  //     },
  //   });
}

export { login, newUser, resetPassword, getallUsers, changeEmail, email };
