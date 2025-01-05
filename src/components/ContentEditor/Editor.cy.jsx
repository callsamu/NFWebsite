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
  });

  it('should support images', () => {
	  cy.mount(<Editor />);

	  cy.fixture('test.jpeg', null).
		  as('testImage').
		  then(() => {;
			  cy.get('label[for=image-input]').as('fileInput');
			  cy.get('@fileInput').selectFile('@testImage');

			  cy.get('.tiptap').find('img');

			  cy.get('.tiptap').type("{enter} hello");
			  cy.get('@fileInput').selectFile('@testImage');
		  });
  });

  it('should support link editing', () => {
	  cy.mount(<Editor />);

	  cy.get('.tiptap').as('editor');
	  cy.get('@editor').type('Access ');
	  cy.get('@editor').type('Google{selectall}');
	  cy.get("button[title='Link']").click();
	  cy.get(".link-editor").as("linkEditor").should('be.visible');
	  cy.get("@linkEditor").find("input").type("https://google.com");
	  cy.get("@linkEditor").contains("Save").click();
	  cy.get("@editor").find("a").should("have.attr", "href", "https://google.com");
  });
});
