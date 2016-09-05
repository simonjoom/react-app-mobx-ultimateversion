import { PropTypes } from 'react';
import { analytics } from '../configauth';
import jsonStringifySafe from 'json-stringify-safe';

function Html({ lang, title, description, style, script, scriptvendor, children, store }) {

  let styleout = style.join("");
  return (
    <html lang={lang}>
    <head>
      <meta charSet="utf-8"/>
      <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="apple-touch-icon" href="apple-touch-icon.png"/>
      <script src="/assets/nodent.min.js"/>
      <script src="/assets/regenerator.min.js"/>
      <script src="/assets/ajv.min.js"/>
      <style type="text/css" id="css" dangerouslySetInnerHTML={{ __html: styleout }}/>
      {scriptvendor && (
        <script src={scriptvendor}/>
      )}
    </head>
    <body>
    <div id="root" dangerouslySetInnerHTML={{ __html: children }}/>
    {script && (
      <script
        id="source"
        src={script}
        data-initial-state={jsonStringifySafe(store)}
      />
    )}
    {analytics.google.trackingId &&
    <script
      dangerouslySetInnerHTML={{
        __html: 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
        `ga('create','${analytics.google.trackingId}','auto');ga('send','pageview')`
      }}
    />
    }
    {analytics.google.trackingId &&
    <script src="https://www.google-analytics.com/analytics.js" async defer/>
    }
    </body>
    </html>
  );
}

Html.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  script: PropTypes.string,
  children: PropTypes.string,
  store: PropTypes.object.isRequired,
};

export default Html;
