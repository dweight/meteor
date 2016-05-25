Recipes = new Mongo.Collection('recipes');

Recipes.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  }
});

Ingredient = new SimpleSchema({
  name: {
    type: String,
    label: 'Nazwa'
  },
  amount: {
    type: String,
    label: 'Ilość'
  }
});

RecipeSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nazwa'
  },
  desc: {
    type: String,
    label: 'Opis'
  },
  indegredients: {
    type: [Ingredient]
  },
  inMenu: {
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      type: 'hidden'
    }
  },
  author: {
    type: String,
    label: 'Autor',
    autoValue: function() {
      return this.userId
    },
    autoform: {
      type: 'hidden'
    }
  },

  createdAt: {
    type: Date,
    label: 'Utworzone:',
    autoValue: function() {
      return new Date()
    },
    autoform: {
      type: 'hidden'
    }
  }
});

Meteor.methods({
  toggleMenuItem: function(id, currentState) {
    Recipes.update(id, {
      $set: {
        inMenu: !currentState
      }
    });
  },
  deleteRecipe: function(id) {
    Recipes.remove(id);
  }
});

Recipes.attachSchema(RecipeSchema);
