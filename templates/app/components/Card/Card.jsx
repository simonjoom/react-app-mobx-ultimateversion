import React from 'react';
import {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import {observer} from 'mobx-react';
import Divider from 'material-ui/Divider';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
    const fetch = require('isomorphic-fetch');
//import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;
let NumberFormat;

let areIntlLocalesSupported = require('intl-locales-supported');

let localesMyAppSupports = [
    'en-US',
    'fr',
    'ru-RU',
    'pt-BR'
];

if (areIntlLocalesSupported(localesMyAppSupports)) {
    DateTimeFormat = global.Intl.DateTimeFormat;
} else {
    const IntlPolyfill = require('intl');
    NumberFormat = IntlPolyfill.NumberFormat;
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/en-US.js');
    require('intl/locale-data/jsonp/fr');
    require('intl/locale-data/jsonp/ru-RU.js');
    require('intl/locale-data/jsonp/pt-BR.js');
}


import style from './style.css';

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

const DatePickerExampleInternational = () => (
    <div>
        <DatePicker
            hintText="calendar en-US"
            firstDayOfWeek={0}
            okLabel="Book"
            DateTimeFormat={DateTimeFormat}
            formatDate={new DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }).format}
        />
        <DatePicker
            hintText="calendar fr"
            firstDayOfWeek={0}
            okLabel="Book"
            DateTimeFormat={DateTimeFormat}
            formatDate={new DateTimeFormat('fr', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }).format}
        />
        <DatePicker
            hintText="calendar pt-BR"
            firstDayOfWeek={0}
            locale="pt-BR"
            okLabel="Book"
            DateTimeFormat={DateTimeFormat}
            formatDate={new DateTimeFormat('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }).format}
        />
        <DatePicker
            hintText="calendar Russian"
            firstDayOfWeek={0}
            locale="ru-RU"
            okLabel="Book"
            DateTimeFormat={DateTimeFormat}
            formatDate={new DateTimeFormat('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }).format}
        />

    </div>
);

const Person = ({person}) => {
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
                            <strong>first_name: </strong>{`${person.facebook.first_name}`}<br />
                            <strong>last_name: </strong>{`${person.facebook.last_name}`}<br />
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
                        <strong>Price by day: </strong>{person.price}<br />
                        <strong>Teach on : </strong>{person.category}<br />

                        <strong>Work on Resort: </strong>{person.resort}<br />

                    </div>
                    { (person.facebookId) && (
                        <div>
                            <Divider />
                            <strong>first_name: </strong>{`${person.facebook.first_name}`}<br />
                            <strong>last_name: </strong>{`${person.facebook.last_name}`}<br />
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
};

const MyCard = observer(({people, displaycalendar,pict_url}) => {
    let avatar;
    if (pict_url)
    avatar = pict_url;
    else{
    if (people.facebookId){
        avatar = `https://graph.facebook.com/${people.facebookId}/picture?type=large`;
    }else if (people.googleId){

    }else{
        avatar = "";
        }
        }
    return (
        <Card>
            <CardHeader
                title="Avatar"
                subtitle="Skiscool"
                size={128}
                avatar={avatar}
            />
            <Choose>
                <When condition={people.facebookId}>
                    <Paper zDepth={1} style={{width: 'auto', margin: 10}}>
                        <i className="fa fa-facebook"/>
                        <CardTitle title="Facebook" subtitle="Facebook subtitle"/>
                        { displaycalendar && <DatePickerExampleInternational />}
                        <Person person={people}/>
                    </Paper>
                </When>
                <When condition={people.instagramId}>
                    <Paper zDepth={1} style={{width: 'auto', margin: 10}}>
                        <i className="fa fa-instagram"/>
                        <CardTitle title="Instagram" subtitle="Instagram subtitle"/>
                        { displaycalendar && <DatePickerExampleInternational />}
                        <Person person={people}/>
                    </Paper>
                </When>
                <When condition={people.googleId}>
                    <Paper zDepth={1} style={{width: 'auto', margin: 10}}>
                        <i className="fa fa-google"/>
                        <CardTitle title="Instagram" subtitle="Google subtitle"/>
                        { displaycalendar && <DatePickerExampleInternational />}
                        <Person person={people}/>
                    </Paper>
                </When>
                <Otherwise>
                <Paper zDepth={1} style={{width: 'auto', margin: 10}}>
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
