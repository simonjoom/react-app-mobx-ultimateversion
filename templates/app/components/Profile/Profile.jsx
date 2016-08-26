//import s from './Profile.css';
import Paper from 'material-ui/Paper';
import {observer} from "mobx-react"
import Divider from 'material-ui/Divider';

import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
const style = { marginLeft: 0 };

const Profile = observer(({user}) => {
console.log(this)
console.log(user)
let avatar="https://graph.facebook.com/"+(user.id)+"/picture?type=large";
  return (
<Card>
    <CardHeader
      title="Avatar"
      subtitle="Skiscool"
      size={128}
      avatar={avatar}
    />
  <Paper zDepth={1}  style={{ width: 'auto', margin: 10 }} className="fa fa-facebook">

    <CardTitle title="Facebook" subtitle="Facebook subtitle" />
    <CardText>
          <p> Here your info</p>
          <div className="clearfix border">
            <div className="sm-col sm-col-9">
              <div style={style}>
              <strong>id: </strong>{user.id}<br/>
              </div >
              <Divider />
              <div style={style}>
               <strong>first_name: </strong>{user.first_name}<br/>
              </div >
              <Divider />
              <div style={style} >
               <strong>name: </strong>{user.name}<br/>
              </div >
              <Divider />
              <div style={style}>
               <strong>name: </strong>{user.name}<br/>
              </div >
              <Divider />
            </div>
          </div>
      </CardText>
    </Paper>
 </Card>
    );
});

Profile.propTypes = {
    user: React.PropTypes.object
};
export default Profile;
