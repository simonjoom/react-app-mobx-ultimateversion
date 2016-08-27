import { PropTypes } from 'react';
import Layout from '../../components/Layout';
import Skiscool from '../../components/Skiscool';
import s from './Skiscool.css';
import cx from 'classnames';
import Divider from 'material-ui/Divider';
import { observer } from "mobx-react";
const title = 'SkiScool';

const getArticles = (articles) => {
return (
<ul>
{articles.map((article, i) =>
            <li key={i}><a href={article.url}>{article.title}</a> by {article.author}</li>
          )}
           </ul>
           )
}

@observer(['appstate'])
class HomePage extends React.Component {
static contextTypes = {
setTitle: React.PropTypes.func.isRequired
}
  static propTypes = {
    articles: PropTypes.array,
    appstate: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired
  };

  render() {
      const appstate = this.props.appstate;
      const lang = this.props.lang;
  this.context.setTitle(title)
  const bp = appstate.ui.breakpoints;
    return (
      <Layout className={s.content}>
       <div className="center">
            <h1 className={cx(s.title, {
              [s.xsTitle]: bp.xs,
              [s.suTitle]: bp.su,
            })} >Skiscool Concept</h1>
            <h2 className={cx(s.subTitle, {
              [s.xsSubTitle]: bp.xs,
              [s.suSubTitle]: bp.su,
            })}
            > SkiScool find your intructors
            </h2>
       </div>
       <Divider />
        <Skiscool appstate={appstate} lang={lang}/>


        <h2>Recent Articles</h2>
        <If condition={this.props.articles}>
         <getArticles articles={this.props.articles}/>
        </If>
      </Layout>
    );
  }

}

export default HomePage;
