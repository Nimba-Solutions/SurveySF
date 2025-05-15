import { LightningElement, api } from 'lwc';

export default class Modal extends LightningElement {
    @api showModal = false;
    @api size = 'medium'; // small, medium, large
    
    @api
    open() {
        this.showModal = true;
    }
    
    @api
    close() {
        this.showModal = false;
    }
    
    closeModal() {
        this.showModal = false;
        this.dispatchEvent(new CustomEvent('close'));
    }
    
    handleSave() {
        this.dispatchEvent(new CustomEvent('save'));
        // Don't close the modal here - let the parent component decide when to close
    }
}