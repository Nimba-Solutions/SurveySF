import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SearchSelector extends LightningElement {
    @api name;
    @api label = 'Search';
    @api options = [];
    @api value;
    @api required = false;
    @api disabled = false;
    @api showLabel = false;
    @api placeholder = 'Search...';
    @api variant = 'label-hidden';

    @track filteredOptions = [];
    @track error;
    @track isLoading = false;
    @track searchValue = '';
    @track showDropdown = false;

    connectedCallback() {
        console.log('SearchSelector connectedCallback');
        console.log('options:', JSON.stringify(this.options));
        console.log('value:', this.value);
        
        this.filteredOptions = [...this.options];
        
        if (this.value) {
            // Find the option label for the initial value
            const option = this.options.find(o => o.value === this.value);
            if (option) {
                this.searchValue = option.label;
            }
        }
    }

    renderedCallback() {
        console.log('SearchSelector renderedCallback');
        console.log('filteredOptions:', JSON.stringify(this.filteredOptions));
        console.log('searchValue:', this.searchValue);
    }

    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        this.searchValue = event.target.value;
        
        if (searchTerm) {
            this.filteredOptions = this.options.filter(option => 
                option.label.toLowerCase().includes(searchTerm)
            );
        } else {
            this.filteredOptions = [...this.options];
        }
        this.showDropdown = true;
    }

    showOptions() {
        this.showDropdown = true;
        this.filteredOptions = [...this.options];
    }

    handleOptionSelect(event) {
        const selectedValue = event.currentTarget.dataset.value;
        
        // Find the selected option object
        const selectedOption = this.options.find(o => o.value === selectedValue);
        
        // Update search value to show selected option
        this.searchValue = selectedOption.label;
        
        // Hide dropdown
        this.showDropdown = false;
        
        // Dispatch change event with option details
        const detail = {
            value: selectedValue,
            option: selectedOption
        };
        console.log('Dispatching change event:', JSON.stringify(detail));
        this.dispatchEvent(new CustomEvent('change', { detail }));
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant
        }));
    }

    @api
    validate() {
        if (this.required && !this.value) {
            return {
                isValid: false,
                errorMessage: 'Please select an option'
            };
        }
        return { isValid: true };
    }

    @api
    reset() {
        this.value = null;
        this.searchValue = '';
        this.error = null;
        this.showDropdown = false;
    }
} 