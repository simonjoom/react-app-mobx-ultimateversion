import { PropTypes } from 'react';
import Header from './Header';
import s from './Layout.css';
import Divider from 'material-ui/Divider';
import Debug from './Debug';

function Layout(props) {
  let myprops=Object.assign({}, props);
  delete myprops.comp;
  delete myprops.subtitle;
  delete myprops.title;
  delete myprops.bp;

  return (
    <div className={s.root}>
      <Header title={props.title} comp={props.comp} subtitle={props.subtitle} bp={props.bp}/>
      <Divider />
      <main className={s.content}>
        <div {...myprops} className={`${s.content}${props.className ? ` ${props.className}` : ''}`} />
      </main>
      <Debug />
    </div>
  );
}
Layout.propTypes = {className: PropTypes.string,
title: PropTypes.string.isRequired,
subtitle: PropTypes.string.isRequired,
comp: React.PropTypes.string.isRequired,
bp: PropTypes.object.isRequired};


export default Layout;
