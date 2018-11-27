---
title: Code Retreat in Turku — A Nice Experience
date: 2018-11-17
layout: post.njk
---

Having a really bad week, I went to Turku for my first [Code Retreat](https://www.coderetreat.org/) without any expectation, yet returned home with a smile from ear to ear.

## What Is Code Retreat?

Code Retreat is a one-day long event, focusing on learning about fundamentals of software design and engineering, rather than the common spirit of “move fast, break things”. The event is split into sessions, which is approximately 40 minutes, and when a new session comes, each participant is required to pair up with a new teammate.

The event is a great opportunity to see how different approaches could be used to tackle the same problem, to practice TDD and have fun.

## The Event

This year in Turku Code Retreat, the problem we needed to solve is [Conway’s Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). I will not explain what it is but instead telling my experiences as a participant.

To me, what made the event interesting is that each sessions had its own theme, or conditions where each team had to take into account when writing their solution. For examples, there was one called “TDD Ping Pong” where each team member would take place to write a test, and the other one would implement it, then switch roles. Another one was “Immutable” where all objects mutations were forbidden. This is the gem of the whole event, as each participant had time to learn about the problem, then worked on it again but within new constraints, forcing them to rethink for a new approach.

I especially like one theme where team members were not allowed to talk to each other, but just write tests and implementations instead (comments were not allowed too). I and my teammate, we understood each other quite well until we tried to construct the board. I wrote a test but my teammate failed to understand my intention, resulting a very funny situation where he tried to hack just to make the test passed. In the end, all tests were green and we had a big laugh.

It’s worth mentioning the hardest theme of the whole event: “Tell Don’t Ask”. The conditions were:

- No getters
- No public properties
- No functions with returned values

We really had to challenge our thinking for this one, so I left the fun for the reader to try (in other words, we haven’t came up with a solution for this yet).

## The People

The event couldn’t be successful without the nice people at [Houston Inc](https://www.houston-inc.com/). Everyone was skilled, friendly and fun to talk. During the lunch we discussed about other tech topics and I learned about Event Sourcing, which is a very interesting idea. The conversations were always in good manner, where participants listened to each other and shared thoughts, rather than trying to prove who knew the best.

## What I Learnt

### TDD + Pair Programming

I learnt about the concept of pair programming many years ago but never had the luxury to practice it. Code Retreat was an opportunity for me to try and got a hand on PP. It worked as you have an extra pair of eyes to immediately point out syntax errors, or discuss to find a solution. Yet I don’t think most companies can do it in real life.

### Trap to Programmer’s Mind

We programmers can fall into the trap of overthinking quite easily. There were not one but three times I over-engineered. At first when I read about the rules of Game of Life, I thought about how to construct the game grid, how to calculate the number of alive neighbors of a cell, etc. Yet it turned out we could start with the simplest case, where a cell is presented as a pre-calculated object.

```js
const cell = { neighbors: 3, isAlive: true }
```

Then we could write a function `gameTick(cell)` to see if this cell would be alive or dead in the next generation.

Or when we were in a session where no control statements was allowed. I overthought and tried to make an array of neighbors cells and use its length to compare. Thanks to my teammate when he pointed out that I could just use the `neighbors` attribute instead.

But as said, it is very tempting to make things complicated and get lost in your train of thoughts. I think TDD helps in this case, as it slows us down first, forces us to write tests to understand more about the problem before coming up with solutions.

## In Summary

Before I left, I was asked 3 questions. I only remember the most interesting one:

> What will you do differently in the next Monday?

My answer was: I will start to write tests.

And I will definitely do.
