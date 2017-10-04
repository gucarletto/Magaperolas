import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Perolas = new Mongo.Collection('perolas');

if (Meteor.isServer) {
  Meteor.publish('perolas', function perolasPublication() {
    return Perolas.find();
  });
}

Meteor.methods({
  'perolas.insert' (texto, autor, contexto) {
    check(texto, String);
    check(autor, String);
    check(contexto, String);

    // Validar se usuário está logado
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Perolas.insert({
      texto,
      autor,
      contexto,
      dataCriacao: new Date()
    });
  },
  'perolas.remove' (perolaId) {
    check(perolaId, String);

    const perola = Perolas.findOne(perolaId);

    Perolas.remove(perolaId);
  },
});
