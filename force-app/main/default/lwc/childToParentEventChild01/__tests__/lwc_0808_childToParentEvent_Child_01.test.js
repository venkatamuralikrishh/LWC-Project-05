import { createElement } from 'lwc';
import Lwc_0808_childToParentEvent_Child_01 from 'c/lwc_0808_childToParentEvent_Child_01';

describe('c-lwc-0808-child-to-parent-event-child-01', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-lwc-0808-child-to-parent-event-child-01', {
            is: Lwc_0808_childToParentEvent_Child_01
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});