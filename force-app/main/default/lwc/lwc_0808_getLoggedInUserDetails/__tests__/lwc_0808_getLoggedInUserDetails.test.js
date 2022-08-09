import { createElement } from 'lwc';
import Lwc_0808_getLoggedInUserDetails from 'c/lwc_0808_getLoggedInUserDetails';

describe('c-lwc-0808-get-logged-in-user-details', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-lwc-0808-get-logged-in-user-details', {
            is: Lwc_0808_getLoggedInUserDetails
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});