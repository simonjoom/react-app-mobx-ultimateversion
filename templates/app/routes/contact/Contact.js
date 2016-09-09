import { PropTypes } from 'react';

const Contact = (props, context) => {
// eslint-disable-next-line no-unused-vars
  const { lang, description, title,html} = props;

  if (description) {
    context.setMeta('description', description);
  }
  if (title) {
    context.setTitle(title);
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );

};

Contact.contextTypes = {
  setTitle: PropTypes.func.isRequired,
  setMeta: PropTypes.func,
};

Contact.propTypes = {
  lang: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Contact;
