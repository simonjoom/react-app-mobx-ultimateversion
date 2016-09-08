import s from './MySite.css';
import Link from '../Linkmaterial';

const dic = window.dico;

const MySite = ({ bp, lang }) => {
console.log(lang)
  const T_1 = dic.title_1;
  const IT_1 = dic.item_1;
  const IT_1_C = dic.item_1_c;

  const T_2 = dic.title_2;
  const IT_2 = dic.item_2;
  const IT_2_C = dic.item_2_c;

  const T_3 = dic.title_3;
  const IT_3 = dic.item_3;
  const IT_3_C = dic.item_3_c;

  const T_4 = dic.title_4;
  const IT_4 = dic.item_4;
  const IT_4_C = dic.item_4_c;

  const T_5 = dic.title_5;
  const IT_5 = dic.item_5;
  const IT_5_C = dic.item_5_c;

  console.log(bp);
  return (
    <div className={s.features}>
      <div className="clearfix border">
        <div className="left p2 mr1 border">Image</div>
        <div className="xs-col-12 sm-col-6 mx-auto">

          <Link
            className="border detailsbu"
            to="/"
            onClick={(e) => {
              e.preventDefault();
            }}
            width="100%"
            hoverColor="#aa062F"
            backgroundColor="#6FAFE9"
            data-content={IT_1_C}
            title={T_1}
            icon={
              <i className="mb3 fa fa-question-circle-o" />
            }
          >
            <div dangerouslySetInnerHTML={{ __html: IT_1 }} />
          </Link>
          <Link
            className="border detailsbu"
            to="/"
            onClick={(e) => {
              e.preventDefault();
            }}
            width="100%"
            hoverColor="#aa062F"
            backgroundColor="#6FBFE9"
            data-content={IT_2_C}
            title={T_2}
            icon={
              <i className="mb3 fa fa-question-circle-o" />
            }
          >
            <div dangerouslySetInnerHTML={{ __html: IT_2 }} />
          </Link>
          <Link
            className="border detailsbu"
            to="/"
            onClick={(e) => {
              e.preventDefault();
            }}
            width="100%"
            hoverColor="#aa062F"
            backgroundColor="#6FDFE9"
            data-content={IT_3_C}
            title={T_3}
            icon={
              <i className="mb3 fa fa-question-circle-o" />
            }
          >
            <div dangerouslySetInnerHTML={{ __html: IT_3 }} />
          </Link>
          <Link
            className="border detailsbu"
            to="/"
            onClick={(e) => {
              e.preventDefault();
            }}
            width="100%"
            hoverColor="#aa062F"
            backgroundColor="#6FEFE9"
            data-content={IT_4_C}
            title={T_4}
            icon={
              <i className="mb3 fa fa-question-circle-o" />
            }
          >
            <div dangerouslySetInnerHTML={{ __html: IT_4 }} />
          </Link>
          <Link
            className="border detailsbu"
            to="/"
            onClick={(e) => {
              e.preventDefault();
            }}
            width="100%"
            hoverColor="#aa062F"
            backgroundColor="#6FFFE9"
            data-content={IT_5_C}
            title={T_5}
            icon={
              <i className="mb3 fa fa-question-circle-o" />
            }
          >
            <div dangerouslySetInnerHTML={{ __html: IT_5 }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

MySite.propTypes = { bp: React.PropTypes.object, lang: React.PropTypes.string.isRequired };

export default MySite;

