# regex-builder
A library to build regular expressions


## Features ([Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet))

### Character classes
- [ ] Single characters (`[xyz]`)
- [ ] Character range (`[a-z]`)
- [ ] Negation (`[^xyz]`)
- [ ] Special matchers (e.g. `\w`, `\W`, `\s`, `\d` etc.)
- [ ] Unicode, hex and control characters (`\cX`, `\xhh`, `\uhhhh`)
- [ ] `NUL` characters (`\0`)
- [ ] Character espcaping
- [ ] Disjunction (`X|Y`)
### Assertions
- [ ] Start and end of the input (with multiline) (`^`, `$`)
- [ ] Start and end of the word (`\b`, `\B`)
- [ ] Lookahead and negative lookahead (`x(?=y)`, `x(?!y)`)
- [ ] Lookbehind and negative lookbehind (`(?<=y)x`, `(?<!y)x`)
### Groups abd backreferences
- [ ] Capturing group (`(x)`)
- [ ] Named capturing group (`(?<Name>x)`)
- [ ] Non-capturing group (`(?:x)`)
- [ ] Backreference (`\1`, `\k<Name>`)
### Quantifiers
- [ ] Zero or more matches (`x*`)
- [ ] One or more matches (`x+`)
- [ ] One or one matche (`x?`)
- [ ] Exactly `n` occurences (`x{n}`)
- [ ] Atleast `n` occurences (`x{n,}`)
- [ ] Atleast `n` and atmost `m` occurences (`x{n,}`)
- [ ] Greedy matching (`x*?`, `x+?`, etc.)
### Unicode property escapes (TODO)
