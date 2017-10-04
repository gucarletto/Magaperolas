import angular from 'angular';
import angularMeteor from 'angular-meteor';
import perolasList from '../imports/components/perolasList/perolasList';
import '../imports/startup/accounts-config.js';

angular.module('magaperolas', [
  angularMeteor,
  perolasList.name,
  'accounts.ui'
]);

function onReady() {
  angular.bootstrap(document, ['magaperolas']);
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
