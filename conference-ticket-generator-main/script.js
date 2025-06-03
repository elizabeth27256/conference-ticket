document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const form = document.getElementById('ticketForm');
    const uploadBox = document.getElementById('uploadBox');
    const avatarInput = document.getElementById('avatar');

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const githubInput = document.getElementById('github');

    const ticket = document.getElementById('ticket');
    const ticketImage = document.getElementById('ticketImage');
    const ticketName = document.getElementById('ticketName');
    const ticketEmail = document.getElementById('ticketEmail');
    const ticketGitHub = document.getElementById('ticketGitHub');

    const confirmationMessage = document.getElementById('confirmationMessage');
    const confirmName = document.getElementById('confirmName');
    const confirmEmail = document.getElementById('confirmEmail');

    // Ocultar ticket y mensaje de confirmación al cargar
    ticket.style.display = 'none';
    confirmationMessage.style.display = 'none';

    // Activar input de archivo al hacer clic en el uploadBox
    uploadBox.addEventListener('click', () => {
        avatarInput.click();
    });

    // Procesar imagen seleccionada
    avatarInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) {
            uploadBox.style.backgroundImage = 'none';
            uploadBox.innerHTML = '<span>Drag and drop or click to upload</span>';
            return;
        }

        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona una imagen válida (PNG, JPG o JPEG).');
            e.target.value = '';
            uploadBox.style.backgroundImage = 'none';
            uploadBox.innerHTML = '<span>Drag and drop or click to upload</span>';
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            uploadBox.style.backgroundImage = `url(${reader.result})`;
            uploadBox.innerHTML = '';
        };
        reader.readAsDataURL(file);
    });

    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.classList.add('dragging');
    });

    uploadBox.addEventListener('dragleave', () => {
        uploadBox.classList.remove('dragging');
    });

    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.classList.remove('dragging');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            avatarInput.files = files;
            avatarInput.dispatchEvent(new Event('change'));
        }
    });

    // Envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const github = githubInput.value.trim();
        const file = avatarInput.files[0];

        if (!name || !email || !github || !file) {
            alert('Por favor, completa todos los campos y sube una imagen para tu avatar.');
            return;
        }

        // Mostrar ticket con los datos
        ticketName.textContent = name;
        ticketEmail.textContent = email;
        ticketGitHub.textContent = github.startsWith('@') ? github : '@' + github;

        const readerTicket = new FileReader();
        readerTicket.onload = () => {
            ticketImage.src = readerTicket.result;
            ticket.style.display = 'flex';
        };
        readerTicket.readAsDataURL(file);

        // Mostrar mensaje de confirmación
        confirmName.textContent = name;
        confirmEmail.textContent = email;
        confirmationMessage.style.display = 'flex';

        // Ocultar el formulario
        form.style.display = 'none';

        // Scroll hacia arriba
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
