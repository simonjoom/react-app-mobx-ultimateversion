import { observer } from 'mobx-react';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import SubHeader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import dispatch from '~/temp/core/dispatch';
import React, { PropTypes } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import cx from 'classnames';
import CardInstructor from './Card';
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

const styles = {
  block: {
    width: '120px',
  },
  checkbox: {
    flex: 1,
    textAlign: 'left',
    display: 'inline-block',
  },
  radioButton: {
    flex: 1,
    textAlign: 'left',
  },
};

const handletoggleGender = (e) => {
  dispatch('instructor.setGenderState', e.target.value);
};

const handletoggleSnowboardCategory = () => {
  dispatch('instructor.toggleSnowboard');
};
const handletoggleSkiCategory = () => {
  dispatch('instructor.toggleSki');
};
const handletoggleUserInstructor = () => {
  dispatch('instructor.toggleUserInstructor');
};
const handletoggleUserClient = () => {
  dispatch('instructor.toggleUserClient');
};
const handletogglePriceMin = (e, state) => {
  dispatch('instructor.togglePriceMin', state);
};
const handletogglePriceMax = (e, state) => {
  dispatch('instructor.togglePriceMax', state);
};
const handlerate = (star) => {
  const id = star.currentTarget.id;
  dispatch('instructor.toggleRate', (id === "star1" ? 1 : id === "star2" ? 2 : id === "star3" ? 3 : 4));
};

const filterSex = (passusers, stateInst) => passusers.filter(key => (stateInst.toggleGenderstate === 'All' || stateInst.toggleGenderstate === key.gender));
const filterCategory = (passusers, stateInst) => passusers.filter(key => (stateInst.isCategoryState(key.category)));
const filterUsertype = (passusers, stateInst) => passusers.filter(key => (stateInst.isUsertypeState(key.usertype)));
const filterPrice = (passusers, stateInst) => passusers.filter(key =>
  ((((key.usertype === 'instructor') &&
  ((key.price >= stateInst.PriceMin) &&
    (key.price <= stateInst.PriceMax)
  ))) || (key.usertype === 'client')));
/*
 if ((key.usertype == 'instructor') &&
 ( (key.price >= stateInst.PriceMin) &&
 (key.price <= stateInst.PriceMax)
 )) {
 keeponlist
 } else {
 if (key.usertype == 'client')
 keeponlist
 else
 deleteoflist
 }
 */
const filterStar = (passusers, stateInst) => passusers.filter(key => (((stateInst.toggleRate1state) && (key.usertype == 'instructor') &&
(key.rate === stateInst.currentRate)) || (key.usertype == 'client' || (!stateInst.toggleRate1state))));
/*
 return passusers.reduce((result, key) => {
 if ((stateInst.toggleRate1state) && (key.usertype == 'instructor') &&
 (key.rate == stateInst.currentRate)) {
 keeponlist
 } else {
 if (key.usertype == 'client' || (!stateInst.toggleRate1state))
 keeponlist
 else
 deleteoflist
 }
 }, []);
 */

const Display_card = observer(({ appstate, passusers }) => {
  const bp = appstate.ui.breakpoints;
  const stateInst = appstate.instructor;
  // children list object user
  let listcomponent;
  let listusers;
  listusers = filterPrice(filterUsertype(filterCategory(filterSex(passusers, stateInst), stateInst), stateInst), stateInst);
  listusers = filterStar(listusers, stateInst);

  listcomponent = listusers.reduce((result, key, i) =>
    ([...result, <CardInstructor people={ key } displaycalendar={key.calendar}/>]), []);

  return (
    <div>
      <SubHeader>Sex: </SubHeader>
      <RadioButtonGroup
        name={"sex"}
        defaultSelected={stateInst.toggleGenderstate}
        style={styles.block}
        onChange={handletoggleGender}
        className={cx('flex ml4', { 'flex-column': bp.xs })}
      >
        <RadioButton
          value="All"
          label="All"
        />
        <RadioButton
          value="male"
          label="Male"
        />
        <RadioButton
          value="female"
          label="Female"
        />
      </RadioButtonGroup>

      <div name={"usertype"}
           className={"col-2 right"}
      >
        <SubHeader>Type User</SubHeader>
        <Checkbox
          onCheck={handletoggleUserInstructor}
          checked={stateInst.toggleInstructorstate}
          defaultChecked
          label="Instructors"
        />

        <Checkbox
          onCheck={handletoggleUserClient}
          checked={stateInst.toggleClientstate}
          label="Clients"
        />
      </div>

      <SubHeader>Teach /ride on</SubHeader>
      <div name={"category"}
           style={styles.block}
           className={cx("flex ml4", { 'flex-column': bp.xs })}
      >
        <Checkbox
          onCheck={handletoggleSkiCategory}
          defaultChecked
          label="Ski"
        />
        <Checkbox
          onCheck={handletoggleSnowboardCategory}
          label="SnowBoard"
        />
      </div>

      <SubHeader>Rates</SubHeader>
      <div name={"Rates"}
           style={styles.block}
           className={cx("flex ml4", { 'flex-column': bp.xs })}
      >
        <FlatButton
          onClick={handlerate}
          primary
          id="star1"
          hoverColor="#ef6091"
          icon={<i
            className={`mb3 fa ${(stateInst.toggleRate1state) ? 'fa-star' : 'fa-star-o'}`}
          />}
        />
        <FlatButton
          onClick={handlerate}
          primary
          id="star2"
          hoverColor="#ef6091"
          icon={<i
            className={`mb3 fa ${(stateInst.toggleRate2state) ? 'fa-star' : 'fa-star-o'}`}
          />}
        />
        <FlatButton
          onClick={handlerate}
          id="star3"
          primary
          hoverColor="#ef6091"
          icon={<i
            className={`mb3 fa ${(stateInst.toggleRate3state) ? 'fa-star' : 'fa-star-o'}`}
          />}
        /><FlatButton
        onClick={handlerate}
        id="star4"
        primary
        hoverColor="#ef6091"
        icon={<i
          className={`mb3 fa ${(stateInst.toggleRate4state) ? 'fa-star' : 'fa-star-o'}`}
        />}
      />
      </div>


      <div className={"ml4 col-6"}>
        <SubHeader>Minimum Price: </SubHeader>
        <div className={"col-12"}>
          <Slider
            min={stateInst.PriceStartMin}
            max={stateInst.PriceStartMax}
            value={stateInst.PriceMin || stateInst.PriceStartMin}
            onChange={handletogglePriceMin}
            className={"pt1 col-6 left"}
          />
          <TextField
            name={"PriceMin"}
            value={stateInst.PriceMin || stateInst.PriceStartMin}
            className={"ml4 col-6"}
            style={{ width: 100 }}
          />
        </div>
      </div>

      <div className={"ml4 col-6"}>
        <SubHeader>Maximum Price: </SubHeader>
        <div className={"col-12"}>
          <Slider
            min={stateInst.PriceStartMin}
            max={stateInst.PriceStartMax}
            value={stateInst.PriceMax || stateInst.PriceStartMax}
            onChange={handletogglePriceMax}
            className={"pt1 col-6 left"}
          />
          <TextField
            name={"PriceMax"}
            value={stateInst.PriceMax || stateInst.PriceStartMax}
            className={"ml4 col-6"}
            style={{ width: 100 }}
          />
        </div>
      </div>
      <ul className="list-reset mt3">
        {listcomponent.map(function (listValue, k) {
          return <li className="sm-col sm-col-6 md-col-4 lg-col-3 p1" key={k}>{listValue}</li>;

        })}
      </ul>
    </div>
  );
});

Display_card.propTypes = {
  passusers: PropTypes.array.isRequired,
};

const Display_cards = observer(['appstate'])(Display_card);


export { Display_cards };
