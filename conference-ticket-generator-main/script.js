document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ticketForm');
  const uploadBox = document.getElementById('uploadBox');
  const avatarInput = document.getElementById('avatar');
  const ticket = document.getElementById('ticket');
  const ticketImage = document.getElementById('ticketImage');
  const ticketName = document.getElementById('ticketName');
  const ticketEmail = document.getElementById('ticketEmail');
  const ticketGitHub = document.getElementById('ticketGitHub');

  uploadBox.addEventListener('click', () => {
    avatarInput.click();
  });

  avatarInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      uploadBox.style.backgroundImage = `url(${reader.result})`;
      uploadBox.textContent = '';
    };
    reader.readAsDataURL(file);
  });

  // Maneja el envío del formulario luego de generar
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const github = document.getElementById('github').value.trim();
    const file = avatarInput.files[0];

    if (!name || !email || !github) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (!file) {
      alert('Por favor, sube una imagen para tu avatar.');
      return;
    }

    // Mostrar datos en el ticket generado
    ticketName.textContent = name;
    ticketEmail.textContent = email;
    ticketGitHub.textContent = github.startsWith('@') ? github : '@' + github;

    // Mostrar imagen en el ticket generado
    const reader = new FileReader();
    reader.onload = () => {
      ticketImage.src = reader.result;
      ticket.style.display = 'flex'; // Muestra el ticket
    };
    reader.readAsDataURL(file);
  });
});
