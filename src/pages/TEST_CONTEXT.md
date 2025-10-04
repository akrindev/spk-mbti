Saved assistant context for Test page changes

Date: 2025-10-05

Summary of recent automated edits applied to src/pages/Test.jsx:

- Added animated question transitions using Framer Motion:
  - Imported `motion` and `AnimatePresence` from `framer-motion`.
  - Wrapped the question card in `<AnimatePresence mode="wait">` and keyed `<motion.div key={currentQuestionIndex}>`.
  - Enter animation: { opacity: 0, x: 30 } → animate to { opacity: 1, x: 0 }.
  - Exit animation: { opacity: 0, x: -30 }.
  - Transition duration: 0.35s.

- Replaced native HTML buttons with Hero UI `Button` components for:
  - Rating options (size="lg") — each rating button keeps per-rating Tailwind color classes and selection behavior.
  - Navigation buttons (Previous/Next) — `isDisabled` used for the previous button, Next uses color="primary" and size="lg`.

- Changed rating UI behavior and visuals:
  - Removed numeric bubble.
  - Added `getButtonColorClasses(value, isSelected)` helper to return Tailwind classes per rating:
    - 1: red (strong negative)
    - 2: amber
    - 3: gray (neutral)
    - 4: blue (positive)
    - 5: green (strong positive)
  - When selected, buttons scale and show shadow.
  - `aria-pressed` set on rating buttons for accessibility.

- Minor: preserved the progress bar and existing navigation logic. Kept `navigate('/results', { state: { answers } })` behavior.

Files edited (in this branch):
- src/pages/Test.jsx — animation, Hero UI Button usage, rating style helper

Notes / next steps:
- Consider animating the progress bar width with Framer Motion for consistency.
- Optionally add keyboard shortcuts (1..5) for ratings and animate selection micro-interactions.
- If you want this context saved elsewhere or in a different format (JSON, changelog, or PR-ready file), tell me where.

This file was created automatically to persist the assistant's explanation/summary into the repository for future reference.