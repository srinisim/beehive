import React from "react";
import "../CSS/EmailModal.css";

interface IProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

function EmailModal({ showModal, setShowModal }: IProps) {
  const [email, setEmail] = React.useState({
    subject: "",
    body: "",
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(!showModal);
    setEmail({ subject: "", body: "" });
  };

  const handleCancel = () => {
    setShowModal(!showModal);
    setEmail({ subject: "", body: "" });
  };

  return (
    <div>
      {showModal ? (
        <div className="EmailModal-Background">
          <div className="EmailModal-FormDiv">
            <form className="EmailModal-Form" onSubmit={handleSend}>
              <div className="EmailModal-SubjectDiv">
                <input
                  className="EmailModal-Subject"
                  placeholder="Subject"
                  type="text"
                  id="subject"
                  value={email.subject}
                  onChange={(e) =>
                    setEmail({
                      subject: e.target.value,
                      body: email.body,
                    })
                  }
                />
              </div>
              <div className="EmailModal-BodyDiv">
                <textarea
                  className="EmailModal-Body"
                  placeholder="Body"
                  aria-multiline
                  id="body"
                  value={email.body}
                  onChange={(e) =>
                    setEmail({
                      subject: email.subject,
                      body: e.target.value,
                    })
                  }
                />
              </div>
              <div className="EmailModal-BtnDiv">
                <button className="EmailModal-CancelBtn" onClick={handleCancel}>
                  Cancel
                </button>
                <input
                  className="EmailModal-SendBtn"
                  type="submit"
                  value="Send"
                />
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default EmailModal;
