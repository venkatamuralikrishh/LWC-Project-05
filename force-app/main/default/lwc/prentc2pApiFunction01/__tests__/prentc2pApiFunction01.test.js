import { createElement } from 'lwc';
import Prentc2pApiFunction01 from 'c/prentc2pApiFunction01';

describe('c-prentc2-p-api-function01', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-prentc2-p-api-function01', {
            is: Prentc2pApiFunction01
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});