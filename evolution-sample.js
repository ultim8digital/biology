/* Authored deterministic sample. No network, analytics or persisted answers. */
(() => {
  'use strict';
  document.querySelectorAll('.evolution-sample').forEach((sample) => {
    const form = sample.querySelector('form');
    const submit = sample.querySelector('.evolution-submit');
    const result = sample.querySelector('.evolution-result');
    const options = [...sample.querySelectorAll('input[type="radio"]')];
    const correct = sample.dataset.correctAnswer;
    submit.hidden = false;
    sample.querySelector('.evolution-fallback').hidden = true;
    const resetFeedback = () => {
      submit.disabled = !options.some((option) => option.checked);
      result.hidden = true;
      sample.querySelectorAll('.evolution-choice').forEach((choice) => {
        choice.removeAttribute('data-result');
      });
    };
    form.addEventListener('change', resetFeedback);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const selected = options.find((option) => option.checked);
      if (!selected) return;
      const isCorrect = selected.value === correct;
      result.querySelector('[data-correct]').hidden = !isCorrect;
      result.querySelector('[data-incorrect]').hidden = isCorrect;
      result.dataset.result = isCorrect ? 'correct' : 'incorrect';
      result.hidden = false;
      options.forEach((option) => {
        if (option.value === correct) option.closest('label').dataset.result = 'correct';
        else if (option.checked) option.closest('label').dataset.result = 'incorrect';
      });
    });
    // Browser form restoration may select a radio before this script runs.
    resetFeedback();
  });
})();
