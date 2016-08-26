import { PropTypes } from 'react';
import Layout from '../../components/Layout';
import s from './Home.css';

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

class HomePage extends React.Component {
static contextTypes = {
setTitle: React.PropTypes.func.isRequired
}
  static propTypes = {
    articles: PropTypes.array,
  };

  render() {
  this.context.setTitle(title)
    return (
      <Layout className={s.content}>
        <h1>Welcome!</h1>
        <p>
           SkiScool find your intructors
        </p>
        <p>
          Our map :
        </p>
        <h2>Recent Articles</h2>
        <If condition={this.props.articles}>
         <getArticles articles={this.props.articles}/>
        </If>
      </Layout>
    );
  }

}

export default HomePage;
