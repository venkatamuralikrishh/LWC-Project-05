import { createElement } from 'lwc';
import Lwc_1008_displayNotifications_modals_Popups from 'c/lwc_1008_displayNotifications_modals_Popups';

describe('c-lwc-1008-display-notifications-modals-popups', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-lwc-1008-display-notifications-modals-popups', {
            is: Lwc_1008_displayNotifications_modals_Popups
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});