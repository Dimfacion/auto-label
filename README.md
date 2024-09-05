# auto-label
Auto labelling of PR

## Example usage
You can use the action in your jobs like this:

```
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: FiligranHQ/add-remove-label-action@v1.0.0
        with:
          labels_by_organization: "{\"Organization\":[\"test\"]}"
```

## Inputs

| Input | Required? | Description |
| ----- | --------- | ----------- |
| labels_by_organization | Yes | A JSON in a string format showing a map of labels. The key is the organization name and the array a list of the labels to add |
| github_token | No | The Github token to be used |

On default `github_token` is infered from the context.

## Outputs
Nothing.
