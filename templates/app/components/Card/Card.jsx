import React from 'react';
import { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { observer } from 'mobx-react';
import Divider from 'material-ui/Divider';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';


const areIntlLocalesSupported = require('intl-locales-supported');
// import areIntlLocalesSupported from 'intl-locales-supported';

const lang = window.__lang__;
const locales = lang === 'fr' ? 'fr' : lang === 'ru' ? 'ru-RU' : lang === 'pt' ? 'pt-BR' : lang === 'uk' ? 'uk-UA' : 'en-GB';
const localesMyAppSupports = [locales];
/*
 if (areIntlLocalesSupported(localesMyAppSupports)) {
 DateTimeFormat = global.Intl.DateTimeFormat;
 } else {
 const IntlPolyfill = require('intl');
 NumberFormat = IntlPolyfill.NumberFormat;
 DateTimeFormat = IntlPolyfill.DateTimeFormat;
 require('intl/locale-data/jsonp/'+locales+'.js');
 }*/

if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!areIntlLocalesSupported(localesMyAppSupports)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and replace the constructors with need with the polyfill's.
    require('intl');
    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/' + locales + '.js');
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = require('intl');
}

const DateTimeFormat = Intl.DateTimeFormat;
const NumberFormat = Intl.NumberFormat;


/*
 person{
 type: //Instructor or Client
 uuid: { type: String, required: true, unique: true },
 email: { type: String, required: false, unique: true },
 username: { type: String, required: false, unique: true },
 password: { type: String, required: false },
 usertype: { type: String, enum: ['instructor', 'client', ''], default: '' },
 isAdmin: { type: Boolean, default: false },
 gender: { type: String, enum: ['male', 'female', ''], default: '' },
 price: { type: Number, default: 0 },
 resort: { type: String, enum: ['courchevel', 'meribel', 'valthorens', ''], default: '' },
 category: { type: String, enum: ['ski', 'snowboard', ''], default: '' },
 facebookId: { type: String },
 facebook: { type: Schema.Types.Mixed },
 googleId: { type: String },
 google: { type: Schema.Types.Mixed },
 instagramId: { type: String },
 instagram: { type: Schema.Types.Mixed },

 createdAt: { type: Date, default: Date.now },
 updatedAt: { type: Date, default: Date.now },
 */

const DatePickerExampleInternational = () => {

  return (
    <DatePicker
      hintText="calendar"
      firstDayOfWeek={0}
      locale={locales}
      okLabel="Book"
      DateTimeFormat={DateTimeFormat}
      formatDate={new DateTimeFormat(`${locales}`, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format}
    />);
};

const Person = ({ person }) => {
  if (person.usertype !== 'instructor') {
    return (<CardText>
      <p> Info : {`${person.usertype}`}</p>
      <div className="clearfix border">
        <div className=" ">
          <div>
            <strong>id: </strong>{person.id}<br />
            <strong>username: </strong>{person.username}<br />
            <strong>Ride on : </strong>{person.category}<br />
          </div >
          { (person.facebookId) && (
            <div>
              <Divider />
              <strong>first_name: </strong>{`${person.first_name}`}<br />
              <strong>last_name: </strong>{`${person.last_name}`}<br />
            </div>
          )}
          <Divider />
          <strong>gender: </strong>{person.gender}<br />
          <Divider />
          <strong>CreatedAt: </strong>{person.createdAt}<br />
          <strong>Registered with : <br/>
            { (person.facebookId) && "facebook, "}
            { (person.googleId) && "Google, "}
            { (person.instagramId) && "Instagram, "}
            { (person.isAdmin) && "Administrator, "}
          </strong>
          <Divider />
        </div>
      </div>
    </CardText>);
  }
  else {
    return (<CardText>
      <p> Info : {`${person.usertype}`}</p>
      <div className="clearfix border">
        <div className=" ">
          <div>
            <strong>id: </strong>{person.id}<br />
            <strong>username: </strong>{person.username}<br />
            <strong>Rates: </strong>{person.rate}<br />
            <strong>Price by day: </strong>{person.price} Eur<br />
            <strong>Teach on : </strong>{person.category}<br />

            <strong>Work on Resort: </strong>{person.resort}<br />

          </div>
          { (person.facebookId) && (
            <div>
              <Divider />
              <strong>first_name: </strong>{`${person.first_name}`}<br />
              <strong>last_name: </strong>{`${person.last_name}`}<br />
            </div>
          )}
          <Divider />
          <strong>gender: </strong>{person.gender}<br />
          <Divider />
          <strong>CreatedAt: </strong>{person.createdAt}<br />
          <strong>Registered with : <br />
            { (person.facebookId) && 'facebook, '}
            { (person.googleId) && 'Google, '}
            { (person.instagramId) && 'Instagram, '}
            { (person.isAdmin) && 'Administrator, '}
          </strong>
          <Divider />
        </div>
      </div>
    </CardText>);
  }
};

const MyCard = observer(({ people, displaycalendar, pict_url }) => {
  let avatar;
  let liststar = [];
  if (pict_url)
    avatar = pict_url;
  else {
    if (people.facebookId) {
      avatar = `https://graph.facebook.com/${people.facebookId}/picture?type=large`;
      people.first_name = people.facebook.first_name;
      people.last_name = people.facebook.last_name;
    } else if (people.googleId) {
      people.first_name = people.google.first_name;
      people.last_name = people.google.last_name;
    } else {
      avatar = '';
    }
  }

  if (people.usertype === 'instructor') {
    let r = people.rate;
    while (r--) {
      liststar.push(<i className="mb1 fa fa-star"/>);
    }
  }

  return (
    <Card>
      {liststar.length ? <CardHeader
        title="Avatar"
        subtitle="Skiscool"
        size={128}
        avatar={avatar}
        children={
          <div className="mr1">{
            liststar.map((listValue, i) => (
              <span key={i}>{listValue}</span> ))} </div>
        }
      ></CardHeader>
        : <CardHeader
        title="Avatar"
        subtitle="Skiscool"
        size={128}
        avatar={avatar}
      />}
      <Choose>
        <When condition={people.facebookId}>
          <Paper zDepth={1} style={{ width: 'auto', margin: 10 }}>
            <i className="fa fa-facebook"/>
            <CardTitle title="Facebook" subtitle="Facebook subtitle"/>
            { displaycalendar && <DatePickerExampleInternational />}
            <Person person={people}/>
          </Paper>
        </When>
        <When condition={people.instagramId}>
          <Paper zDepth={1} style={{ width: 'auto', margin: 10 }}>
            <i className="fa fa-instagram"/>
            <CardTitle title="Instagram" subtitle="Instagram subtitle"/>
            { displaycalendar && <DatePickerExampleInternational />}
            <Person person={people}/>
          </Paper>
        </When>
        <When condition={people.googleId}>
          <Paper zDepth={1} style={{ width: 'auto', margin: 10 }}>
            <i className="fa fa-google"/>
            <CardTitle title="Instagram" subtitle="Google subtitle"/>
            { displaycalendar && <DatePickerExampleInternational />}
            <Person person={people}/>
          </Paper>
        </When>
        <Otherwise>
          <Paper zDepth={1} style={{ width: 'auto', margin: 10 }}>
            <i className="fa fa-contact"/>
            <CardTitle title="Manual" subtitle="Manual registered"/>
            { displaycalendar && <DatePickerExampleInternational />}
            <Person person={people}/>
          </Paper>
        </Otherwise>
      </Choose>

    </Card>
  );
});

MyCard.propTypes = {
  people: PropTypes.object.isRequired,
  displaycalendar: PropTypes.bool.isRequired,
  pict_url: PropTypes.string,
};

export default MyCard;
