import history from '../../core/history';
import Link from '../../components/Link';
import s from './style.css';

class ErrorPage extends React.Component {
  static propTypes = {
    error: React.PropTypes.object,
    lang: React.PropTypes.string,
    title: React.PropTypes.string,
    description: React.PropTypes.string,
  };
  static contextTypes = {
    setTitle: React.PropTypes.func.isRequired,
    setMeta: React.PropTypes.func,
    muiTheme: React.PropTypes.object.isRequired,
  };
  componentDidMount() {
    document.title = this.props.error && this.props.error.status === 404 ?
      'Page Not Found' : 'Error';
  }

  goBack = event => {
    event.preventDefault();
    history.goBack();
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { lang, description, title,h1,h2} = this.props;
    this.context.setTitle(title);
    this.context.setMeta('description', description);
    // if (this.props.error) console.error(this.props.error); // eslint-disable-line no-console
    if ((this.props.error) && (process.env.NODE_ENV !== 'production')) {
      console.error(this.props.error.stack);
    }
    const [code] = this.props.error && this.props.error.status === 404 ?
      ['404', 'Page not found'] :
      ['Error', 'Oups, something went wrong'];
    return (
    <div>
        <h1 className={s.code}>{code}</h1>
        {code === '404' && <p className={s.text}>
          The page you're looking for does not exist or an another error occurred.
        </p>
        }
        <p className={s.text}>
          <a href="/" onClick={this.goBack}>Go back</a>, or head over to the&nbsp;
          <Link to="Home">home page</Link> Choose a new direction.
        </p>
      </div>
    );
  }

}

export default ErrorPage;
