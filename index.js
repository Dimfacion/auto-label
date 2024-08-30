#!/usr/bin/env node

const core = require("@actions/core");
const { context, getOctokit } = require("@actions/github");

async function run() {
    try {
        const githubToken = core.getInput('github_token');

        let labelsByOrganizationInput = core.getInput('labels_by_organization');

        if (!labelsByOrganizationInput) {
            core.setFailed("At least the labels_by_organization parameter must be set!");
            return;
        }

        let labelsByOrganization = new Map(Object.entries(JSON.parse(labelsByOrganizationInput)))

        const [owner, repo] = core.getInput('repository').split('/');
        const issueNumber =
            core.getInput('issue_number') === ''
                ? context.issue.number
                : parseInt(core.getInput('issue_number'));

        if (!issueNumber) {
            core.setFailed("Cannot infer the target issue parameter!");
            return;
        }

        const client = getOctokit(githubToken);

        const remainingAdd = [];
        labelsByOrganization.forEach(async () => {
            await client.rest.orgs.listMembers('');

            for (const label of addLabels) {
                try {
                    await client.rest.issues.addLabels({
                        labels: [label],
                        owner,
                        repo,
                        issue_number: issueNumber
                    });
                } catch (e) {
                    core.warning(`failed to add label: ${label}: ${e}`);
                    remainingAdd.push(label);
                }
            }
        });

        if (remainingAdd.length) {
            throw new Error(`failed to add labels: ${remainingAdd}`);
        }
    } catch (e) {
        core.error(e);
    }
}

run();