import { createElement } from 'lwc';
import Childc2pApiFunction01 from 'c/childc2pApiFunction01';

describe('c-childc2-p-api-function01', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-childc2-p-api-function01', {
            is: Childc2pApiFunction01
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});