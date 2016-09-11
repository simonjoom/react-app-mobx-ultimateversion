import {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';
import CardInstructor from '../../components/Card';
import { Display_cards, AddtoList} from '../../components/Card/ListCard';
/*let CardInstructor;
 require.ensure(['../../components/Card'], (require) => {
 CardInstructor=require('../../components/Card').default;
 }, "card");*/

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
    this.listcomponent=[];
    this.state = {
    googleCards: undefined
    };
    this.isdone=false;
  }

    render() {
        // eslint-disable-next-line no-unused-vars
        const {appstate, description, title} = this.props;
        const {user} = appstate.auth;
        this.context.setTitle(title);
        this.context.setMeta('description', description);
        let pict_url;let sortie;
        let arraypromisegoogle=[];
        let keyspromisegoogle=[];

        let user2 = Object.assign({}, user);
        user2.googleId = true;
        user2.facebookId = false;

        let client = Object.assign({}, user);
        client.usertype = "client";
if ((!this.state.googleCards)){
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

}
}


// Register.PropTypes = { appstate: React.PropTypes.object.isRequired, };
// Register.contextTypes = { setTitle: PropTypes.func.isRequired, };

export default Instructors;
