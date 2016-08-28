import { PropTypes } from 'react';
import Layout from '../../components/Layout';
import Skiscool from '../../components/Skiscool';
import s from './Skiscool.css';
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
componentDidMount() {
window._q.whenDone(function() {
    // $ AND bootstrap are ready
    let $=jQuery;// eslint-disable-line jsx-control-statements/jsx-jcs-no-undef

    let managetips=function(){
  //  $('[data-toggle="tooltip"]').tooltip();
    if ($(".detailsbu")){
    $(".detailsb").popover({ trigger: "hover" });
		$(".detailsbu").popover({trigger: 'manual',"animation": true,"html": true,placement: function(pop){
							if(window.innerWidth<=1050){
								$(pop).css('position','relative');
								return 'bottom';
							}else{
								$(pop).css('position','absolute');
								return 'right';
							}
						}
						});
						var sddul=$(".detailsbu").closest("div");

						sddul.delegate("a.detailsbu", "click mousedown", function() {
						if(!$(this).hasClass("active")){
							sddul.find(".active").removeClass("active").popover("hide");
							$(this).addClass("active");
$(this).find('.mb3').removeClass("fa-question-circle-o").addClass("fa-question-circle");
							$(this).popover("show").delay(10);
							}
						}).delegate("a.detailsbu","mouseleave", function(){
							$(this).popover("hide");
						}).delegate("a.detailsbu","mouseenter", function(){
							if($(this).hasClass("active"))
							$(this).popover("show");
						});

					$(".detailsb").popover({"animation": true,"html": false,"trigger":"manual",placement: function(pop){
							if($(window).width()<=400){
								$(pop).css('position','relative');
								return 'top';
							}else{
								return 'right';
							}
						}
					}).mouseenter(function(e) {
						if(!$(this).hasClass("showpop")||$(this).hasClass("hidepop"))
						{
							$(this).removeClass("hidepop").addClass("showpop");
							$(this).popover('show');
							$(this).css('color', '#985DCC');

						} else{
							$(this).removeClass("showpop").addClass("hidepop");
							$(this).popover('hide'); $(this).css('color', '#08c');
						}
						e.preventDefault();
					}).mouseout(function() {
						$(this).removeClass("showpop").addClass("hidepop");
						$(this).popover('hide'); $(this).css('color', '#08c');

					}).hover(function(){	$(this).css('cursor', 'pointer')},
					function(){ $(this).css('cursor', 'auto')}
					);
		}
}

$(document).ready(managetips);
});
 }


  render() {
      const appstate = this.props.appstate;
      const lang = this.props.lang;
  this.context.setTitle(title)
  const bp = appstate.ui.breakpoints;
    return (
      <Layout className={s.content} bp={bp} comp={"Skiscool"} title={"Skiscool Concept"} subtitle={"SkiScool find your intructors"}>
        <Skiscool bp={bp} lang={lang}/>


        <h2>Recent Articles</h2>
        <If condition={this.props.articles}>
         <getArticles articles={this.props.articles}/>
        </If>
      </Layout>
    );
  }

}

export default HomePage;
