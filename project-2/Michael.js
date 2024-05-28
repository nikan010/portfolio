function toggleMedia(mediaId) {
    var media = document.getElementById(mediaId);
    media.classList.toggle('hidden');

    var button = document.querySelector(`button[onclick="toggleMedia('${mediaId}')"]`);
    if (media.classList.contains('hidden')) {
        button.innerHTML = 'Toon';
    } else {
        button.innerHTML = 'Verberg';
    }
}
