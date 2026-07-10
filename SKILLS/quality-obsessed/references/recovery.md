# Recovery

Use this branch when the user rejects the result, the baseline still wins, or the current direction reads as bland, generic, fragile, or unconvincing.

Treat rejection as evidence about the artifact, not as a debate. Begin with an artifact verdict of `loss` until new side-by-side proof supports a different result.

## Autopsy

Inspect the actual output and record:

```text
Intended outcome:
Observed result:
What the artifact accidentally prioritizes:
Strongest failure and user harm:
Source cause:
Severity:
What to remove or replace:
Proof that would change the verdict:
```

Attack source causes. Copy, color, spacing, comments, or extra tests cannot close a broken state model, information architecture, runtime contract, or decision path unless the evidence shows the cause no longer harms the artifact.

## Direction reset

When the direction itself failed:

1. State why it failed without hedging.
2. Name the elements or assumptions to remove, merge, hide, or replace.
3. Generate three materially distinct feasible directions.
4. Choose one against the user's outcome and supported stack; reject the others with reasons.
5. Define one hyperfocus target and its proof.
6. Rebuild enough of the artifact for a real comparison before polishing details.

Every recovery loop must improve that hyperfocus target, protect a proven gain while changing a necessary dependency, or produce evidence that changes its verdict. Three consecutive invalid, low-impact, mixed, flat, or preference-neutral recovery loops force another direction reset; the Protocol rule resets sooner after two consecutive flat or worse verdicts.

```text
recovery_hyperfocus: improve-protect-or-prove-each-loop
recovery_reset: three-invalid-low-impact-mixed-flat-or-neutral
```

For localized code or correctness failures, three visual directions are unnecessary; compare root-cause remedies instead and choose the smallest systemic one.

## Exit

Recovery exits when the accepted direction beats the baseline or meets explicit acceptance with captured evidence. If it still loses, keep the artifact verdict `loss`, report the highest-leverage next move, and do not soften it with progress language. Task and verification states remain separate from that verdict.
