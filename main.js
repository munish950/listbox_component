class MultiInputBox extends HTMLElement {
    constructor() {
        super();
    }

    static observedAttributes = ['value'];

    // Create wrapper
    wrapper = document.createElement("div");

    connectedCallback() {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });
        
        this.wrapper.setAttribute('class', 'wrapper');

        const textboxContainer = this.createTextBoxContainer();
        textboxContainer.getAttribute
        this.wrapper.appendChild(textboxContainer);

        // Attach the created elements to the shadow dom
        shadow.appendChild(this.wrapper);
    }

    addNewTextBox(event, wrapper) {
        const textboxContainer = this.createTextBoxContainer();
        wrapper.appendChild(textboxContainer);
    }

    createTextBoxContainer() {
        const container = document.createElement("div");

        const textBox = document.createElement("input");
        textBox.setAttribute('class', 'input_element');

        // Add button
        const addButton = document.createElement("button");
        addButton.setAttribute('class', 'add_input');
        addButton.setAttribute('type', 'button');
        addButton.addEventListener('click', (event) => this.addNewTextBox(event, this.wrapper));
        addButton.innerText = '+';

        // Remove button
        const removeButton = document.createElement("button");
        removeButton.setAttribute('class', 'remove_input');
        removeButton.setAttribute('type', 'button');
        removeButton.addEventListener('click', (event) => this.removeTextBox(container, this.wrapper));
        removeButton.innerText = '-';

        container.setAttribute('class', 'container');
        container.appendChild(textBox);
        container.appendChild(addButton);
        container.appendChild(removeButton);

        return container;
    }

    removeTextBox(container, wrapper) {
        wrapper.removeChild(container);
    }

    disconnectedCallback() {
        console.log("disconnectedCallback");
    }

    adoptedCallback() {
        console.log("adoptedCallback");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('attributeChangedCallback', name);
        console.log("oldValue", oldValue, 'newValue', newValue);

    }
}

customElements.define('multi-inputbox', MultiInputBox);