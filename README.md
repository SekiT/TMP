# TMP

Turing Machine Programming/Puzzle

## Goal

`order` and `tape` are given, then player is supposed to make a program, which consists of 10 commands and makes the given `tape` the same as `order`.

## Order, Tape, Head, State

Each of `order` and `tape` is a list of 10 bits (0 or 1).

The turing machine has `head` and `state`:

- `head` points to somewhere at the `tape`
- `state` is one of the followings: `0`, `1`, `2`, `3`, `4`, `A`, and `E`.

The situation can be described as a table:

| order | 0 | 1 | 0 | 0 | 1 | 1 | 0 | 0 | 0 | 0 |
| -     | - | - | - | - | - | - | - | - | - | - |
| tape  | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 1 | 0 | 0 |
| head  | ↑ |   |   |   |   |   |   |   |   |   |
| state | 0 |   |   |   |   |   |   |   |   |   |

## Command

`<s c c' d s'>` means: When the state is `s` and the character at the `head` is `c`, then change the character as `c'`, move to `d` direction (`R` for right, `L` for left), and set the state `s'`.

For example, if the situation is:

| order | 0 | 1 | 0 | 0 | 1 | 1 | 0 | 0 | 0 | 0 |
| -     | - | - | - | - | - | - | - | - | - | - |
| tape  | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 1 | 0 | 0 |
| head  |   |   |   | ↑ |   |   |   |   |   |   |
| state |   |   |   | 2 |   |   |   |   |   |   |

then the command starting with `<2, 0,` is executed.

If the command is `<2, 0, 1, R, 3>`, the next situation will be:

| order | 0 | 1 | 0 | 0 | 1 | 1 | 0 | 0 | 0 | 0 |
| -     | - | - | - | - | - | - | - | - | - | - |
| tape  | 0 | 0 | 1 | 1 | 0 | 0 | 0 | 1 | 0 | 0 |
| head  |   |   |   |   | ↑ |   |   |   |   |   |
| state |   |   |   |   | 3 |   |   |   |   |   |

## Program

A program consists of 10 commands, as follows:

```
<0, 0, 0, R, 1> <0, 1, 1, R, 0>
<1, 0, 1, R, 1> <1, 1, 0, R, 2>
<2, 0, 0, R, 3> <2, 1, 1, R, 2>
<3, 0, 1, R, 3> <3, 1, 0, L, 4>
<4, 0, 0, R, 4> <4, 1, 0, L, A>
```

Player can edit `c'`, `d`, `s` (last three parts) of each command `<s, c, c', d, s'>`.

- `c'` can be `0` or `1`
- `d` can be `R` or `L`
- `s'` can be `0`, `1`, `2`, `3`, `4`, or `A`

This program solves the problem above. Try tracing it.

## Running a program

At the beginning, the machine's `state` is `0`, and `head` points the first bit of `tape`. Then commands are repeatedly executed.

`head` may go outside (left or right) of the `tape`, then the machine stops at the state `E`. This is OK and often used for tricky programs.

If the state becomes `A`, then the machine stops.

Infinite loops are not accepted or detected. `Reset` button will rescue us in that case.

## Misc: Markdown Template

```md
| order | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| -     | - | - | - | - | - | - | - | - | - | - |
| tape  | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| head  | ↑ |   |   |   |   |   |   |   |   |   |
| state | 0 |   |   |   |   |   |   |   |   |   |
```

```
<0, 0, 0, R, 0> <0, 1, 1, R, 0>
<1, 0, 0, R, 1> <1, 1, 1, R, 1>
<2, 0, 0, R, 2> <2, 1, 1, R, 2>
<3, 0, 0, R, 3> <3, 1, 1, R, 3>
<4, 0, 0, R, 4> <4, 1, 1, R, 4>
```
