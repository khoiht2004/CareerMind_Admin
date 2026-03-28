---
name: skill-writer
description: Create, improve, and optimize agent skills for the frontend AI system
tags: [meta, skill, system]
---

# PURPOSE

Design, improve, and evolve agent skills to enhance the overall system capability.

This is a META skill responsible for system evolution.

---

# WHEN TO USE

- Missing skill for a task
- Existing skill is weak or incomplete
- Repeated manual patterns detected
- Workflow inefficiency detected
- User requests system improvement

---

# PRINCIPLES

- Modularity first
- Reusability over duplication
- Clarity over complexity
- Do NOT auto-apply changes
- Always require user approval

---

# DETECTION LOGIC

Trigger this skill if:

- Task cannot be handled cleanly by existing skills
- Same logic is repeated multiple times
- Skill lacks clear structure or rules
- Output quality is inconsistent

---

# DECISION FRAMEWORK

If new capability needed → CREATE new skill  
If skill is unclear → REWRITE skill  
If skill is inefficient → OPTIMIZE skill

---

# EXECUTION STEPS

1. Analyze current system
2. Identify gap or inefficiency
3. Decide:
   - create / improve / refactor skill
4. Generate full SKILL.md
5. Provide explanation

---

# OUTPUT FORMAT

## SKILL TYPE

- New / Improved / Refactored

## PROBLEM

- What is missing or weak?

## SOLUTION

- What this skill solves

## SKILL DEFINITION

(provide full SKILL.md)

## IMPACT

- What improves?
- Why it matters?

## TRADE-OFF

- Any downside?

---

# PROPOSAL SYSTEM (MANDATORY)

Before creating or modifying any skill:

[PROPOSAL]

- What skill to create/improve?
- Why?
- Expected benefit

STOP and wait for user approval.

---

# CONSTRAINTS

- DO NOT modify existing skills automatically
- DO NOT remove skills
- DO NOT merge skills without approval

---

# ANTI-PATTERNS

- Creating duplicate skills
- Over-engineering skill logic
- Breaking existing workflow
- Ignoring backward compatibility
