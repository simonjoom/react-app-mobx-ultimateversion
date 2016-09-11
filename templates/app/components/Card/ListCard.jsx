import React from 'react';
import {observer} from 'mobx-react';
import {PropTypes} from 'react';
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

let ListCard = [];

const AddtoList = (Card) => {
    ListCard.push(Card);
};
const SetList = (Cards) => {
    ListCard=[...Cards];
};
const Display_cards = observer(({children}) => {
    return (
        <ul className="list-reset mt3">
            {children.map(function (listValue, k) {
                return <li className="sm-col sm-col-6 md-col-4 lg-col-3 p1" key={k}>{listValue}</li>;

            })}
        </ul>
    );
});
Display_cards.propTypes = {
    children: PropTypes.array.isRequired,
};
export {ListCard, Display_cards, AddtoList};
