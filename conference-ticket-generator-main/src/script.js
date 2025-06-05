document.addEventListener('DOMContentLoaded', () => {
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

    const title = document.querySelector('h1');
    const subtitle = document.querySelector('.subtitle');

    ticket.style.display = 'none';
    confirmationMessage.style.display = 'none';

    uploadBox.addEventListener('click', () => {
        avatarInput.click();
    });
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

        title.style.display = 'none';
        subtitle.style.display = 'none';

        ticketName.textContent = name;
        ticketEmail.textContent = email;
        ticketGitHub.textContent = github.startsWith('@') ? github : '@' + github;

        const readerTicket = new FileReader();
        readerTicket.onload = () => {
            ticketImage.src = readerTicket.result;
            ticket.style.display = 'flex';
        };
        readerTicket.readAsDataURL(file);


        confirmName.textContent = name;
        confirmEmail.textContent = email;
        confirmationMessage.style.display = 'flex';

        form.style.display = 'none';

        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
