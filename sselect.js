window.onload = function () {
  new SASelect();
}

class SASelect {
  constructor() {
    this.buildComponents();
    this.wrapSelects();
  }

  buildComponents() {
    const modalOverlay = document.createElement('div');
    modalOverlay.className += 'sa-select-modal-overlay sa-select-modal-closed';
    document.body.appendChild(modalOverlay);

    const modal = document.createElement('div');
    modal.className += 'sa-select-modal sa-select-modal-closed';
    document.body.appendChild(modal);

    const closeButton = document.createElement('button');
    closeButton.innerText = 'X';
    closeButton.className = 'sa-select-close-button';
    modal.appendChild(closeButton);

    const modalContent = document.createElement('div');
    modalContent.className = 'sa-select-modal-content';
    modal.appendChild(modalContent);

    const dataInput = document.createElement('input');
    dataInput.setAttribute('list', 'sa-select-datalist');
    dataInput.className = 'sa-select-input';
    modalContent.appendChild(dataInput);

    const datalist = document.createElement('datalist');
    datalist.id = 'sa-select-datalist';
    modalContent.appendChild(datalist);

    // Events
    modalOverlay.addEventListener('click', () => this.closeModal());
    closeButton.addEventListener('click', () => this.closeModal());
    dataInput.addEventListener('change', (event) => this.itemSelected(event.target.value));

    // Field declarations
    this.modalOverlay = modalOverlay;
    this.modal = modal;
    this.dataInput = dataInput;
    this.datalist = datalist;
  }

  wrapSelects() {
    document.querySelectorAll('select').forEach((select) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'sa-select-wrapper';
      wrapper.addEventListener('click', (event) => this.showModal(event));

      select.parentNode.insertBefore(wrapper, select);
      wrapper.appendChild(select);
    });
  }

  showModal(event) {
    if (event.target.offsetLeft === 0) {
      this.dataInput.value = '';
      this.datalist.innerHTML = '';

      const select = event.target.querySelector('select');
      Object.values(select.options).forEach((selectOption) => {
        const option = document.createElement('option');
        option.value = selectOption.text;
        option.setAttribute('name', selectOption.text);
        option.setAttribute('data-sa-select-value', selectOption.value);
        this.datalist.appendChild(option);
      });

      this.modal.classList.remove('sa-select-modal-closed');
      this.modalOverlay.classList.remove('sa-select-modal-closed');
      this.dataInput.focus();
      this.currentSelect = select;
    }
  }

  closeModal() {
    this.modal.classList.add('sa-select-modal-closed');
    this.modalOverlay.classList.add('sa-select-modal-closed');
  }

  itemSelected(value) {
    const option = this.datalist.options.namedItem(value);

    if (option !== null) {
      this.currentSelect.value = option.getAttribute('data-sa-select-value');
      this.closeModal();
    }
  }
}
