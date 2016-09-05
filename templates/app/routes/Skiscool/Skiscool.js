import { PropTypes, Component } from 'react';
import { observer } from 'mobx-react';
import Layout from '../../components/Layout';
import Skiscool from '../../components/Skiscool';
import styles from './Skiscool.css';

const ShowArticles = (articles) => (
  <ul>
    {articles.map((article, i) =>
      <li key={i}>
        <a href={article.url}>{article.title}</a> by {article.author}
      </li>
    )}
  </ul>
);

@observer(['appstate'])
class HomePage extends Component {
  static contextTypes = {
    setTitle: React.PropTypes.func.isRequired,
    setMeta: React.PropTypes.func.isRequired,
  };
  static propTypes = {
    articles: PropTypes.array,
    appstate: PropTypes.object.isRequired,
    lang: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  };

  componentDidMount() {
    window._q.whenDone(() => {
      // $ AND bootstrap are ready
      const $ = jQuery; // eslint-disable-line no-undef jsx-control-statements/jsx-jcs-no-undef
      const managetips = function () {
        //  $('[data-toggle="tooltip"]').tooltip();
        const detailSBU = $('.detailsbu');
        const detailSB = $('.detailsb');
        if (detailSBU) {
          detailSB.popover({ trigger: 'hover' });
          detailSBU.popover({
            trigger: 'manual',
            animation: true,
            html: true,
            placement: (pop) => {
              if (window.innerWidth <= 1050) {
                $(pop).css('position', 'relative');
                return 'bottom';
              }
              $(pop).css('position', 'absolute');
              return 'right';
            },
          });
          const sddul = detailSBU.closest('div');
          sddul.delegate('a.detailsbu',
            'click mousedown',
            function () {
              if (!$(this).hasClass('active')) {
                sddul.find('.active').removeClass('active').popover('hide');
                $(this).addClass('active');
                $(this).find('.mb3').removeClass('fa-question-circle-o')
                .addClass('fa-question-circle');
                $(this).popover('show').delay(10);
              } }
          ).delegate('a.detailsbu',
            'mouseleave',
            function () {
              $(this).popover('hide');
            }).delegate('a.detailsbu',
            'mouseenter',
            function () {
              if ($(this).hasClass('active')) {
                $(this).popover('show');
              }
            });
          detailSB.popover({
            animation: true,
            html: false,
            trigger: 'manual',
            placement: (pop) => {
              if ($(window).width() <= 400) {
                $(pop).css('position', 'relative');
                return 'top';
              }
              return 'right';
            },
          }).mouseenter(function (e) {
            if (!$(this).hasClass('showpop') || $(this).hasClass('hidepop')) {
              $(this).removeClass('hidepop').addClass('showpop');
              $(this).popover('show');
              $(this).css('color', '#985DCC');
            } else {
              $(this).removeClass('showpop').addClass('hidepop');
              $(this).popover('hide');
              $(this).css('color', '#08c');
            }
            e.preventDefault();
          }).mouseout(function () {
            $(this).removeClass('showpop').addClass('hidepop');
            $(this).popover('hide');
            $(this).css('color', '#08c');
          }).hover(function () {
            $(this).css('cursor', 'pointer');
          },
            function () {
              $(this).css('cursor', 'auto');
            }
          );
        }
      };
      $(document).ready(managetips);
    });
  }

  render() {
    console.log(this.props);
    // eslint-disable-next-line no-unused-vars
    const { appstate, lang, articles, description, title } = this.props;
    this.context.setTitle(title);
    this.context.setMeta('description', description);

    const bp = appstate.ui.breakpoints;
    return (
      <Layout
        className={styles.content}
        bp={bp}
        comp="Skiscool"
        title="Skiscool Concept"
        subtitle="SkiScool find your intructors"
      >
        <Skiscool
          bp={bp}
          lang={lang}
        />
        <h2>Recent Articles</h2>
        <If condition={articles}>
          <ShowArticles articles={articles} />
        </If>
      </Layout>
    );
  }
}

export default HomePage;
