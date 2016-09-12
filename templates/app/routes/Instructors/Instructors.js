import { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Display_cards } from '../../components/Card/ListCard';
import dispatch from '~/temp/core/dispatch';
/*let CardInstructor;
 require.ensure(['../../components/Card'], (require) => {
 CardInstructor=require('../../components/Card').default;
 }, "card");*/

function randomFromInterval(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

let usertmp;
let nbusers = 20;
let typeconnexion = 'instagram';
let listtypeconnexion = ['facebook', 'google', 'instagram'];
let listcategory = ['ski', 'snowboard', 'ski,snowboard'];
let listnameusers = ['simon', 'paul', 'jeremie', 'patrice', 'christelle', 'jacques', 'rebecca', 'pauline', 'martine', 'samuel', 'matthieu'];
let listsecnameusers = ['gendrin', 'robert', 'fzeufhze', ' holder', 'eerzr', 'jacqueazes', 'shauff', 'jacques', 'adazd', 'dupond', 'dupont'];
let othername;

let listsecusersclone = listsecnameusers.slice(0);
let listnameusersclone = listnameusers.slice(0);


@observer(['appstate'])
class Instructors extends Component {
  static propTypes = {
    appstate: PropTypes.object.isRequired,
    lang: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  };
  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
    setMeta: PropTypes.func
  };

  goBack = event => {
    event.preventDefault();
    history.goBack();
  };

  constructor(props) {
    super(props);
    this.listcomponent = [];
    this.state = {
      filtercomponent: undefined,
      googleCards: undefined
    };
  }

  componentWillMount() {
    const { user } = this.props.appstate.auth;
    while (nbusers--) {
      usertmp = Object.assign({}, user);
      usertmp.gender = ((randomFromInterval(0, 1) == 0) ? 'male' : 'female');
      usertmp.calendar = ((randomFromInterval(0, 1) == 0));
      usertmp.usertype = ((randomFromInterval(0, 1) == 0) ? 'client' : 'instructor');

      if (!listnameusers.length)
        listnameusers = listnameusersclone.slice(0);
      usertmp.username = usertmp.name = listnameusers.pop();

      if (!listsecnameusers.length)
        listsecnameusers = listsecusersclone.slice(0);

      othername = listsecnameusers.pop();

      usertmp.facebookId = usertmp.instagramId = usertmp.googleId = '';
      typeconnexion = listtypeconnexion[(randomFromInterval(0, 2))];
      if ((typeconnexion) == 'google') {
        usertmp.google = {};
        delete usertmp['facebook'];
        delete usertmp['instagram'];
        usertmp.googleId = randomFromInterval(0, 18554684);
        usertmp.google.first_name = usertmp.username;
        usertmp.google.last_name = othername;
      } else if ((typeconnexion) == 'instagram') {
        usertmp.instagram = {};
        delete usertmp['facebook'];
        delete usertmp['google'];
        usertmp.instagramId = randomFromInterval(0, 18554684);
        usertmp.instagram.first_name = usertmp.username;
        usertmp.instagram.last_name = othername;
      } else {
        usertmp.facebook = {};
        delete usertmp['google'];
        delete usertmp['instagram'];
        usertmp.facebookId = randomFromInterval(0, 18554684);
        usertmp.facebook.first_name = usertmp.username;
        usertmp.facebook.last_name = othername;
      }

      if (usertmp.usertype !== 'client') {
        usertmp.price = randomFromInterval(300, 500);
        usertmp.rate = randomFromInterval(1, 4);
      }

      usertmp.category = listcategory[(randomFromInterval(0, 2))];
      usertmp.email = usertmp.username + "@skiscool.com";

      this.props.appstate.instructor.adduser(usertmp);
    }

    dispatch('instructor.get');
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { appstate, description, title } = this.props;

    this.context.setTitle(title);
    this.context.setMeta('description', description);
    const { user } = appstate.auth;


    /* Fetch Promise on result insert in cards and display */
    /*if ((!this.state.googleCards)){
     let pict_url;
     let arraypromisegoogle=[];
     let keyspromisegoogle=[];

     user2.googleId='104140211971665971268'; //test
     arraypromisegoogle.push(
     fetch('http://picasaweb.google.com/data/entry/api/user/'+user2.googleId+'?alt=json',{credentials:'cors'}).then(a=>a.json()))
     keyspromisegoogle.push(user2);

     client.googleId='104140211971665971268'; //test
     arraypromisegoogle.push(
     fetch('http://picasaweb.google.com/data/entry/api/user/'+client.googleId+'?alt=json',{credentials:'cors'}).then(a=>a.json()))
     keyspromisegoogle.push(client);

     //end loop on users

     if (arraypromisegoogle){
     Promise.all(arraypromisegoogle).then(([...data])=> {
     this.listcomponent.push(...keyspromisegoogle.reduce((result, key, i) =>
     ([ ...result,<CardInstructor people={ key } pict_url = { data[i].entry.gphoto$thumbnail.$t } displaycalendar={true}/> ]), []));
     this.setState({googleCards: [...this.listcomponent]}); //rerender
     });
     }

     this.listcomponent.push(<CardInstructor people={ user } displaycalendar={false}/>);
     this.listcomponent.push(<CardInstructor people={ user } displaycalendar={true}/>);
     }



     //push the rest in this.listcomponent

     if (user.uuid)
     return (<Display_cards children={this.state.googleCards||this.listcomponent} /> );
     else
     return ( <div> You re not connected </div>);
     */
    if (user.uuid)
      return (<Display_cards passusers={appstate.instructor.users() || this.listcomponent}/> );
    else
      return ( <div> You re not connected </div>);

  }
}


// Register.PropTypes = { appstate: React.PropTypes.object.isRequired, };
// Register.contextTypes = { setTitle: PropTypes.func.isRequired, };

export default Instructors;
