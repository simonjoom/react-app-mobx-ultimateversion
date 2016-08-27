import s from './Skiscool.css';
import Link from '../Linkmaterial';
var constants=require('./myconst_of_lang')

const Skiscool = ({appstate,lang}) => {
let t_1,it_1,it_1_c,t_2,it_2,it_2_c;
let t_3,it_3,it_3_c,t_4,it_4,it_4_c,t_5,it_5,it_5_c;
  console.log(appstate);

  t_1=constants.title_1[lang];
  it_1=constants.item_1[lang];
  it_1_c=constants.item_1_c[lang];

  t_2=constants.title_2[lang];
  it_2=constants.item_2[lang];
  it_2_c=constants.item_2_c[lang];

  t_3=constants.title_3[lang];
  it_3=constants.item_3[lang];
  it_3_c=constants.item_3_c[lang];

  t_4=constants.title_4[lang];
  it_4=constants.item_4[lang];
  it_4_c=constants.item_4_c[lang];


  t_5=constants.title_5[lang];
  it_5=constants.item_5[lang];
  it_5_c=constants.item_5_c[lang];

  return (
    <div className={s.features}>
<div className="clearfix border">
<div className="left p2 mr1 border">Image</div>
<div className="xs-col-12 sm-col-6 mx-auto">
  <Link className="border detailsbu" to="/" width="100%" hoverColor="#aa062F" backgroundColor="#6FAFE9" data-content={it_1_c} title={t_1} data-placement="bottom" icon={<i className="mb3 fa fa-question-circle-o" />}>
  <div dangerouslySetInnerHTML={{ __html: it_1}} /> </Link>
  <Link className="border detailsbu" to="/" width="100%" hoverColor="#aa062F" backgroundColor="#6FBFE9" data-content={it_2_c}  title={t_2} icon={<i className="mb3 fa fa-question-circle-o" />}>
<div dangerouslySetInnerHTML={{ __html: it_2}} /> </Link>

<Link className="border detailsbu" to="/" width="100%" hoverColor="#aa062F" backgroundColor="#6FDFE9" data-content={it_3_c} title={t_3} icon={<i className="mb3 fa fa-question-circle-o" />}>
<div dangerouslySetInnerHTML={{ __html: it_3}} /> </Link>

<Link className="border detailsbu" to="/" width="100%" hoverColor="#aa062F" backgroundColor="#6FEFE9" data-content={it_4_c} title={t_4} icon={<i className="mb3 fa fa-question-circle-o" />}>
<div dangerouslySetInnerHTML={{ __html: it_4}} /> </Link>

<Link className="border detailsbu" to="/" width="100%" hoverColor="#aa062F" backgroundColor="#6FFFE9" data-content={it_5_c} title={t_5} icon={<i className="mb3 fa fa-question-circle-o" />}>
<div dangerouslySetInnerHTML={{ __html: it_5}} /> </Link>

  </div>
  </div>
</div>

  );
}

Skiscool.propTypes = {appstate: React.PropTypes.object.isRequired,
                      lang: React.PropTypes.string.isRequired};

export default Skiscool;
