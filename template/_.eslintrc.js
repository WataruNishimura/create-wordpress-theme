// eslint-disable-file no-use-before-define 
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    <%_ if(prettier) { _%>
    'plugin:prettier/recommended',
    <%_ } _%>
  ],
  rules: {
    
  }
};
