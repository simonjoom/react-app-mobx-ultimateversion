import s from './Skiscool.css';
import Link from '../Linkmaterial';

const constants = require('./myconsT_of_lang');

const Skiscool = ({ bp, lang }) => {
  const T_1 = constants.title_1[lang];
  const IT_1 = constants.item_1[lang];
  const IT_1_C = constants.item_1_c[lang];

  const T_2 = constants.title_2[lang];
  const IT_2 = constants.item_2[lang];
  const IT_2_C = constants.item_2_c[lang];

  const T_3 = constants.title_3[lang];
  const IT_3 = constants.item_3[lang];
  const IT_3_C = constants.item_3_c[lang];

  const T_4 = constants.title_4[lang];
  const IT_4 = constants.item_4[lang];
  const IT_4_C = constants.item_4_c[lang];

  const T_5 = constants.title_5[lang];
  const IT_5 = constants.item_5[lang];
  const IT_5_C = constants.item_5_c[lang];

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

Skiscool.propTypes = { bp: React.PropTypes.object, lang: React.PropTypes.string.isRequired };

export default Skiscool;
