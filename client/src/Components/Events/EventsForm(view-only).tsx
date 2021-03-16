import React from "react";
import TwitterLogo from "../../Images/Twitter_Social_Icon_Rounded_Square_Color.png";
import FacebookLogo from "../../Images/f_logo_RGB-Blue_58.png";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import "../../CSS/Events/EventsForm(view-only).css";
import * as API from "../../api/Event";

enum Relation{
        Manager,
        RSVP,
        NotRSVP
}
interface EventInfo {
  name: string;
  address: string;
  time: string;
  date: string;
  description: string;
  relation: Relation;
}

function EventsForm({ name, address, time, date, description, relation }: EventInfo) {
        // const [relation, setIsRSVP] = React.useState(relation);
        alert(relation)
        const setRSVP = () => {
                if(relation === Relation.RSVP){
                        relation = Relation.NotRSVP
                }
                else{
                        relation = Relation.RSVP
                }
        };
        const returnRSVP = () =>{
                switch(relation){
                        case Relation.Manager:
                                return <>MEME</>
                                break;
                        case Relation.RSVP:
                                return (<div className="EventsForm-view-only-RSVPChecked">
                                        <form>
                                                <label className="EventsForm-view-only-RSVPForm">
                                                        RSVP
                                                        <input type="checkbox" defaultChecked={true} onChange={setRSVP} />
                                                </label>
                                        </form>
                                </div>)
                                break;
                        case Relation.NotRSVP:
                                return (<div className="EventsForm-view-only-RSVPUnChecked" >
                                        <form>
                                                <label className="EventsForm-view-only-RSVPForm">
                                                        RSVP
                                                        <input type="checkbox" defaultChecked={false} onChange={setRSVP} />
                                                </label>
                                        </form>
                                </div>)
                                break;
                }
        }


                const quote = `Come join me at the ${name} event!`;
                const hashtags = ["BeeHive"];

  return (
    <div className="EventsForm-view-only">
      <div className="EventsForm-view-only-Top">
        <div className="EventsForm-view-only-NameAddressTimeDateGroup">
          <div className="EventsForm-view-only-NameDiv">
            <label className="EventsForm-view-only-NameLabel">Name</label>
            <div className="EventsForm-view-only-Name">{name}</div>
          </div>
          <div className="EventsForm-view-only-AddressTimeDateGroup">
            <div className="EventsForm-view-only-AddressTimeDateLabel">
              <label className="EventsForm-view-only-AddressLabel">
                Address
              </label>
              <label className="EventsForm-view-only-TimeLabel">Time</label>
              <label className="EventsForm-view-only-DateLabel">Date</label>
            </div>
            <div className="EventsForm-view-only-AddressTimeDateInfo">
              <div className="EventsForm-view-only-Address">{address}</div>
              <div className="EventsForm-view-only-Time">{time}</div>
              <div className="EventsForm-view-only-Date">{date}</div>
            </div>
          </div>
        </div>
        <div className="EventsForm-view-only-SocialMediaButtons">
          <TwitterShareButton
            url="http://localhost:3000/"
            title={quote}
            hashtags={hashtags}
          >
            <img
              alt="Twitter Icon"
              className="EventsForm-SocialMediaButtons-Twitter"
              src={TwitterLogo}
            />
          </TwitterShareButton>
          <FacebookShareButton
            url="https://www.google.com/"
            quote={quote}
            hashtag="#BeeHive"
          >
            <img
              alt="Facebook Icon"
              className="EventsForm-SocialMediaButtons-Facebook"
              src={FacebookLogo}
            />
          </FacebookShareButton>
        </div>
      </div>
      <div className="EventsForm-view-only-DescriptionDiv">
        <label className="EventsForm-view-only-DescriptionLabel">
          Description
        </label>
        <div className="EventsForm-view-only-Description">{description}</div>
      </div>
            
            {returnRSVP()}
            
    </div>
  );
}

export default EventsForm;
