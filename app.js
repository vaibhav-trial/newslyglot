document.querySelectorAll('li').forEach((li) => {
  li.querySelector('.play-icon').addEventListener('click', (event) => {
    event.target.style.display = 'none';
    const nativeTextEl = li.querySelector('.native-text');
    const nativeText = nativeTextEl.textContent;
    const nativeTextLang = nativeTextEl.getAttribute('lang');
    const englishText = li.querySelector('.english-text').textContent;
    if (!speechSynthesis) {
      alert('Your browser does not support AI generated speech. Please try with a different browser.');
      console.error('Speech synthesis not supported');
      return;
    }
    const nativeUtterance = new SpeechSynthesisUtterance(nativeText);
    nativeUtterance.lang = nativeTextLang;
    nativeUtterance.onend = () => {
      const englishUtterance = new SpeechSynthesisUtterance(englishText);
      englishUtterance.lang = 'en-US';
      speechSynthesis.speak(englishUtterance);
      englishUtterance.onend = () => {
        event.target.style.display = 'flex';
      };
    };
    speechSynthesis.speak(nativeUtterance);
  });
});
