module.exports = {
  extends: [
    'stylelint-config-standard', 
    'stylelint-config-wordpress',
  <%_ if (prettier) { _%>
  'stylelint-config-prettier'
  <%_ } _%>
  ],
  rules: {}
};
