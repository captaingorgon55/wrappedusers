// Seleccionar todos los botones con la clase 'action-button'
const actionButtons = document.querySelectorAll('.action-button');

// ** Funciones de Degradado **
function updateGradient(e) {
    const rect = e.target.getBoundingClientRect(); // Usar el elemento objetivo
    const x = e.clientX - rect.left; // Coordenada X relativa al botón
    const y = e.clientY - rect.top;  // Coordenada Y relativa al botón
    e.target.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, #FFC857, #E30613)`; // Aplicar el degradado
}

function resetGradient(e) {
    e.target.style.backgroundImage = 'linear-gradient(to right, #E30613, #FF5733)'; // Restaurar el degradado
}

// ** Funciones de Animación y Scroll **
function restartAnimationsAndScrollToNotes() {
    const profile = document.getElementById('profile');
    const username = document.getElementById('username');
    const userDescription = document.getElementById('user-description');
    const achievements = document.getElementById('achievements');
    const notesCounter = document.getElementById('notes-counter');
    const notesCount = document.getElementById('notes-count');
    const notesCountDescription = document.getElementById('notes-count-description');

    profile.scrollIntoView({ behavior: 'smooth' });
    resetProfileAnimations(username, userDescription, achievements);
    resetNotesCounter(notesCount, notesCountDescription);
    notesCounter.scrollIntoView({ behavior: 'smooth' });
}

function resetProfileAnimations(username, userDescription, achievements) {
    username.style.animation = 'none';
    userDescription.style.animation = 'none';
    achievements.style.animation = 'none';

    void username.offsetWidth; // Forzar reflujo

    username.style.animation = 'typing 6s steps(40, end) forwards';
    userDescription.style.animation = 'typingDescription 6s steps(40, end) forwards';
    achievements.style.animation = 'fadeInAchievements 1s ease-in-out forwards';
}

function resetNotesCounter(notesCount, notesCountDescription) {
    notesCount.textContent = '0';
    let targetCount = 100;
    let currentCount = 0;

    let interval = setInterval(() => {
        if (currentCount < targetCount) {
            currentCount++;
            notesCount.textContent = currentCount;
            notesCountDescription.textContent = currentCount;
        } else {
            clearInterval(interval);
        }
    }, 20);
}

function restartProfileAnimation() {
    const profile = document.getElementById('profile');
    const username = document.getElementById('username');
    const userDescription = document.getElementById('user-description');
    const achievements = document.getElementById('achievements');

    profile.scrollIntoView({ behavior: 'smooth' });
    resetProfileAnimations(username, userDescription, achievements);
}

// ** Evento de mouse sobre todos los botones para el degradado **
actionButtons.forEach(button => {
    button.addEventListener('mousemove', updateGradient);
    button.addEventListener('mouseleave', resetGradient);
});
const words = [
    "Historia", "Aventura", "Conocimiento", "Descubrimiento", "Imaginación",
    "Inspiración", "Creatividad", "Narrativa", "Pasión", "Sabiduría",
    "Exploración", "Sueños", "Innovación", "Curiosidad", "Conexión",
    "Reflexión", "Perspectiva", "Transformación", "Expresión", "Viaje",
    "Magia", "Fascinación", "Realidad", "Visión", "Emoción",
    "Desafío", "Travesía", "Cultura", "Memoria", "Historias",
    "Arte", "Talento", "Colaboración", "Éxito", "Desarrollo",
    "Intuición", "Impacto", "Convivencia", "Comunidad"
];

const wordCloudContainer = document.getElementById('word-cloud');

// Función para crear una palabra
function createWord() {
    const wordElement = document.createElement('div');
    const randomWord = words[Math.floor(Math.random() * words.length)];
    wordElement.textContent = randomWord;
    wordElement.classList.add('word');

    // Posicionar aleatoriamente en el contenedor
    const leftPosition = Math.random() * 100; // Ancho de la ventana
    const topPosition = Math.random() * 80; // Altura máxima del contenedor (80% para evitar caer fuera)
    const fontSize = Math.random() * 20 + 20; // Tamaño de la fuente entre 20px y 40px

    // Asignar estilo a la palabra
    wordElement.style.left = leftPosition + 'vw';
    wordElement.style.top = topPosition + 'vh'; // Añadir posición vertical
    wordElement.style.fontSize = fontSize + 'px';

    // Verificar colisiones y ajustar posición
    if (!isOverlapping(wordElement)) {
        wordCloudContainer.appendChild(wordElement);

        // Eliminar la palabra después de que termine la animación
        setTimeout(() => {
            wordElement.classList.add('fade-out'); // Aplicar la clase para desvanecer
            setTimeout(() => {
                wordElement.remove(); // Eliminar la palabra del DOM
            }, 500); // Esperar el tiempo de desvanecimiento antes de eliminarla
        }, 2000); // Tiempo que la palabra estará visible
    } else {
        // Si hay una superposición, intentar crear otra palabra
        createWord();
    }
}

// Verifica si hay superposición con otras palabras
function isOverlapping(newWord) {
    const words = document.querySelectorAll('.word');
    const newWordRect = newWord.getBoundingClientRect();

    // Configuramos la nueva palabra para el cálculo de colisiones
    newWord.style.position = 'absolute';

    // Verificamos colisiones con otras palabras
    for (let word of words) {
        const wordRect = word.getBoundingClientRect();
        const margin = 20; // Espacio adicional en píxeles para evitar colisiones
        if (
            newWordRect.left < wordRect.right + margin &&
            newWordRect.right > wordRect.left - margin &&
            newWordRect.top < wordRect.bottom + margin &&
            newWordRect.bottom > wordRect.top - margin
        ) {
            return true; // Hay una colisión
        }
    }
    return false; // No hay colisión
}

// Crear palabras cada 1000 ms (1 segundo)
setInterval(createWord, 100);
