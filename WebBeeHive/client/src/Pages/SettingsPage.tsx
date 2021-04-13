import React from "react";
import "../CSS/SettingsPage.css";
import * as API from "../api/User";
import { store } from "../store";

interface IProp {
  id: string;
}


function SettingsPage({id}:IProp) {
  // const [oldEmail, setOldEmail] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");

  return (
    <div className="SettingsPage">
      <div className="SettingsPage-FormDiv">
        <form className="SettingsPage-Form">
          <p className="SettingsPage-InputTitle">New Email</p>
          <input
            className="SettingsPage-Input"
            type="text"
            onChange={(e) => setNewEmail(e.target.value)}
            id="newEmail"
            value={newEmail}
          />
        </form>
        <div className="SettingsPage-Buttons">
          <button
            className="SettingsPage-LigtButton"
            onClick={() => {
              API.changeEmail(id, newEmail).then((res) => {
                      console.log(res)
                if (res) alert("Change email successfully");
                else alert("Failed to change email");
              });
            }}
          >
            Change Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;