# Algorithms

My personal space for practising algorithms. Now I focus on
[Advent of code 2015](https://adventofcode.com/2015) and I have a lot of fun.

## How to run ts scripts

Make sure, you are running on deno version `1.45.5`+. You can use `dvm`

```bash
dvm use
```

Run example script in order to check your setup

```bash
deno run ./scripts/validate-setup.ts
```

## Tests

In order to run tests, execute:

```bash
deno task test
```

In order to run tests in single folder, run in the folder

```bash
deno test **.test.ts --watch
```
