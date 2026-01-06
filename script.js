/* ===============================
   DESIGN PAGE – FORM SUCCESS HANDLER
=============================== */
document.addEventListener('DOMContentLoaded', () => {

    const designForm = document.querySelector('.design-page form');
    const successMsg = document.querySelector('.design-success');

    if (!designForm || !successMsg) return;

    designForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(designForm);

        try {
            const response = await fetch(designForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                designForm.reset();
                successMsg.style.display = 'block';
            }
        } catch (err) {
            // silent fail (no UX break)
            console.error('Form submission failed', err);
        }
    });

});
