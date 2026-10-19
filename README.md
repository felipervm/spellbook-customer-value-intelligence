# Spellbook | Customer Signal Reliability

**Independent proof-of-work by Felipe Mattos** · Not affiliated with Spellbook.

## The operational decision
How can a scaling legal-AI company distinguish **customers who need a helpful intervention** from **accounts that merely have incomplete or contradictory data**?

**Decision rule:** validate the evidence before acting. Avoid sending outreach based on uncertain telemetry or stale CRM records. Route data-quality exceptions to verification and only route sufficiently clear, actionable signals to Customer Success.

## Why this business question?
Spellbook's public hiring briefs describe CS adoption, time-to-value, HubSpot data hygiene, consistent GTM reporting and operational playbooks. That is public evidence of relevant responsibilities, **not evidence Spellbook lacks such systems**.

- [Customer Success Operations Manager](https://jobs.ashbyhq.com/spellbook.com/4b0deab9-5fd3-445b-bbe8-d3d70db8ec48/)
- [Scaled Customer Success Manager](https://jobs.ashbyhq.com/spellbook.com/2a5ad730-e433-4974-b9f8-3657043f2937/)
- [Head of Revenue Operations](https://jobs.ashbyhq.com/spellbook.com/096e714b-7b17-4dd3-b16a-27d7e37f77d6)
- [Spellbook Comprehensive Review](https://help.spellbook.legal/en/articles/15656286-comprehensive-review)
- [Spellbook Benchmarks](https://help.spellbook.legal/en/articles/9160166-benchmarks)

## What the prototype demonstrates
- 360 **fictional** customer-account records, reproducibly generated from a fixed seed and downloadable as a CSV.
- A two-stage workflow: **check signal reliability → propose next action**.
- Filterable operational decision queue, with transparent reason codes and evidence quality.
- A small pilot proposal with measurable denominators and review guardrails.

## Important limits
All customer IDs, health markers, usage, recommendations and rates are fictional and illustrative. They are not customer churn predictions, Spellbook event names, internal performance, a production rule engine, or evidence of actual company problems. “Value” is not measured by activity alone. Actual thresholds require CSM + Product + Data validation and customer context.

## Run
A static site: serve the root with `python -m http.server 8000`. No external API or account needed.

## Intended career message
Felipe is interested in **Data / Operations / Data Quality / AI Operations** roles at Spellbook, including roles that may not currently be advertised. The project is a company-relevant work sample, not an application to senior Customer Success or RevOps management roles.

Contact: [LinkedIn](https://www.linkedin.com/in/felipervm) · felipervm22@gmail.com.
