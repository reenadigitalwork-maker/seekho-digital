(function () {
  'use strict';

  const moduleNumber = Number(document.body.dataset.module || 1);
  const modules = window.SEEKHO_MODULES || [];
  const current = modules[moduleNumber - 1];
  if (!current) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);

  function readStore(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (_) {
      return fallback;
    }
  }
  function writeStore(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_) {
      return false;
    }
  }
  function readText(key) {
    try { return localStorage.getItem(key) || ''; }
    catch (_) { return ''; }
  }
  function writeText(key, value) {
    try { localStorage.setItem(key, value); return true; }
    catch (_) { return false; }
  }

  const title = current.title || `Module ${moduleNumber}`;
  document.title = `Module ${String(moduleNumber).padStart(2, '0')}: ${title} | Seekho Digital`;
  $('#module-kicker').textContent = `MODULE ${String(moduleNumber).padStart(2, '0')} OF 10`;
  $('#module-title').textContent = title;
  $('#module-description').textContent = current.tagline || '';
  $('#module-goal').textContent = current.goal || '';

  const lessonList = $('#lesson-list');
  const lessonCard = lessonList ? lessonList.closest('.content-card') : null;
  const lessons = Array.isArray(current.lessons) ? current.lessons : [];
  const practicedKey = `sd_lesson_done_${moduleNumber}`;
  const practiceNotesPrefix = `sd_lesson_note_${moduleNumber}_`;

  function safeList(value) {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string' && value.trim()) return [value];
    return [];
  }

  function renderOverview() {
    if (!lessonCard) return;
    const outcomes = safeList(current.outcomes);
    const project = current.project || {};
    const overview = document.createElement('section');
    overview.className = 'content-card module-overview';
    overview.innerHTML = `
      <div class="module-overview-heading">
        <span class="tag">YOUR MODULE ROADMAP</span>
        <h2>What you will learn and make</h2>
        <p>Use this page as a small learning plan. You can return to any lesson and practise again.</p>
      </div>
      <div class="module-outcomes">
        <h3>By the end of this module, you can:</h3>
        <ul>${outcomes.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul>
      </div>
      <div class="module-project">
        <span class="tag">MODULE PROJECT</span>
        <h3>${escapeHTML(project.title || 'Your practical project')}</h3>
        <p>${escapeHTML(project.brief || '')}</p>
        <div class="module-project-columns">
          <div><h4>Your deliverables</h4><ul>${safeList(project.deliverables).map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul></div>
          <div><h4>Quality check</h4><ul>${safeList(project.quality).map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul></div>
        </div>
      </div>
      <div class="module-glossary">
        <h3>Key words in simple English</h3>
        <dl>${safeList(current.glossary).map(item => {
          const text = String(item);
          const split = text.indexOf(':');
          const term = split >= 0 ? text.slice(0, split) : text;
          const definition = split >= 0 ? text.slice(split + 1).trim() : '';
          return `<div><dt>${escapeHTML(term)}</dt><dd>${escapeHTML(definition)}</dd></div>`;
        }).join('')}</dl>
      </div>`;
    lessonCard.before(overview);
  }

  function renderProgress() {
    if (!lessonCard) return;
    const completed = readStore(practicedKey, []);
    const done = Array.isArray(completed) ? completed : [];
    const count = lessons.filter((_, index) => done.includes(index)).length;
    const percent = lessons.length ? Math.round(count / lessons.length * 100) : 0;
    let panel = $('#module-lesson-progress');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'module-lesson-progress';
      panel.className = 'module-lesson-progress';
      lessonList.parentElement.insertBefore(panel, lessonList);
    }
    panel.innerHTML = `
      <div class="module-progress-copy"><strong>${count} of ${lessons.length} lesson practices marked done</strong><span>${percent}%</span></div>
      <div class="module-progress-track" role="progressbar" aria-label="Lesson practice progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}"><span style="width:${percent}%"></span></div>
      <p>Mark a lesson as practised after you have attempted its task. This is your own progress record, not a grade.</p>`;
  }

  function renderLessons() {
    if (!lessonList) return;
    lessonList.innerHTML = lessons.map((lesson, index) => {
      const item = lesson || {};
      const steps = safeList(item.steps);
      const mistakes = Array.isArray(item.mistakes) ? item.mistakes : [];
      const minutes = Number(item.minutes) > 0 ? Number(item.minutes) : 12;
      return `
      <details class="lesson deep-lesson" data-lesson-index="${index}" ${index === 0 ? 'open' : ''}>
        <summary>
          <span class="lesson-summary-main">
            <span class="tag">LESSON ${String(index + 1).padStart(2, '0')} · ${minutes} MIN</span>
            <strong>${escapeHTML(item.title || `Lesson ${index + 1}`)}</strong>
            <small>${escapeHTML(item.outcome || '')}</small>
          </span>
          <span class="lesson-toggle" aria-hidden="true">+</span>
        </summary>
        <div class="lesson-body">
          <div class="lesson-outcome"><strong>What you will learn:</strong> ${escapeHTML(item.outcome || '')}</div>
          <section class="lesson-section">
            <h3>Understand the idea</h3>
            <p>${escapeHTML(item.explain || '')}</p>
          </section>
          <section class="lesson-section">
            <h3>Why this matters</h3>
            <p>${escapeHTML(item.why || '')}</p>
          </section>
          <section class="lesson-worked-example">
            <span class="lesson-section-label">SEE IT IN A REALISTIC EXAMPLE</span>
            <p>${escapeHTML(item.example || '')}</p>
          </section>
          <section class="lesson-section">
            <h3>Step-by-step: how to approach it</h3>
            <ol class="lesson-steps">${steps.map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol>
          </section>
          <section class="practice-box lesson-task">
            <span class="lesson-section-label">YOUR TURN · PRACTISE</span>
            <p>${escapeHTML(item.task || '')}</p>
            <label for="lesson-note-${index}">My attempt / working notes</label>
            <textarea id="lesson-note-${index}" data-lesson-note="${index}" rows="4" placeholder="Write your own answer or steps here..."></textarea>
            <div class="lesson-task-actions">
              <button class="small-btn lesson-practice-button" type="button" data-practice-index="${index}">Mark this lesson practised</button>
              <span class="lesson-practice-status" id="lesson-status-${index}" aria-live="polite"></span>
            </div>
            <p class="lesson-save-note">Your notes and practice ticks are saved only in this browser on this device. Copy important work somewhere safe as a backup.</p>
          </section>
          <section class="lesson-mistakes">
            <h3>Common mistakes — and how to improve</h3>
            <div class="lesson-mistake-list">${mistakes.map(mistake => {
              const parts = Array.isArray(mistake) ? mistake : [];
              return `<article><h4>${escapeHTML(parts[0] || '')}</h4><p><strong>Why it causes trouble:</strong> ${escapeHTML(parts[1] || '')}</p><p><strong>Try this instead:</strong> ${escapeHTML(parts[2] || '')}</p></article>`;
            }).join('')}</div>
          </section>
          <details class="lesson-check">
            <summary>Check your understanding</summary>
            <div class="lesson-check-content">
              <p><strong>Question:</strong> ${escapeHTML(item.question || '')}</p>
              <details class="sample-answer"><summary>Show a sample answer and explanation</summary><p>${escapeHTML(item.answer || '')}</p></details>
              <p class="lesson-check-note">Try answering in your own words before opening the sample. Your answer is not automatically graded.</p>
            </div>
          </details>
        </div>
      </details>`;
    }).join('');

    lessons.forEach((_, index) => {
      const textarea = $(`[data-lesson-note="${index}"]`);
      if (textarea) {
        textarea.value = readText(`${practiceNotesPrefix}${index}`);
        textarea.addEventListener('input', () => {
          const saved = writeText(`${practiceNotesPrefix}${index}`, textarea.value);
          const status = $(`#lesson-status-${index}`);
          if (status) status.textContent = saved ? 'Notes saved on this device.' : 'Could not save. Please copy your notes somewhere safe.';
        });
      }
    });

    lessonList.querySelectorAll('[data-practice-index]').forEach(button => {
      button.addEventListener('click', () => {
        const index = Number(button.dataset.practiceIndex);
        const stored = readStore(practicedKey, []);
        const done = Array.isArray(stored) ? stored : [];
        const at = done.indexOf(index);
        if (at >= 0) done.splice(at, 1);
        else done.push(index);
        const saved = writeStore(practicedKey, done);
        renderLessonPracticeButtons();
        renderProgress();
        const status = $(`#lesson-status-${index}`);
        if (status && !saved) status.textContent = 'Could not save progress. You can still continue practising.';
      });
    });
    renderLessonPracticeButtons();
  }

  function renderLessonPracticeButtons() {
    const stored = readStore(practicedKey, []);
    const done = Array.isArray(stored) ? stored : [];
    lessonList.querySelectorAll('[data-practice-index]').forEach(button => {
      const index = Number(button.dataset.practiceIndex);
      const isDone = done.includes(index);
      button.textContent = isDone ? '✓ Practised · Tap to undo' : 'Mark this lesson practised';
      button.classList.toggle('is-done', isDone);
      const status = $(`#lesson-status-${index}`);
      if (status) status.textContent = isDone ? 'Practice marked complete.' : 'Not marked yet.';
    });
  }

  function renderReferences() {
    const references = safeList(current.references);
    if (!references.length) return;
    const card = document.createElement('section');
    card.className = 'content-card module-references';
    card.innerHTML = `<h2>Official references for further learning</h2>
      <p>These are optional next reads. Product interfaces and policies can change, so check the provider's current guidance when you use a tool.</p>
      <ul>${references.map(url => `<li><a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(url)}</a></li>`).join('')}</ul>`;
    const keepPractising = Array.from(document.querySelectorAll('.content-card')).find(node => node.textContent.includes('Keep practising'));
    if (keepPractising) keepPractising.before(card);
    else lessonCard?.after(card);
  }

  function updateSidebar() {
    document.querySelectorAll('.side-card a[href*="module-"]').forEach(link => {
      const match = link.getAttribute('href').match(/module-(\d{2})\.html/);
      if (!match) return;
      const n = Number(match[1]);
      const data = modules[n - 1];
      if (data) link.textContent = `${String(n).padStart(2, '0')} · ${data.title}`;
      if (n === moduleNumber) link.setAttribute('aria-current', 'page');
    });
  }

  // Keep the module-level completion control as a learner-owned self-check.
  const noteKey = `sd_note_module_${moduleNumber}`;
  const moduleNote = $('#module-note');
  if (moduleNote) {
    moduleNote.value = readText(noteKey);
    moduleNote.addEventListener('input', () => writeText(noteKey, moduleNote.value));
  }
  const completedModulesKey = 'sd_done_modules';
  const completeButton = $('#complete-module');
  const status = $('#module-status');
  function paintModuleCompletion() {
    const stored = readStore(completedModulesKey, []);
    const done = Array.isArray(stored) ? stored : [];
    const isDone = done.includes(moduleNumber);
    if (completeButton) completeButton.textContent = isDone ? '✓ Module marked complete · Tap to undo' : 'Mark this module complete';
    if (status) status.textContent = isDone
      ? 'Completed · You can revisit this module anytime.'
      : 'Not completed yet · Mark complete when you have worked through the lessons and project.';
  }
  if (completeButton) {
    completeButton.addEventListener('click', () => {
      const stored = readStore(completedModulesKey, []);
      const done = Array.isArray(stored) ? stored : [];
      const at = done.indexOf(moduleNumber);
      if (at >= 0) done.splice(at, 1);
      else done.push(moduleNumber);
      writeStore(completedModulesKey, done);
      paintModuleCompletion();
    });
  }

  const back = $('#module-back');
  if (back) back.href = moduleNumber === 1 ? '../index.html#learning' : `module-${String(moduleNumber - 1).padStart(2, '0')}.html`;
  const next = $('#module-next');
  if (next) {
    if (moduleNumber === 10) {
      next.href = '../projects.html';
      next.textContent = 'Go to your portfolio projects →';
    } else {
      next.href = `module-${String(moduleNumber + 1).padStart(2, '0')}.html`;
      next.textContent = 'Continue to next module →';
    }
  }

  renderOverview();
  renderLessons();
  renderProgress();
  renderReferences();
  updateSidebar();
  paintModuleCompletion();
})();