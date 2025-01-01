const { Editor } = require("./Editor")

function type(text) {
	cy.get('@editor').type(text);
}

describe('<Editor />', () => {
  it('should support headings, marks and lists with markdown shortcuts', () => {
	  cy.mount(<Editor />)

	  cy.get('.tiptap').as('editor');

	  type('# Heading 1{enter}');
	  cy.get('@editor').find('h1').contains('Heading 1');

	  type('## Heading 2{enter}');
	  cy.get('@editor').find('h2').contains('Heading 2');

	  type('Lorem ipsum{enter}');
	  cy.get('@editor').find('p').contains('Lorem ipsum');

	  type('- Item 1{enter}{enter}');
	  cy.get('@editor').find('ul').first().contains('Item 1');

	  type('paragraph with **bold**, _italic_ and ~~strike~~ text{enter}');
	  cy.get('@editor').find('p').find('strong').contains('bold');
	  cy.get('@editor').find('p').find('em').contains('italic');
	  cy.get('@editor').find('p').find('s').contains('strike');

	  type('1. numbered list{enter}second item{enter}{enter}');
	  cy.get('@editor').find('ol').find('li').eq(0).contains('numbered list');
	  cy.get('@editor').find('ol').find('li').eq(1).contains('second item');
  })
})