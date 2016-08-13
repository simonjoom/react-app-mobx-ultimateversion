import authentication from 'feathers-authentication';

//import { Strategy as GithubStrategy } from 'passport-github';
//import GithubTokenStrategy from 'passport-github-token';

const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const InstagramStrategy = require('passport-instagram').Strategy;
const InstagramTokenStrategy = require('passport-instagram-token');

//const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const GoogleTokenStrategy = require('passport-google-token').Strategy;
export default function () {
  const app = this;

  var token = authentication.TokenService;
  var local = authentication.LocalService;


  /*config.facebook.strategy = FacebookStrategy;
  config.facebook.tokenStrategy = FacebookTokenStrategy;
  config.instagram.strategy = InstagramStrategy;
  config.instagram.tokenStrategy = InstagramTokenStrategy;*/
  //config.google.strategy = GoogleStrategy;
  //config.google.tokenStrategy = GoogleTokenStrategy;

  app.configure(authentication({cookies: {enable:true}})).configure(token()).configure(local())
}

