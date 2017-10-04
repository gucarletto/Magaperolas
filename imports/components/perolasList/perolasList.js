import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Perolas } from '../../api/perolas.js';

import template from './perolasList.html';

class PerolasListCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.subscribe('perolas');

    this.helpers({
      perolas() {
        // Pérolas mais novas no topo
        return Perolas.find({}, {
          sort: {
            dataCriacao: -1
          }
        });
      },
      currentUser() {
        return Meteor.user();
      }
    })
  }

  addPerola(texto, autor, contexto) {
    // Inserção de pérola na coleção
    Meteor.call('perolas.insert', texto, autor, contexto);

    // Limpa o form de inserção
    this.texto = '';
    this.autor = '';
    this.contexto = '';
  }

  removePerola(perola) {
    Meteor.call('perolas.remove', perola._id);
  }
}

export default angular.module('perolasList', [
  angularMeteor
])
  .component('perolasList', {
    templateUrl: 'imports/components/perolasList/perolasList.html',
    controller: ['$scope', PerolasListCtrl]
  });
