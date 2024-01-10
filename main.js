class MultiInputBox extends HTMLElement {
    constructor() {
        super();
    }

    static observedAttributes = ['value'];

    // Create wrapper
    wrapper = document.createElement("div");
    
    // Style element
    style = document.createElement("style");

    connectedCallback() {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });
        
        // Create a link element to import external styles
        
        this.style.textContent = this.addStyle();

        this.wrapper.setAttribute('class', 'wrapper');

        const textboxContainer = this.createTextBoxContainer();
        // Remove delete button from first input
        textboxContainer.getElementsByClassName('remove_btn')[0].remove();
        this.wrapper.appendChild(textboxContainer);

        // Attach the created elements to the shadow dom
        shadow.appendChild(this.style);
        shadow.appendChild(this.wrapper);        
    }

    addNewTextBox(event, wrapper) {
        const textboxContainer = this.createTextBoxContainer();
        // Remove Add button from last conatiner
        const divContainer = wrapper.querySelector('div.container:last-child');
        divContainer.getElementsByClassName('add_btn')[0].remove();

        wrapper.appendChild(textboxContainer);
    }

    createTextBoxContainer() {
        const container = document.createElement("div");

        const textBox = document.createElement("input");
        textBox.setAttribute('class', 'input_element spacing');

        // Add button
        const addButton = document.createElement("button");
        addButton.setAttribute('class', 'add_btn');
        addButton.setAttribute('type', 'button');
        addButton.addEventListener('click', (event) => this.addNewTextBox(event, this.wrapper));
        addButton.innerText = '+';

        // Remove button
        const removeButton = document.createElement("button");
        removeButton.setAttribute('class', 'remove_btn spacing');
        removeButton.setAttribute('type', 'button');
        removeButton.addEventListener('click', (event) => this.removeTextBox(container, this.wrapper));
        removeButton.innerText = '-';

        container.setAttribute('class', 'container');
        container.appendChild(textBox);
        container.appendChild(removeButton);
        container.appendChild(addButton);
        

        return container;
    }

    removeTextBox(container, wrapper) {
        wrapper.removeChild(container);
        
        // if add button was present on element, then append the same.
        if(container.getElementsByClassName('add_btn').length) {
            // Append add button on last element
            const divContainer = wrapper.querySelector('div.container:last-child');
            const addButton = document.createElement("button");
            addButton.setAttribute('class', 'add_btn');
            addButton.setAttribute('type', 'button');
            addButton.addEventListener('click', (event) => this.addNewTextBox(event, this.wrapper));
            addButton.innerText = '+';
            divContainer.appendChild(addButton);
        }
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

    addStyle() {
        const style = `.wrapper {
            display:flex;
            flex-direction: column;
            row-gap: 4px;
        }
        .container {
            display:flex;
            
        }
        .input_element {
            display: flex;
            flex-grow: 1;
        }
        .spacing {
            margin-right: 4px;
        }`;

        return style;
    }
}

customElements.define('multi-inputbox', MultiInputBox);