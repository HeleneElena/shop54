export default function toggleCheckbox() {
    const checkboxs = document.querySelectorAll('#discount-checkbox');

    checkboxs.forEach(el => {
        el.addEventListener('change', function() {
            if (this.checked) {
                this.nextElementSibling.classList.add('checked');
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
            });
    });
}