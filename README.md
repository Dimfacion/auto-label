# auto-label
Auto labelling of PR

## Example usage
You can use the action in your jobs like this:

```
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: Dimfacion/add-remove-label-action@v1.0.0
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          organization: label1, label2
```

## Inputs

| Input | Required? | Description |
| ----- | --------- | ----------- |
| organization | Yes | A comma separated list of the labels to add |
| github_token | No | The Github token to be used |

On default `github_token` is infered from the context.

## Outputs
Nothing.

## Testing