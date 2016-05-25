Template.RecipeSingle.onCreated(function() {
  let self = this;
  self.autorun(function(){
    let id = FlowRouter.getParam('id');
    self.subscribe('singleRecipe', id);
  });
});

Template.RecipeSingle.helpers({
  recipe: ()=> {
    let id = FlowRouter.getParam('id');
    return Recipes.findOne({_id: id});
  }
});
