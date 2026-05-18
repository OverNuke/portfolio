# Agentic Design Rule: Perceptual Contrast Standard (APCA)

## Context & Purpose

To ensure all user interfaces generated, reviewed, or modified by this agent comply with modern perceptual accessibility standards. This project replaces legacy WCAG 2.0 formulas with the **Advanced Perceptual Contrast Algorithm (APCA)**, which measures contrast based on human visual perception, spatial frequency (font size/weight), and display luminance.

---

## 1. Core Mathematical Concept (For Agent Awareness)

Unlike legacy WCAG ($4.5:1$), APCA calculates a **Lightness Contrast (Lc)** value from **0 to 100+** (can be positive or negative depending on text vs. background dominance).

* **Positive Lc (+Lc):** Light text on dark background (e.g., `#FFFFFF` text on `#121212` background).
* **Negative Lc (-Lc):** Dark text on light background (e.g., `#121212` text on `#FFFFFF` background).

---

## 2. APCA Contrast Threshold Matrix

The agent **must** enforce the following absolute minimums based on text scale and purpose.

| Content Type | Minimum Contrast | Minimum Font Size / Weight | Application Example |
| :--- | :--- | :--- | :--- |
| **Large Text / UI Accents** | $Lc \ge 45$ | $\ge 24\text{px}$ (Bold $\ge 600$) | Section Headings, Retro Arcade UI Frames |
| **Subheadings & Interface** | $Lc \ge 60$ | $\ge 16\text{px}$ (Medium $\ge 500$) | Button Text, Form Labels, HP/MP Indicators |
| **Body Text / Critical Info** | $Lc \ge 75$ | $\ge 14\text{px}$ (Regular $\ge 400$) | Main paragraphs, logs, code blocks |
| **Legal / Captions** | $Lc \ge 90$ | $\ge 12\text{px}$ (Regular $\ge 400$) | Copyright text, small system metadata |

---

## 3. Agent Execution Guidelines (Dark Mode / Retro Gaming Context)

When evaluating or generating CSS/Tailwind for dark themes (light text on dark backgrounds):

1. **Avoid Halation/Cromostereopsis:** Do not pair ultra-saturated red (`#FF0000`) and pure blue (`#0000FF`) in close proximity over dark backgrounds. It triggers optical vibration.
2. **Text Dominance (+Lc):** For dark mode, but the agent must target **$Lc \ge +75$** for body content.
3. **Encapsulation Rule:** If a retro background image/pixel-art contains high contrast variation, the agent **must** wrap text elements in a semi-transparent or solid container (`background-color` with sufficient $Lc$ disparity against the text) before rendering.

---

## 4. Code Validation Snippet (Reference for Agent Tools)

If the agent has access to a JavaScript/TypeScript evaluation environment, it should use the following logical assertion for UI generation:

```typescript
import { apcaContrast } from 'apca-w3'; // Pseudo-import for agent context

function validateComponentContrast(textColor: string, bgColor: string, fontSize: number): boolean {
  const score = Math.abs(apcaContrast(textColor, bgColor));
  
  if (fontSize >= 24 && score >= 45) return true;
  if (fontSize >= 16 && score >= 60) return true;
  if (fontSize >= 14 && score >= 75) return true;
  
  return false;
}
```

## 5. Failure Modes & Self-Correction

**CRITICAL FAILURE**: Generating a text-to-background pairing where $|Lc| < 45$. If detected during the audit phase, the agent must adjust the text luminance toward the polarity extreme (closer to #FFFFFF for dark mode) until the threshold is met.
**WARNING**: Using purely aesthetic "retro neon" colors for primary body reading. Pure saturated magentas or cyans should be restricted to borders or $Lc \ge 45$ decorative accents.
