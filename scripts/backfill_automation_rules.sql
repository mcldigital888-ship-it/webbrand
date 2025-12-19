-- Backfill AutomationRule.condition_json
-- SQLite: set NULL to empty object
UPDATE automation_rules
SET condition_json = '{}'
WHERE condition_json IS NULL;
