/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Pilots } from './pilots.js';

if (Meteor.isServer) {
  describe('Pilots', () => {
    describe('methods', () => {
      const userId = Random.id();
      let pilotId;

      beforeEach(() => {
        Pilots.remove({});
        pilotId = Pilots.insert({
          text: 'test pilot',
          createdAt: new Date(),
          owner: userId,
          username: 'tmeasday',
        });
      });

      it('can delete owned pilot', () => {
        // Find the internal implementation of the pilot method so we can
        // test it in isolation
        const deletePilot = Meteor.server.method_handlers['pilots.remove'];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        // Run the method with `this` set to the fake invocation
        deletePilot.apply(invocation, [pilotId]);

        // Verify that the method does what we expected
        assert.equal(Pilots.find().count(), 0);
      });
    });
  });
}
